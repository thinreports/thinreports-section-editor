<template>
  <div class="uk-flex uk-flex-middle th-property">
    <div class="th-label">
      {{ label }}
    </div>
    <div class="uk-flex uk-width-expand">
      <input
        type="text"
        class="uk-input"
        :placeholder="placeholder"
        :value="value"
        @change="change($event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, nextTick } from '@vue/composition-api';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup (_, { emit }) {
    const instance = getCurrentInstance();

    const change = async (value: string) => {
      emit('change', value);

      // When the value becomes the same as the current value due to rounding processing, etc.,
      // the change cannot be detected, so the update is forcibly executedcak.
      await nextTick();
      instance?.proxy?.$forceUpdate();
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

input {
  font-size: 0.8rem;
  height: 20px;
}
</style>
