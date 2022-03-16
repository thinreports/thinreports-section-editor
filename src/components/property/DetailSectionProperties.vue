<template>
  <div>
    <PropertyCaption caption="Detail" />
    <IdProperty
      :value="section.id"
      @change="updateId"
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
import { defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AutoStretchProperty from './properties/AutoStretchProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import { report } from '@/store';
import { DetailSection } from '@/types';

export default defineComponent({
  components: {
    AutoStretchProperty,
    HeightProperty,
    IdProperty,
    PropertyCaption
  },
  props: {
    section: {
      type: Object as () => DetailSection,
      required: true
    }
  },
  setup (props) {
    const { section } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateDetailSection({ sectionUid: section.value.uid, key: 'id', value });
    };
    const updateHeight = (value: number) => {
      report.actions.updateDetailSection({ sectionUid: section.value.uid, key: 'height', value });
    };
    const updateAutoStretch = (value: boolean) => {
      report.actions.updateDetailSection({ sectionUid: section.value.uid, key: 'autoStretch', value });
    };

    return {
      updateId,
      updateHeight,
      updateAutoStretch
    };
  }
});
</script>

<style scoped></style>
