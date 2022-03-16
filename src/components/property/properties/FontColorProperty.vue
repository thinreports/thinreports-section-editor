<template>
  <TextProperty
    :label="$t('label.font.color')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextProperty from '@/components/property/properties/base/TextProperty.vue';

export default defineComponent({
  components: {
    TextProperty
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  emits: ['change'],
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
