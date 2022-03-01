<template>
  <ItemEntity
    :item="item"
    @itemDrag="dragStart"
    @itemClick="activate"
  >
    <LineItemHighligher
      v-if="isActive"
      :item="item"
    />
    <LineItemBody :item="item" />
    <LineItemSelector :item="item" />
  </ItemEntity>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import ItemEntity from './ItemEntity.vue';
import LineItemBody from './LineItemBody.vue';
import LineItemHighligher from './LineItemHighligher.vue';
import LineItemSelector from './LineItemSelector.vue';
import { LineItem } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    LineItemBody,
    LineItemHighligher,
    LineItemSelector
  },
  props: {
    item: {
      type: Object as () => LineItem,
      required: true
    }
  },
  setup (props, { emit }) {
    const { item } = toRefs(props);

    const isActive = computed((): boolean => {
      return report.getters.isActiveItem(item.value.uid);
    });

    const dragStart = () => {
      emit('itemDragStart', item.value);
    };
    const activate = () => {
      report.actions.activateEntity({ uid: item.value.uid, type: 'item' });
    };

    return {
      isActive,
      dragStart,
      activate
    };
  }
});
</script>
