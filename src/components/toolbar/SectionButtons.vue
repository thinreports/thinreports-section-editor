<template>
  <MenuDropdownSubTree :title="$t('toolbar.group.section')">
    <MenuDropdownButton
      :text="$t('toolbar.section.new_header')"
      @click="addNewHeader"
    />
    <MenuDropdownButton
      :text="$t('toolbar.section.new_detail')"
      @click="addNewDetail"
    />
    <MenuDropdownButton
      :text="$t('toolbar.section.new_footer')"
      @click="addNewFooter"
    />
    <li class="uk-nav-divider" />
    <MenuDropdownButton
      :text="$t('toolbar.section.move_up')"
      :disabled="!activeSectionExists"
      @click="moveUp"
    />
    <MenuDropdownButton
      :text="$t('toolbar.section.move_down')"
      :disabled="!activeSectionExists"
      @click="moveDown"
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
    const activeSectionExists = computed(() => {
      if (!report.state.activeEntity || report.state.activeEntity.type !== 'section') return false;

      const uid = report.state.activeEntity.uid;

      return report.state.sections.headers.includes(uid) ||
        report.state.sections.details.includes(uid) ||
        report.state.sections.footers.includes(uid);
    });

    const addNewHeader = () => report.actions.addNewHeader();
    const addNewDetail = () => report.actions.addNewDetail();
    const addNewFooter = () => report.actions.addNewFooter();
    const moveUp = () => report.actions.moveUpActiveSection();
    const moveDown = () => report.actions.moveDownActiveSection();

    return {
      activeSectionExists,
      addNewHeader,
      addNewDetail,
      addNewFooter,
      moveUp,
      moveDown
    };
  }
});
</script>

<style scoped>
.buttons {
  display: inline-block;
}
</style>
