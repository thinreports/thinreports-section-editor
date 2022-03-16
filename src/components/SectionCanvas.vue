<template>
  <g :transform="transform">
    <CanvasDrawer
      v-if="isDrawMode"
      :width="width"
      :height="section.height"
      @startDraw="startDrawItem"
    />
    <SectionCanvasHighlighter
      v-if="isActive"
      :height="section.height"
    />
    <g
      v-for="item in items"
      :key="item.uid"
    >
      <StackViewItem
        v-if="item.type === 'stack-view'"
        :item="item"
        :section-translation="translation"
        @itemDragStart="startDragItem"
      />
      <component
        :is="`${item.type}-item`"
        v-else
        :item="item"
        @itemDragStart="startDragItem"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report, operator, editor } from '../store';
import SectionCanvasHighlighter from './SectionCanvasHighlighter.vue';
import CanvasDrawer from './base/CanvasDrawer.vue';
import EllipseItem from './items/EllipseItem.vue';
import ImageBlockItem from './items/ImageBlockItem.vue';
import ImageItem from './items/ImageItem.vue';
import LineItem from './items/LineItem.vue';
import RectItem from './items/RectItem.vue';
import StackViewItem from './items/StackViewItem.vue';
import TextBlockItem from './items/TextBlockItem.vue';
import TextItem from './items/TextItem.vue';
import { AnySection, AnyItem, ItemType, Coords } from '@/types';

export default defineComponent({
  components: {
    RectItem,
    EllipseItem,
    LineItem,
    TextItem,
    TextBlockItem,
    ImageBlockItem,
    ImageItem,
    StackViewItem,
    SectionCanvasHighlighter,
    CanvasDrawer
  },
  props: {
    section: {
      type: Object as () => AnySection,
      required: true
    },
    top: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const { section, top } = toRefs(props);

    const paperSize = computed(() => report.getters.paperSize());
    const isDrawMode = computed(() => editor.getters.isDrawMode());
    const width = computed((): number => {
      return paperSize.value.width;
    });
    const translation = computed((): Coords => {
      return { x: 0, y: top.value };
    });
    const transform = computed((): string => {
      return `translate(${Object.values(translation.value).join(',')})`;
    });
    const isActive = computed((): boolean => {
      return report.getters.isActiveSection(section.value.uid);
    });
    const items = computed((): AnyItem[] => {
      const getters = report.getters;
      return section.value.items.map(uid => getters.findItem(uid));
    });

    const startDragItem = (item: AnyItem) => {
      operator.actions.startItemDrag({
        itemUid: item.uid,
        translation: translation.value
      });
    };
    const startDrawItem = () => {
      const itemType = editor.state.activeTool as ItemType;

      operator.actions.startItemDraw({
        itemType,
        targetType: 'section',
        targetUid: section.value.uid,
        translation: translation.value
      });
    };

    return {
      isDrawMode,
      width,
      transform,
      translation,
      isActive,
      items,
      startDragItem,
      startDrawItem
    };
  }
});
</script>

<style scoped>
.th-section-body {
  fill: #ffffff;
  stroke: none;
  fill-opacity: 0;
}
</style>
