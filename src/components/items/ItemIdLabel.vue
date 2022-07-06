<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <text
    :x="x"
    :y="y"
    :dx="left"
    :font-size="fontSize"
    dominant-baseline="text-before-edge"
    class="th-id-label"
    v-text="label"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  setup () {
    const zoomRate = computed(() => editor.getters.zoomRate());
    const fontSize = computed((): number => {
      return inverseScale(10, zoomRate.value);
    });
    const left = computed((): number => {
      return inverseScale(3, zoomRate.value);
    });

    return {
      fontSize,
      left
    };
  }
});
</script>

<style scoped>
.th-id-label {
  pointer-events: none;
  fill: var(--th-active-color);
}
</style>
