<template>
  <ellipse
    :cx="cx"
    :cy="cy"
    :rx="rx"
    :ry="ry"
    :stroke-width="strokeWidth"
    class="th-ellipse-item-outline"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { inverseScale } from '@/lib/inverse-scale';
import { editor } from '@/store';
import { BoundingBox, EllipseItem } from '@/types';

export default defineComponent({
  props: {
    boundingBox: {
      type: Object as () => BoundingBox,
      required: true
    }
  },
  setup (props) {
    const { boundingBox } = toRefs(props);

    const rx = computed((): EllipseItem['rx'] => {
      return boundingBox.value.width / 2;
    });
    const ry = computed((): EllipseItem['ry'] => {
      return boundingBox.value.height / 2;
    });
    const cx = computed((): EllipseItem['cx'] => {
      return boundingBox.value.x + rx.value;
    });
    const cy = computed((): EllipseItem['cy'] => {
      return boundingBox.value.y + ry.value;
    });
    const strokeWidth = computed((): number => {
      return inverseScale(1, editor.getters.zoomRate());
    });

    return {
      cx,
      cy,
      rx,
      ry,
      strokeWidth
    };
  }
});
</script>

<style scoped>
.th-ellipse-item-outline {
  stroke: #999;
  fill: none;
}
</style>
