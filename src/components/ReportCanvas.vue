<template>
  <g>
    <rect
      x="0"
      y="0"
      :width="contentSize.width"
      :height="contentSize.height"
      class="th-report-canvas"
    />
    <CanvasSelector
      v-for="{ schema, top } in sectionWithPositions"
      :key="`selector-${schema.uid}`"
      :bounds="selectorBounds({ schema, top })"
      @select="activateSection(schema.uid)"
    />
    <g
      v-for="({ schema, top }, index) in sectionWithPositions"
      :key="schema.uid"
    >
      <SectionCanvas
        :section="schema"
        :top="top"
      />
      <SectionDivider
        v-if="!isLastSection(index)"
        :top="top + schema.height"
        :width="contentSize.width"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { calcPlus } from '../lib/strict-calculator';
import { report } from '../store';
import SectionCanvas from './SectionCanvas.vue';
import SectionDivider from './SectionDivider.vue';
import CanvasSelector from './base/CanvasSelector.vue';
import { Section, Size, SectionUid, BoundingBox } from '@/types';

type SectionWithPosition = {
  schema: Section;
  top: number;
};

export default defineComponent({
  components: {
    SectionCanvas,
    SectionDivider,
    CanvasSelector
  },
  setup () {
    const sectionWithPositions = computed((): SectionWithPosition[] => {
      const sections: {
        schema: Section;
        top: number;
      }[] = [];

      let top = 0;
      sections.value.forEach(section => {
        sections.push({ schema: section, top });
        top = calcPlus(top, section.height);
      });

      return sections;
    });
    const sections = computed(() => report.getters.sections());
    const contentSize = computed((): Size => report.getters.contentSize());

    const activateSection = (uid: SectionUid) => {
      report.actions.activateEntity({ uid, type: 'section' });
    };
    const selectorBounds = ({ schema, top }: SectionWithPosition): BoundingBox => {
      return {
        x: 0,
        y: top,
        width: contentSize.value.width,
        height: schema.height
      };
    };
    const isLastSection = (index: number): boolean => {
      return sections.value.length === index + 1;
    };

    return {
      sectionWithPositions,
      contentSize,
      activateSection,
      selectorBounds,
      isLastSection
    };
  }
});
</script>

<style scoped>
.th-report-canvas {
  fill: #ffffff;
  stroke: none;
}
</style>
