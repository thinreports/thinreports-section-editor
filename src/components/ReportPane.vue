<template>
  <div
    ref="refContainer"
    class="th-report-pane"
  >
    <svg
      ref="refCanvasSvg"
      :viewBox="viewBox"
      :width="canvasWidth || '100%'"
      :height="canvasHeight || '100%'"
      :style="{ minWidth }"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <g
        ref="refCanvas"
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
import { computed, defineComponent, nextTick, onBeforeMount, onMounted, ref } from '@vue/composition-api';
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
  setup () {
    const refContainer = ref(null);
    const refCanvasSvg = ref(null);
    const refCanvas = ref(null);
    const containerSize = ref<Size | null>(null);

    const contentSize = computed((): Size => {
      const { width, height } = report.getters.contentSize();
      const zoomRate = editor.getters.zoomRate();
      return {
        width: calcMul(width, zoomRate),
        height: calcMul(height, zoomRate)
      };
    });
    const canvasWidth = computed((): number | null => {
      if (!containerSize.value) return null;
      return containerSize.value.width < contentSize.value.width + REPORT_MARGIN_PX * 2 ? contentSize.value.width + REPORT_MARGIN_PX * 2 : containerSize.value.width;
    });
    const canvasHeight = computed((): number | null => {
      if (!containerSize.value) return null;
      return (containerSize.value.height < contentSize.value.height + REPORT_MARGIN_PX * 2 ? contentSize.value.height + REPORT_MARGIN_PX * 2 : containerSize.value.height);
    });
    const minWidth = computed((): string => {
      return canvasWidth.value !== null ? `${canvasWidth.value}px` : '100%';
    });
    const isItemDraggerActive = computed(() => operator.state.itemDragger.active);
    const isItemDrawerActive = computed(() => operator.state.itemDrawer.active);
    const reportTranslation = computed((): Translation => {
      if (canvasWidth.value !== null && canvasHeight.value !== null) {
        const x = calcMinus(calcDiv(canvasWidth.value, 2), calcDiv(contentSize.value.width, 2));
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
      if (canvasWidth.value !== null && canvasHeight.value !== null) {
        return [0, 0, canvasWidth.value, canvasHeight.value].join(' ');
      } else {
        return null;
      }
    });

    const recalculateContainerSize = () => {
      const containerClientRect = (refContainer.value! as HTMLElement).getBoundingClientRect();
      containerSize.value = {
        width: containerClientRect.width,
        height: containerClientRect.height
      };
    };
    const transformSvgPoint = (point: Coords): Coords => {
      const canvasSvg = refCanvasSvg.value! as SVGSVGElement;
      const canvas = refCanvas.value! as SVGGElement;
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

    // created
    report.actions.addInitialSections();

    onMounted(() => {
      window.addEventListener('resize', recalculateContainerSize);
      nextTick(() => recalculateContainerSize());
    });

    onBeforeMount(() => {
      window.removeEventListener('resize', recalculateContainerSize);
    });

    return {
      reportTransform,
      viewBox,
      minWidth,
      canvasWidth,
      canvasHeight,
      isItemDraggerActive,
      isItemDrawerActive,
      transformSvgPoint,
      refContainer,
      refCanvasSvg,
      refCanvas
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
