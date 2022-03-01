<template>
  <TextProperty
    :label="$t('label.description')"
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
      type: String,
      default: ''
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
