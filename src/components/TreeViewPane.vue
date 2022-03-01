<template>
  <div class="th-pane">
    <ul
      class="th-pane-body uk-nav uk-nav-default"
      :style="{ width }"
    >
      <SectionNode
        v-for="section in sections"
        :key="section.uid"
        :section-id="section.id"
        :section-type="section.type"
        :item-uids="section.items"
        :active="activeSectionUid === section.uid"
        @activate="activateSection(section.uid)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { report } from '../store';
import { SectionUid } from '../types';
import SectionNode from './tree-view/SectionNode.vue';

export default defineComponent({
  components: {
    SectionNode
  },
  props: {
    width: {
      type: String,
      required: true
    }
  },
  setup () {
    const sections = computed(() => report.getters.sections());
    const activeSectionUid = computed(() => report.getters.activeSection()?.uid);

    const activateSection = (uid: SectionUid) => {
      report.actions.activateEntity({ type: 'section', uid });
    };

    return {
      sections,
      activeSectionUid,
      activateSection
    };
  }
});
</script>

<style scoped>
.th-pane {
  background-color: #ffffff;
  overflow: auto;
  box-sizing: border-box;
}

.th-pane-body {
  padding: 16px;
  box-sizing: border-box;
}
</style>
