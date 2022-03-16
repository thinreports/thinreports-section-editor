<template>
  <CheckProperty
    :label="$t('label.affect_bottom_margin')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import CheckProperty from './base/CheckProperty.vue';

export default defineComponent({
  components: {
    CheckProperty
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const { value } = toRefs(props);

    const update = () => {
      emit('change', !value.value);
    };

    return {
      update
    };
  }
});
</script>

<style scoped></style>
