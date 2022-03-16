<template>
  <TextAreaProperty
    :label="$t('label.text.text')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import TextAreaProperty from './base/TextAreaProperty.vue';

export default defineComponent({
  components: {
    TextAreaProperty
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup (_, { emit }) {
    const update = (value: string) => {
      emit('change', value);
    };

    return {
      update
    };
  }
});
</script>

<style scoped></style>
