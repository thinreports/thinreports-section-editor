<template>
  <g>
    <EllipseItemOutline
      v-if="itemType === 'ellipse'"
      :bounding-box="boundingBox"
    />
    <LineItemOutline
      v-else-if="itemType === 'line'"
      :bounding-points="boundingPoints"
    />
    <BoxItemOutline
      v-else
      :bounds="boundingBox"
    />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { BoundsTransformer } from '../../lib/bounds-transformer';
import BoxItemOutline from './BoxItemOutline.vue';
import EllipseItemOutline from './EllipseItemOutline.vue';
import LineItemOutline from './LineItemOutline.vue';
import { BoundingPoints, ItemType, BoundingBox } from '@/types';

export default defineComponent({
  components: {
    EllipseItemOutline,
    BoxItemOutline,
    LineItemOutline
  },
  props: {
    itemType: {
      type: String as () => ItemType,
      required: true
    },
    boundingPoints: {
      type: Object as () => BoundingPoints,
      required: true
    }
  },
  setup (props) {
    const { boundingPoints } = toRefs(props);

    const boundingBox = computed((): BoundingBox => {
      return new BoundsTransformer(boundingPoints.value).toBBox();
    });

    return {
      boundingBox
    };
  }
});
</script>
