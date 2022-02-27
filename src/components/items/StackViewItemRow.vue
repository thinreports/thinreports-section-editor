<template>
  <g :transform="transform">
    <CanvasDrawer
      v-if="isDrawMode"
      :width="bounds.width"
      :height="bounds.height"
      @startDraw="startDrawItem"
    />
    <StackViewItemRowHighlighter
      v-if="isActive"
      :height="bounds.height"
    />
    <g
      v-for="item in items"
      :key="item.uid"
    >
      <component
        :is="`${item.type}-item`"
        :item="item"
        @itemDragStart="startDragItem"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';
import { calcPlus } from '../../lib/strict-calculator';
import { report, operator, editor } from '../../store';
import CanvasDrawer from '../base/CanvasDrawer.vue';
import EllipseItem from './EllipseItem.vue';
import ImageBlockItem from './ImageBlockItem.vue';
import ImageItem from './ImageItem.vue';
import LineItem from './LineItem.vue';
import RectItem from './RectItem.vue';
import StackViewItemRowHighlighter from './StackViewItemRowHighlighter.vue';
import TextBlockItem from './TextBlockItem.vue';
import TextItem from './TextItem.vue';
import { StackViewRow, AnyItem, ItemType, Translation, BoundingBox } from '@/types';

export default defineComponent({
  components: {
    RectItem,
    EllipseItem,
    LineItem,
    TextItem,
    TextBlockItem,
    ImageBlockItem,
    ImageItem,
    StackViewItemRowHighlighter,
    CanvasDrawer
  },
  props: {
    row: {
      type: Object as () => StackViewRow,
      required: true
    },
    bounds: {
      type: Object as () => BoundingBox,
      required: true
    },
    sectionTranslation: {
      type: Object as () => Translation,
      required: true
    }
  },
  setup (props) {
    const { row, bounds, sectionTranslation } = toRefs(props);

    const pointerDown = ref(false);

    const isDrawMode = computed(() => editor.getters.isDrawMode());
    const transform = computed((): string => {
      return `translate(${Object.values(translation.value).join(',')})`;
    });
    const translation = computed((): Translation => {
      return { x: bounds.value.x, y: bounds.value.y };
    });
    const translationByReport = computed((): Translation => {
      return {
        x: calcPlus(translation.value.x, sectionTranslation.value.x),
        y: calcPlus(translation.value.y, sectionTranslation.value.y)
      };
    });
    const isActive = computed((): boolean => {
      return report.getters.isActiveStackViewRow(row.value.uid);
    });
    const items = computed((): AnyItem[] => {
      return row.value.items.map(uid => report.getters.findItem(uid));
    });

    const startDragItem = (item: AnyItem) => {
      operator.actions.startItemDrag({
        itemUid: item.uid,
        translation: translationByReport.value
      });
    };
    const startDrawItem = () => {
      const itemType = editor.state.activeTool as ItemType;

      if (itemType === 'stack-view') return;

      operator.actions.startItemDraw({
        itemType,
        targetType: 'stack-view-row',
        targetUid: row.value.uid,
        translation: translationByReport.value
      });
    };

    return {
      isDrawMode,
      transform,
      isActive,
      items,
      startDragItem,
      startDrawItem
    };
  }
});
</script>

<style scoped></style>
