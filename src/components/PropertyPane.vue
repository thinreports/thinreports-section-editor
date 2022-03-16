<template>
  <div
    class="th-pane"
    :style="{ width }"
  >
    <div class="th-pane-body">
      <ItemProperties
        v-if="activeItem"
        :item="activeItem"
      />
      <StackViewRowProperties
        v-if="activeStackViewRow"
        :row="activeStackViewRow"
      />
      <SectionProperties
        v-if="activeSection"
        :section="activeSection"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { report } from '../store';
import ItemProperties from './property/ItemProperties.vue';
import SectionProperties from './property/SectionProperties.vue';
import StackViewRowProperties from './property/StackViewRowProperties.vue';

export default defineComponent({
  components: {
    ItemProperties,
    SectionProperties,
    StackViewRowProperties
  },
  props: {
    width: {
      type: String,
      required: true
    }
  },
  setup () {
    const activeItem = computed(() => report.getters.activeItem());
    const activeStackViewRow = computed(() => report.getters.activeStackViewRow());
    const activeSection = computed(() => report.getters.activeSection());

    return {
      activeItem,
      activeStackViewRow,
      activeSection
    };
  }
});
</script>

<style scoped>
.th-pane {
  background-color: #ffffff;
  box-sizing: border-box;
  overflow-y: auto;
}

.th-pane-body {
  padding: 16px;
  box-sizing: border-box;
}
</style>
