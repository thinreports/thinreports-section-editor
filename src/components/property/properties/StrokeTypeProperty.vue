<template>
  <SelectProperty
    :label="$t('label.stroke.type.type')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import SelectProperty, { Option } from '@/components/property/properties/base/SelectProperty.vue';
import { useI18n } from '@/composables/useI18n';
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
  setup (_, { emit }) {
    const { i18n } = useI18n();

    const options = computed((): Option<ItemBorderStyle['borderStyle']>[] => {
      return [
        { label: i18n.value.tc('label.stroke.type.solid'), value: 'solid' },
        { label: i18n.value.tc('label.stroke.type.dashed'), value: 'dashed' },
        { label: i18n.value.tc('label.stroke.type.dotted'), value: 'dotted' }
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
