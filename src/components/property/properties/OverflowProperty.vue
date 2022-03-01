<template>
  <SelectProperty
    :label="$t('label.text.overflow.overflow')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { useI18n } from '@/composables/useI18n';
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
    const { i18n } = useI18n();

    const options = computed((): Option<TextOverflowStyle>[] => {
      return [
        { label: i18n.value.tc('label.text.overflow.truncate'), value: 'truncate' },
        { label: i18n.value.tc('label.text.overflow.fit'), value: 'fit' },
        { label: i18n.value.tc('label.text.overflow.expand'), value: 'expand' }
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
