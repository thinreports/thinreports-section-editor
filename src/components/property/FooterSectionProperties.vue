<template>
  <div>
    <PropertyCaption caption="Footer" />
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
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api';
import PropertyCaption from './PropertyCaption.vue';
import AutoStretchProperty from './properties/AutoStretchProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import { report } from '@/store';
import { FooterSection } from '@/types';

export default defineComponent({
  components: {
    IdProperty,
    AutoStretchProperty,
    DisplayProperty,
    HeightProperty,
    PropertyCaption
  },
  props: {
    section: {
      type: Object as () => FooterSection,
      required: true
    }
  },
  setup (props) {
    const { section } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateFooterSection({ sectionUid: section.value.uid, key: 'id', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateFooterSection({ sectionUid: section.value.uid, key: 'display', value });
    };
    const updateHeight = (value: number) => {
      report.actions.updateFooterSection({ sectionUid: section.value.uid, key: 'height', value });
    };
    const updateAutoStretch = (value: boolean) => {
      report.actions.updateFooterSection({ sectionUid: section.value.uid, key: 'autoStretch', value });
    };

    return {
      updateId,
      updateDisplay,
      updateHeight,
      updateAutoStretch
    };
  }
});
</script>

<style scoped></style>
