<template>
  <li>
    <NodeButton
      :id="itemId"
      :name="itemType"
      :active="active"
      @click="emitActivate"
    >
      <ItemIcon :type="itemType" />
    </NodeButton>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Item } from '../../types';
import ItemIcon from '../icons/ItemIcon.vue';
import NodeButton from './NodeButton.vue';

export default defineComponent({
  components: {
    ItemIcon,
    NodeButton
  },
  props: {
    itemId: {
      type: String as () => Item['id'],
      required: true
    },
    itemType: {
      type: String as () => Item['type'],
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup (_, { emit }) {
    const emitActivate = () => {
      emit('activate');
    };

    return {
      emitActivate
    };
  }
});
</script>

<style scoped></style>
