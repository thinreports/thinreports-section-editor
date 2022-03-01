<template>
  <SelectProperty
    :label="$t('label.font.family')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { BuiltinFontFamily } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => BuiltinFontFamily,
      required: true
    }
  },
  setup (_, { emit }) {
    const options = computed((): Option<BuiltinFontFamily>[] => {
      return [
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'IPA 明朝', value: 'IPAMincho' },
        { label: 'IPA P明朝', value: 'IPAPMincho' },
        { label: 'IPA ゴシック', value: 'IPAGothic' },
        { label: 'IPA Pゴシック', value: 'IPAPGothic' }
      ];
    });

    const update = (value: BuiltinFontFamily) => {
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
