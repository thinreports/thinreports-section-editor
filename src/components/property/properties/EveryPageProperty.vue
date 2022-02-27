<template>
  <CheckProperty
    :label="$t('label.every_page')"
    :value="value"
    @change="update"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api';
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
