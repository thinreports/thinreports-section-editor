<template>
  <TextProperty
    :label="$t('label.height')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextProperty from './base/TextProperty.vue';

export default defineComponent({
  components: {
    TextProperty
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const update = (value: string) => {
      emit('change', Number(value));
    };

    return {
      update
    };
  }
});
</script>

<style scoped></style>
