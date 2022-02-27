<template>
  <div
    ref="container"
    class="th-report-pane"
  >
    <svg
      ref="canvasSvg"
      :viewBox="viewBox"
      :width="width || '100%'"
      :height="height || '100%'"
      :style="{ minWidth }"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <g
        ref="canvas"
        :transform="reportTransform"
      >
        <ReportCanvas />
      </g>
      <g style="pointer-events: none;">
        <LayerItemDrawer
          v-if="isItemDrawerActive"
          :report-transform="reportTransform"
          :transform-svg-point="transformSvgPoint"
        />
        <LayerItemDragger
          v-if="isItemDraggerActive"
          :report-transform="reportTransform"
          :transform-svg-point="transformSvgPoint"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from '@vue/composition-api';
import { calcDiv, calcMinus, calcMul } from '../lib/strict-calculator';
import { Translation, Size, Coords } from '../types';
import LayerItemDragger from './LayerItemDragger.vue';
import LayerItemDrawer from './LayerItemDrawer.vue';
import ReportCanvas from './ReportCanvas.vue';
import { report, editor, operator } from '@/store';

const REPORT_MARGIN_PX = 60;

export default defineComponent({
  components: {
    ReportCanvas,
    LayerItemDrawer,
    LayerItemDragger
  },
  created () {
    report.actions.addInitialSections();
  },
  mounted () {
    window.addEventListener('resize', recalculateContainerSize);
    nextTick(() => recalculateContainerSize());
  },
  beforeDestroy () {
    window.removeEventListener('resize', recalculateContainerSize);
  },
  setup () {
    const containerSize = ref<Size | null>(null);

    const reportTranslation = computed((): Translation => {
      if (width.value !== null && height.value !== null) {
        const x = calcMinus(calcDiv(width.value, 2), calcDiv(contentSize.value.width, 2));
        return {
          x: x < REPORT_MARGIN_PX ? REPORT_MARGIN_PX : x,
          y: REPORT_MARGIN_PX
        };
      } else {
        return { x: 0, y: 0 };
      }
    });
    const reportTransform = computed((): string => {
      const translation = reportTranslation.value;
      return `translate(${translation.x},${translation.y}) scale(${editor.getters.zoomRate()})`;
    });
    const viewBox = computed((): string | null => {
      if (width.value !== null && height.value !== null) {
        return [0, 0, width.value, height.value].join(' ');
      } else {
        return null;
      }
    });
    const minWidth = computed((): string => {
      return width.value !== null ? `${width.value}px` : '100%';
    });
    const width = computed((): number | null => {
      if (!containerSize.value) return null;
      return containerSize.value.width < contentSize.value.width + REPORT_MARGIN_PX * 2 ? contentSize.value.width + REPORT_MARGIN_PX * 2 : containerSize.value.width;
    });
    const height = computed((): number | null => {
      if (!containerSize.value) return null;
      return (containerSize.value.height < contentSize.value.height + REPORT_MARGIN_PX * 2 ? contentSize.value.height + REPORT_MARGIN_PX * 2 : containerSize.value.height);
    });
    const isItemDraggerActive = computed(() => operator.state.itemDragger.active);
    const isItemDrawerActive = computed(() => operator.state.itemDrawer.active);
    const contentSize = computed((): Size => {
      const { width, height } = report.getters.contentSize();
      const zoomRate = editor.getters.zoomRate();
      return {
        width: calcMul(width, zoomRate),
        height: calcMul(height, zoomRate)
      };
    });

    const recalculateContainerSize = () => {
      const containerClientRect = (this.$refs.container as HTMLElement).getBoundingClientRect();
      containerSize.value = {
        width: containerClientRect.width,
        height: containerClientRect.height
      };
    };
    const transformSvgPoint = (point: Coords): Coords => {
      const canvasSvg = this.$refs.canvasSvg as SVGSVGElement;
      const canvas = this.$refs.canvas as SVGGElement;
      const canvasCTM = canvas.getScreenCTM();

      if (!canvasCTM) throw new Error('Failed to transform point');

      const svgPoint = canvasSvg.createSVGPoint();
      svgPoint.x = point.x;
      svgPoint.y = point.y;

      const transformedPoint = svgPoint.matrixTransform(canvasCTM.inverse());

      return {
        x: transformedPoint.x,
        y: transformedPoint.y
      };
    };

    return {
      reportTransform,
      viewBox,
      minWidth,
      width,
      height,
      isItemDraggerActive,
      isItemDrawerActive,
      transformSvgPoint
    };
  }
});
</script>

<style scoped>
.th-report-pane {
  overflow: auto;
  background-color: #e0e0e0;
}
</style>
