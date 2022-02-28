<template>
  <div class="uk-flex uk-flex-middle th-property">
    <div class="th-label">
      {{ label }}
    </div>
    <div class="uk-flex uk-width-expand">
      <input
        type="checkbox"
        class="uk-checkbox"
        :checked="value"
        @change="change"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const { value } = toRefs(props);

    const change = () => {
      emit('change', !value.value);
    };

    return {
      change
    };
  }
});
</script>

<style scoped>
.th-property {
  height: 30px;
}

.th-label {
  font-size: 0.8rem;
  width: 100px;
}
</style>
