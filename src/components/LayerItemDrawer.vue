<template>
  <g>
    <rect
      width="100%"
      height="100%"
      class="th-layer-item-drawer"
      @pointermove="draw"
      @pointerup="finish"
    />
    <g
      v-if="isStarted"
      :transform="reportTransform"
    >
      <ItemOutline
        :item-type="drawerState.itemType"
        :bounding-points="outlineBounds"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';
import { BoundsTransformer } from '../lib/bounds-transformer';
import { operator, report, editor } from '../store';
import ItemOutline from './items/ItemOutline.vue';
import { BoundingPoints, Coords } from '@/types';

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

    const outlineBounds = ref<BoundingPoints | null>(null);

    const isStarted = computed((): boolean => {
      return outlineBounds.value !== null;
    });
    const drawerState = computed(() => operator.state.itemDrawer);

    const cancel = () => {
      operator.actions.finishItemDraw();
    };
    const isOutlineEmpty = () => {
      if (outlineBounds.value) {
        const box = new BoundsTransformer(outlineBounds.value).toBBox();
        return box.width < 4 && box.height < 4;
      } else {
        return true;
      }
    };
    const drawNewItem = (bounds: BoundingPoints) => {
      const { itemType, targetType, targetUid } = drawerState.value;

      if (!itemType || !targetType || !targetUid) throw new UnexpectedStateError();

      const payload = { targetType, targetUid, bounds };

      switch (itemType) {
        case 'rect': report.actions.drawNewRectItem(payload); break;
        case 'ellipse': report.actions.drawNewEllipseItem(payload); break;
        case 'line': report.actions.drawNewLineItem(payload); break;
        case 'text': report.actions.drawNewTextItem(payload); break;
        case 'text-block': report.actions.drawNewTextBlockItem(payload); break;
        case 'image-block': report.actions.drawNewImageBlockItem(payload); break;
        case 'stack-view': report.actions.drawNewStackViewItem(payload); break;
        default:
          throw new Error(`Invalid itemType: ${itemType}`);
      }
    };
    const convertToLocalCoords = (bPoints: BoundingPoints): BoundingPoints => {
      const localTranslation = drawerState.value.translation;
      if (!localTranslation) throw new UnexpectedStateError();

      return new BoundsTransformer(bPoints).relativeFrom(localTranslation).toBPoints();
    };

    const start = (e: MouseEvent) => {
      const point = transformSvgPoint.value(e);

      outlineBounds.value = {
        x1: point.x,
        y1: point.y,
        x2: point.x,
        y2: point.y
      };
    };
    const draw = (e: MouseEvent) => {
      const point = transformSvgPoint.value(e);

      if (!isStarted.value) start(e);
      if (!outlineBounds.value) throw new UnexpectedStateError();

      outlineBounds.value.x2 = point.x;
      outlineBounds.value.y2 = point.y;
    };
    const finish = () => {
      if (!isStarted.value || isOutlineEmpty()) {
        cancel();
        return;
      }

      if (!outlineBounds.value) throw new UnexpectedStateError();

      drawNewItem(convertToLocalCoords(outlineBounds.value));

      operator.actions.finishItemDraw();
      editor.actions.activateTool({ tool: 'select' });
    };

    return {
      outlineBounds,
      isStarted,
      drawerState,
      draw,
      finish
    };
  }
});
</script>

<style scoped>
.th-layer-item-drawer {
  stroke: none;
  fill: none;
  pointer-events: visible;
  cursor: crosshair;
}
</style>
