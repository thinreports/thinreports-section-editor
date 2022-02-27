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
    const options = computed((): Option<ItemBorderStyle['borderStyle']>[] => {
      return [
        { label: this.$tc('label.stroke.type.solid'), value: 'solid' },
        { label: this.$tc('label.stroke.type.dashed'), value: 'dashed' },
        { label: this.$tc('label.stroke.type.dotted'), value: 'dotted' }
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
