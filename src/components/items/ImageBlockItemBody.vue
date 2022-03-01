<template>
  <g>
    <rect
      :x="item.x"
      :y="item.y"
      :width="item.width"
      :height="item.height"
      class="th-image-block-body"
    />
    <foreignObject
      :x="item.x"
      :y="item.y"
      :width="item.width"
      :height="item.height"
    >
      <div class="th-image-icon-wrapper">
        <div
          class="th-image-icon"
          :style="iconStyle"
        >
          <i class="mdi mdi-image-area" />
        </div>
      </div>
    </foreignObject>
    <ItemIdLabel
      :label="id"
      :x="item.x"
      :y="item.y"
    />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';
import ItemIdLabel from './ItemIdLabel.vue';
import { ImageBlockItem } from '@/types';

export default defineComponent({
  components: {
    ItemIdLabel
  },
  props: {
    item: {
      type: Object as () => ImageBlockItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const id = computed((): string => {
      return item.value.id === '' ? 'no id' : item.value.id;
    });
    const iconStyle = computed(() => {
      return {
        fontSize: `${inverseScale(1.7, editor.getters.zoomRate())}rem`
      };
    });

    return {
      id,
      iconStyle
    };
  }
});
</script>

<style scoped>
.th-image-block-body {
  stroke: none;
  fill: var(--th-active-color);
  fill-opacity: 0.2;
}

.th-image-icon-wrapper {
  pointer-events: none;
  display: table;
  width: 100%;
  height: 100%;
}

.th-image-icon {
  display: table-cell;
  user-select: none;
  pointer-events: none;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
}
</style>
