<template>
  <ul>
    <li>
      <NodeButton
        :id="rowId"
        name="row"
        :active="active"
        @click="emitActivate"
      >
        <i class="mdi mdi-view-agenda-outline" />
      </NodeButton>
      <ul v-if="itemUids.length">
        <GraphicItemNode
          v-for="item in items"
          :key="item.uid"
          :item-id="item.id"
          :item-type="item.type"
          :active="activeItemUid === item.uid"
          @activate="activateItem(item.uid)"
        />
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import { ItemUid, StackViewRow, GraphicItem } from '../../types';
import GraphicItemNode from './GraphicItemNode.vue';
import NodeButton from './NodeButton.vue';

export default defineComponent({
  components: {
    GraphicItemNode,
    NodeButton
  },
  props: {
    rowId: {
      type: String as () => StackViewRow['id'],
      required: true
    },
    itemUids: {
      type: Array as () => ItemUid[],
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['activate'],
  setup (props, { emit }) {
    const { itemUids } = toRefs(props);

    const items = computed((): GraphicItem[] => {
      return itemUids.value.map(uid => report.getters.findGraphicItem(uid));
    });
    const activeItemUid = computed(() => report.getters.activeItem()?.uid);

    const emitActivate = () => {
      emit('activate');
    };
    const activateItem = (uid: ItemUid) => {
      report.actions.activateEntity({ type: 'item', uid });
    };

    return {
      items,
      activeItemUid,
      emitActivate,
      activateItem
    };
  }
});
</script>
