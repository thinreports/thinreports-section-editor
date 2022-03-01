<template>
  <SelectProperty
    :label="$t('label.text.word_wrap')"
    :value="value"
    :options="options"
    @change="update"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SelectProperty, { Option } from './base/SelectProperty.vue';
import { useI18n } from '@/composables/useI18n';
import { TextWordWrapStyle } from '@/types';

export default defineComponent({
  components: {
    SelectProperty
  },
  props: {
    value: {
      type: String as () => TextWordWrapStyle,
      required: true
    }
  },
  setup (_, { emit }) {
    const { i18n } = useI18n();

    const options = computed((): Option<TextWordWrapStyle>[] => {
      return [
        { label: i18n.value.tc('label.text.word_wrap_none'), value: 'none' },
        { label: i18n.value.tc('label.text.word_wrap_break_word'), value: 'break-word' }
      ];
    });

    const update = (value: TextWordWrapStyle) => {
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
