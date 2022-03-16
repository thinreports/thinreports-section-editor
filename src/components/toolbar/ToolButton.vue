<template>
  <button
    type="button"
    class="th-button uk-button uk-button-default"
    :class="{ 'th-active': active }"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup (_, { emit }) {
    const click = () => {
      emit('click');
    };

    return {
      click
    };
  }
});
</script>

<style scoped>
.th-button {
  text-align: center;
  font-size: 1.5rem;
  color: #ffffff;
  border: 0;
  width: 40px;
  padding: 0;
}

.th-button:active, .th-button:focus {
  color: #ffffff;
}

.th-button:hover {
  color: #ffffff;
  background-color: #555;
}

.th-active, .th-active:hover, .th-active:active, .th-active:focus {
  color: #ffffff;
  background-color: var(--th-active-color);
}
</style>
