<template>
  <i :class="iconClass" />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { SectionType } from '../../types';

export default defineComponent({
  props: {
    type: {
      type: String as () => SectionType,
      required: true
    }
  },
  setup (props) {
    const { type } = toRefs(props);

    const iconClass = computed(() => {
      switch (type.value) {
        case 'header': return 'mdi mdi-page-layout-header';
        case 'detail': return 'mdi mdi-page-layout-body';
        case 'footer': return 'mdi mdi-page-layout-footer';
        default: throw new Error('Invalid section type');
      }
    });

    return {
      iconClass
    };
  }
});
</script>
