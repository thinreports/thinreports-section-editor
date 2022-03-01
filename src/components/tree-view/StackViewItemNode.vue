<template>
  <li>
    <NodeButton
      :id="itemId"
      name="stack-view"
      :active="active"
      @click="emitActivate"
    >
      <ItemIcon type="stack-view" />
    </NodeButton>
    <StackViewItemRowNode
      v-for="row in rows"
      :key="row.uid"
      :row-id="row.id"
      :item-uids="row.items"
      :active="activeRowUid === row.uid"
      @activate="activateRow(row.uid)"
    />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import { StackViewItem, StackViewRow, StackViewRowUid } from '../../types';
import ItemIcon from '../icons/ItemIcon.vue';
import NodeButton from './NodeButton.vue';
import StackViewItemRowNode from './StackViewItemRowNode.vue';

export default defineComponent({
  components: {
    StackViewItemRowNode,
    NodeButton,
    ItemIcon
  },
  props: {
    itemId: {
      type: String as () => StackViewItem['id'],
      required: true
    },
    rowUids: {
      type: Array as () => StackViewRowUid[],
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { rowUids } = toRefs(props);

    const rows = computed((): StackViewRow[] => {
      return rowUids.value.map(uid => report.getters.findStackViewRow(uid));
    });
    const activeRowUid = computed(() => report.getters.activeStackViewRow()?.uid);

    const emitActivate = () => {
      emit('activate');
    };
    const activateRow = (uid: StackViewRowUid) => {
      report.actions.activateEntity({ type: 'stack-view-row', uid });
    };

    return {
      rows,
      activeRowUid,
      emitActivate,
      activateRow
    };
  }
});
</script>

<style scoped></style>
