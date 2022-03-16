<template>
  <SelectProperty
    :label="$t('label.stroke.type.type')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import SelectProperty, { Option } from '@/components/property/properties/base/SelectProperty.vue';
import { ItemBorderStyle } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => ItemBorderStyle['borderStyle'],
      required: true
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const { t } = useI18n();

    const options = computed((): Option<ItemBorderStyle['borderStyle']>[] => {
      return [
        { label: t('label.stroke.type.solid'), value: 'solid' },
        { label: t('label.stroke.type.dashed'), value: 'dashed' },
        { label: t('label.stroke.type.dotted'), value: 'dotted' }
      ];
    });

    const update = (value: string) => {
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
