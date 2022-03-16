<template>
  <MenuDropdownSubTree :title="$t('toolbar.group.stack_view')">
    <MenuDropdownButton
      :text="$t('toolbar.stack_view.add_row')"
      :disabled="!isEditable"
      @click="addRow"
    />
    <MenuDropdownButton
      :text="$t('toolbar.stack_view.move_up')"
      :disabled="!isEditable"
      @click="moveRowUp"
    />
    <MenuDropdownButton
      :text="$t('toolbar.stack_view.move_down')"
      :disabled="!isEditable"
      @click="moveRowDown"
    />
  </MenuDropdownSubTree>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { report } from '../../store';
import MenuDropdownButton from './MenuDropdownButton.vue';
import MenuDropdownSubTree from './MenuDropdownSubTree.vue';

export default defineComponent({
  components: {
    MenuDropdownSubTree,
    MenuDropdownButton
  },
  setup () {
    const isEditable = computed((): boolean => {
      return !!report.getters.activeStackView();
    });

    const addRow = () => report.actions.addNewRowToActiveStackView();
    const moveRowUp = () => report.actions.moveUpActiveStackViewRow();
    const moveRowDown = () => report.actions.moveDownActiveStackViewRow();

    return {
      isEditable,
      addRow,
      moveRowUp,
      moveRowDown
    };
  }
});
</script>
