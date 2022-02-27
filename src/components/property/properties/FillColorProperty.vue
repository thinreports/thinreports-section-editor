<template>
  <TextProperty
    :label="$t('label.fill_color')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
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
