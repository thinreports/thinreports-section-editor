<template>
  <SelectProperty
    :label="$t('label.align.vertical.vertical')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { VerticalAlign } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => VerticalAlign,
      required: true
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const { t } = useI18n();

    const options = computed((): Option<VerticalAlign>[] => {
      return [
        { label: t('label.align.vertical.top'), value: 'top' },
        { label: t('label.align.vertical.middle'), value: 'middle' },
        { label: t('label.align.vertical.bottom'), value: 'bottom' }
      ];
    });

    const update = (value: VerticalAlign) => {
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
