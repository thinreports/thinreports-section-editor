<template>
  <g>
    <g v-if="isActive">
      <StackViewItemModifier
        :item-bounds="bounds"
        @modifierDrag="dragStart"
        @modifierClick="activate"
      />
      <StackViewItemRows
        :rows="item.rows"
        :item-bounds="bounds"
        :section-translation="sectionTranslation"
        :stack-view-active="true"
      />
    </g>
    <g v-else>
      <ItemEntity
        :item="item"
        @itemClick="activate"
      >
        <StackViewItemRows
          :rows="item.rows"
          :item-bounds="bounds"
          :section-translation="sectionTranslation"
          :stack-view-active="false"
        />
        <StackViewItemBody :item-bounds="bounds" />
      </ItemEntity>
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { report } from '../../store';
import ItemEntity from './ItemEntity.vue';
import StackViewItemBody from './StackViewItemBody.vue';
import StackViewItemModifier from './StackViewItemModifier.vue';
import StackViewItemRows from './StackViewItemRows.vue';
import { StackViewItem, BoundingBox, Translation } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    StackViewItemBody,
    StackViewItemModifier,
    StackViewItemRows
  },
  props: {
    item: {
      type: Object as () => StackViewItem,
      required: true
    },
    sectionTranslation: {
      type: Object as () => Translation,
      required: true
    }
  },
  setup (props, { emit }) {
    const { item } = toRefs(props);

    const isActive = computed((): boolean => {
      return report.getters.isActiveStackViewTree(item.value.uid);
    });
    const bounds = computed((): BoundingBox => {
      return {
        x: item.value.x,
        y: item.value.y,
        width: item.value.width,
        height: report.getters.heightOfStackView(item.value.uid)
      };
    });

    const dragStart = () => {
      emit('itemDragStart', item.value);
    };
    const activate = () => {
      report.actions.activateEntity({ uid: item.value.uid, type: 'item' });
    };

    return {
      isActive,
      bounds,
      dragStart,
      activate
    };
  }
});
</script>
