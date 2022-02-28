<template>
  <SelectProperty
    :label="$t('label.align.vertical.vertical')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { useI18n } from '@/composables/useI18n';
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
  setup (_, { emit }) {
    const { i18n } = useI18n();

    const options = computed((): Option<VerticalAlign>[] => {
      return [
        { label: i18n.value.tc('label.align.vertical.top'), value: 'top' },
        { label: i18n.value.tc('label.align.vertical.middle'), value: 'middle' },
        { label: i18n.value.tc('label.align.vertical.bottom'), value: 'bottom' }
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
