<template>
  <a
    href="#"
    :class="['th-button', { active }]"
    @click.prevent="emitClick"
  >
    <slot />
    {{ label }}
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { name, id } = toRefs(props);

    const label = computed(() => {
      return id.value !== '' ? `#${id.value}` : name.value;
    });

    const emitClick = () => {
      emit('click');
    };

    return {
      label,
      emitClick
    };
  }
});
</script>

<style scoped>
.th-button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.th-button.active,
.th-button.active:active,
.th-button.active:focus,
.th-button.active:hover,
.th-button.active span {
  color: var(--th-active-color);
}
</style>
