<template>
  <MenuDropdownSubTree :title="$t('toolbar.group.edit')">
    <MenuDropdownButton
      :text="$t('toolbar.edit.undo')"
      icon="mdi mdi-undo"
      :disabled="!undoable"
      @click="undo"
    />
    <MenuDropdownButton
      :text="$t('toolbar.edit.redo')"
      icon="mdi mdi-redo"
      :disabled="!redoable"
      @click="redo"
    />
    <li class="uk-nav-divider" />
    <MenuDropdownButton
      :text="$t('toolbar.edit.cut')"
      icon="mdi mdi-content-cut"
      @click="cut"
    />
    <MenuDropdownButton
      :text="$t('toolbar.edit.copy')"
      icon="mdi mdi-content-copy"
      @click="copy"
    />
    <MenuDropdownButton
      :text="$t('toolbar.edit.paste')"
      icon="mdi mdi-content-paste"
      @click="paste"
    />
    <li class="uk-nav-divider" />
    <MenuDropdownButton
      :text="$t('toolbar.edit.delete')"
      icon="mdi mdi-delete-forever"
      :disabled="!activeEntityExists"
      @click="remove"
    />
  </MenuDropdownSubTree>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { history, editor, report } from '../../store';
import { CopiedAnyItem } from '../../types';
import MenuDropdownButton from './MenuDropdownButton.vue';
import MenuDropdownSubTree from './MenuDropdownSubTree.vue';

export default defineComponent({
  components: {
    MenuDropdownSubTree,
    MenuDropdownButton
  },
  setup () {
    const undoable = computed(() => history.getters.undoable());
    const redoable = computed(() => history.getters.redoable());
    const activeEntityExists = computed(() => report.getters.activeEntityExists());

    const undo = () => history.actions.undo();
    const redo = () => history.actions.redo();
    const cut = () => {
      const item = report.getters.activeItem();
      if (!item) return;
      editor.actions.setClipboard(report.getters.copiedItem(item.uid));
      report.actions.removeActiveItem();
    };
    const copy = () => {
      const item = report.getters.activeItem();
      if (!item) return;
      editor.actions.setClipboard(report.getters.copiedItem(item.uid));
    };
    const paste = () => {
      if (!editor.state.clipboard) return;

      const targetCanvas = report.getters.activeOrFirstCanvas();

      if (!targetCanvas) return;

      report.actions.pasteItem({ targetType: targetCanvas.type, targetUid: targetCanvas.uid, item: editor.state.clipboard as CopiedAnyItem });
    };
    const remove = () => {
      report.actions.removeActiveEntity();
    };

    return {
      undoable,
      redoable,
      activeEntityExists,
      undo,
      redo,
      cut,
      copy,
      paste,
      remove
    };
  }
});
</script>
