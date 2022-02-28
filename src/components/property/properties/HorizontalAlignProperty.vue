<template>
  <SelectProperty
    :label="$t('label.align.horizontal.horizontal')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { useI18n } from '@/composables/useI18n';
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
  setup (_, { emit }) {
    const { i18n } = useI18n();

    const options = computed((): Option<HorizontalAlign>[] => {
      return [
        { label: i18n.value.tc('label.align.horizontal.left'), value: 'left' },
        { label: i18n.value.tc('label.align.horizontal.center'), value: 'center' },
        { label: i18n.value.tc('label.align.horizontal.right'), value: 'right' }
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
