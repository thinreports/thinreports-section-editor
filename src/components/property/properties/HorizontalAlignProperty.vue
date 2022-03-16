<template>
  <SelectProperty
    :label="$t('label.align.horizontal.horizontal')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { HorizontalAlign } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => HorizontalAlign,
      required: true
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const { t } = useI18n();

    const options = computed((): Option<HorizontalAlign>[] => {
      return [
        { label: t('label.align.horizontal.left'), value: 'left' },
        { label: t('label.align.horizontal.center'), value: 'center' },
        { label: t('label.align.horizontal.right'), value: 'right' }
      ];
    });

    const update = (value: HorizontalAlign) => {
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
