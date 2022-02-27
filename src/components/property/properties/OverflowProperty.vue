<template>
  <SelectProperty
    :label="$t('label.text.overflow.overflow')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { TextOverflowStyle } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => TextOverflowStyle,
      required: true
    }
  },
  setup (_, { emit }) {
    const options = computed((): Option<TextOverflowStyle>[] => {
      return [
        { label: this.$tc('label.text.overflow.truncate'), value: 'truncate' },
        { label: this.$tc('label.text.overflow.fit'), value: 'fit' },
        { label: this.$tc('label.text.overflow.expand'), value: 'expand' }
      ];
    });

    const update = (value: TextOverflowStyle) => {
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
