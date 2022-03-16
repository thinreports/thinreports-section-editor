<template>
  <TextProperty
    label="ID"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
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
