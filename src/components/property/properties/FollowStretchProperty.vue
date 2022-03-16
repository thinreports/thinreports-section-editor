<template>
  <SelectProperty
    :label="$t('label.follow_stretch')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { Item } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => Item['followStretch'],
      required: true
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { ignoreHeight } = toRefs(props);

    const options = computed((): Option<Item['followStretch']>[] => {
      const options: Option<Item['followStretch']>[] = [
        { label: 'none', value: 'none' },
        { label: 'y', value: 'y' }
      ];

      return ignoreHeight.value ? options : [...options, { label: 'height', value: 'height' }];
    });

    const update = (value: Item['followStretch']) => {
      emit('change', value);
    };

    return {
      options,
      update
    };
  }
});
</script>

<style scoped></style>
