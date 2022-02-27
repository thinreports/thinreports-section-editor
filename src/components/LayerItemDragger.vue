<template>
  <g>
    <rect
      width="100%"
      height="100%"
      class="th-layer-item-dragger"
      @pointermove="drag"
      @pointerup="finish"
    />
    <g
      v-if="isStarted"
      :transform="reportTransform"
    >
      <ItemOutline
        :item-type="itemType"
        :bounding-points="outlineBounds"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';
import { BoundsTransformer } from '../lib/bounds-transformer';
import { operator, report } from '../store';
import ItemOutline from './items/ItemOutline.vue';
import { Coords, BoundingPoints, ItemType } from '@/types';

class UnexpectedStateError extends Error {
  constructor () {
    super();
    this.name = 'UnexpectedStateError';
  }
}

export default defineComponent({
  components: {
    ItemOutline
  },
  props: {
    reportTransform: {
      type: String,
      required: true
    },
    transformSvgPoint: {
      type: (Function as unknown) as () => (point: Coords) => Coords,
      required: true
    }
  },
  setup (props) {
    const { transformSvgPoint } = toRefs(props);

    const itemType = ref<ItemType | null>(null);
    const itemBounds = ref<BoundingPoints | null>(null);
    const initialPointer = ref<Coords | null>(null);
    const outlineBounds = ref<BoundingPoints | null>(null);

    const isStarted = computed((): boolean => {
      return initialPointer.value !== null;
    });
    const draggerState = computed(() => operator.state.itemDragger);

    const start = (e: MouseEvent) => {
      const point = transformSvgPoint.value(e);

      if (!draggerState.value.itemUid) throw new UnexpectedStateError();

      const item = report.getters.findItem(draggerState.value.itemUid);

      itemType.value = item.type;
      itemBounds.value = convertToReportCoords(report.getters.itemBounds(item.uid));
      outlineBounds.value = { ...itemBounds.value };
      initialPointer.value = { x: point.x, y: point.y };
    };
    const drag = (e: MouseEvent) => {
      if (!isStarted.value) start(e);

      const point = transformSvgPoint.value(e);

      if (!itemBounds.value || !outlineBounds.value || !initialPointer.value) throw new UnexpectedStateError();

      const deltaPointer = {
        x: point.x - initialPointer.value.x,
        y: point.y - initialPointer.value.y
      };

      outlineBounds.value = {
        x1: itemBounds.value.x1 + deltaPointer.x,
        y1: itemBounds.value.y1 + deltaPointer.y,
        x2: itemBounds.value.x2 + deltaPointer.x,
        y2: itemBounds.value.y2 + deltaPointer.y
      };
    };
    const finish = () => {
      if (!isStarted.value) {
        cancel();
        return;
      }
      if (!outlineBounds.value) throw new UnexpectedStateError();

      moveItemTo(convertToLocalCoords(outlineBounds.value));

      operator.actions.finishItemDrag();
    };
    const cancel = () => {
      operator.actions.finishItemDrag();
    };
    const moveItemTo = (bounds: BoundingPoints) => {
      if (!draggerState.value.itemUid || !itemType.value) throw new UnexpectedStateError();

      const payload = { uid: draggerState.value.itemUid, bounds };

      switch (itemType.value) {
        case 'rect': report.actions.moveRectItemTo(payload); break;
        case 'ellipse': report.actions.moveEllipseItemTo(payload); break;
        case 'line': report.actions.moveLineItemTo(payload); break;
        case 'image-block': report.actions.moveImageBlockItemTo(payload); break;
        case 'image': report.actions.moveImageItemTo(payload); break;
        case 'text': report.actions.moveTextItemTo(payload); break;
        case 'text-block': report.actions.moveTextBlockItemTo(payload); break;
        case 'stack-view': report.actions.moveStackViewItemTo(payload); break;
        default:
          throw new Error('Not Implemented');
      }
    };
    const convertToReportCoords = (boundingPoints: BoundingPoints): BoundingPoints => {
      const localTranslation = draggerState.value.translation;
      if (!localTranslation) throw new UnexpectedStateError();

      return new BoundsTransformer(boundingPoints).expand(localTranslation).toBPoints();
    };
    const convertToLocalCoords = (boundingPoints: BoundingPoints): BoundingPoints => {
      const localTranslation = draggerState.value.translation;
      if (!localTranslation) throw new UnexpectedStateError();

      return new BoundsTransformer(boundingPoints).relativeFrom(localTranslation).toBPoints();
    };

    return {
      itemType,
      outlineBounds,
      isStarted,
      drag,
      finish
    };
  }
});
</script>

<style scoped>
.th-layer-item-dragger {
  stroke: none;
  fill: none;
  pointer-events: visible;
  cursor: move;
}
</style>
