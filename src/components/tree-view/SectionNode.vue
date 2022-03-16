<template>
  <li class="uk-parent">
    <NodeButton
      :id="sectionId"
      :name="sectionType"
      :active="active"
      @click="emitActivate"
    >
      <SectionIcon :type="sectionType" />
    </NodeButton>
    <ul
      v-if="itemUids.length"
      class="uk-nav-sub"
    >
      <template v-for="item in items">
        <StackViewItemNode
          v-if="item.type === 'stack-view'"
          :key="item.uid"
          :item-id="item.id"
          :row-uids="item.rows"
          :active="activeItemUid === item.uid"
          @activate="activateItem(item.uid)"
        />
        <GraphicItemNode
          v-else
          :key="item.uid"
          :item-id="item.id"
          :item-type="item.type"
          :active="activeItemUid === item.uid"
          @activate="activateItem(item.uid)"
        />
      </template>
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import { AnyItem, Section, ItemUid } from '../../types';
import SectionIcon from '../icons/SectionIcon.vue';
import GraphicItemNode from './GraphicItemNode.vue';
import NodeButton from './NodeButton.vue';
import StackViewItemNode from './StackViewItemNode.vue';

export default defineComponent({
  components: {
    GraphicItemNode,
    StackViewItemNode,
    NodeButton,
    SectionIcon
  },
  props: {
    itemUids: {
      type: Array as () => ItemUid[],
      required: true
    },
    sectionId: {
      type: String as () => Section['id'],
      required: true
    },
    sectionType: {
      type: String as () => Section['type'],
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

    const items = computed((): AnyItem[] => {
      return itemUids.value.map(uid => report.getters.findItem(uid));
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

<style scoped></style>
