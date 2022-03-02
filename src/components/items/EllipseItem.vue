<template>
  <ItemEntity
    :item="item"
    @itemDrag="dragStart"
    @itemClick="activate"
  >
    <EllipseItemHighlighter
      v-if="isActive"
      :item="item"
    />
    <EllipseItemBody :item="item" />
  </ItemEntity>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import EllipseItemBody from './EllipseItemBody.vue';
import EllipseItemHighlighter from './EllipseItemHighlighter.vue';
import ItemEntity from './ItemEntity.vue';
import { EllipseItem } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    EllipseItemBody,
    EllipseItemHighlighter
  },
  props: {
    item: {
      type: Object as () => EllipseItem,
      required: true
    }
  },
  emits: ['itemDragStart'],
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
