<template>
  <TextProperty
    :label="$t('label.font.size')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { ItemTextStyle } from '../../../types';
import TextProperty from '@/components/property/properties/base/TextProperty.vue';

export default defineComponent({
  components: {
    TextProperty
  },
  props: {
    value: {
      type: Number as () => ItemTextStyle['fontSize'],
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
