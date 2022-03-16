<template>
  <div>
    <PropertyCaption caption="StackViewRow" />
    <IdProperty
      :value="row.id"
      @change="updateId"
    />
    <DisplayProperty
      :value="row.display"
      @change="updateDisplay"
    />
    <HeightProperty
      :value="row.height"
      @change="updateHeight"
    />
    <AutoStretchProperty
      :value="row.autoStretch"
      @change="updateAutoStretch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AutoStretchProperty from './properties//AutoStretchProperty.vue';
import HeightProperty from './properties//HeightProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import { report } from '@/store';
import { StackViewRow } from '@/types';

export default defineComponent({
  components: {
    DisplayProperty,
    IdProperty,
    HeightProperty,
    AutoStretchProperty,
    PropertyCaption
  },
  props: {
    row: {
      type: Object as () => StackViewRow,
      required: true
    }
  },
  setup (props) {
    const { row } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateStackViewRow({ uid: row.value.uid, key: 'id', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateStackViewRow({ uid: row.value.uid, key: 'display', value });
    };
    const updateHeight = (value: string) => {
      report.actions.updateStackViewRow({ uid: row.value.uid, key: 'height', value: Number(value) });
    };
    const updateAutoStretch = (value: boolean) => {
      report.actions.updateStackViewRow({ uid: row.value.uid, key: 'autoStretch', value });
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
