<template>
  <div>
    <PropertyCaption caption="Header" />
    <IdProperty
      :value="section.id"
      @change="updateId"
    />
    <DisplayProperty
      :value="section.display"
      @change="updateDisplay"
    />
    <HeightProperty
      :value="section.height"
      @change="updateHeight"
    />
    <AutoStretchProperty
      :value="section.autoStretch"
      @change="updateAutoStretch"
    />
    <EveryPageProperty
      :value="section.everyPage"
      @change="updateEveryPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AutoStretchProperty from './properties/AutoStretchProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import EveryPageProperty from './properties/EveryPageProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import { report } from '@/store';
import { HeaderSection } from '@/types';

export default defineComponent({
  components: {
    AutoStretchProperty,
    DisplayProperty,
    EveryPageProperty,
    HeightProperty,
    IdProperty,
    PropertyCaption
  },
  props: {
    section: {
      type: Object as () => HeaderSection,
      required: true
    }
  },
  setup (props) {
    const { section } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateHeaderSection({ sectionUid: section.value.uid, key: 'id', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateHeaderSection({ sectionUid: section.value.uid, key: 'display', value });
    };
    const updateHeight = (value: number) => {
      report.actions.updateHeaderSection({ sectionUid: section.value.uid, key: 'height', value });
    };
    const updateAutoStretch = (value: boolean) => {
      report.actions.updateHeaderSection({ sectionUid: section.value.uid, key: 'autoStretch', value });
    };
    const updateEveryPage = (value: boolean) => {
      report.actions.updateHeaderSection({ sectionUid: section.value.uid, key: 'everyPage', value });
    };

    return {
      updateId,
      updateDisplay,
      updateHeight,
      updateAutoStretch,
      updateEveryPage
    };
  }
});
</script>

<style scoped></style>
