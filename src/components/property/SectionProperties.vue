<template>
  <div>
    <HeaderSectionProperties
      v-if="isHeaderSection"
      :section="section"
    />
    <DetailSectionProperties
      v-if="isDetailSection"
      :section="section"
    />
    <FooterSectionProperties
      v-if="isFooterSection"
      :section="section"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import DetailSectionProperties from './DetailSectionProperties.vue';
import FooterSectionProperties from './FooterSectionProperties.vue';
import HeaderSectionProperties from './HeaderSectionProperties.vue';
import { AnySection } from '@/types';

export default defineComponent({
  components: {
    HeaderSectionProperties,
    DetailSectionProperties,
    FooterSectionProperties
  },
  props: {
    section: {
      type: Object as () => AnySection,
      required: true
    }
  },
  setup (props) {
    const { section } = toRefs(props);

    const isHeaderSection = computed((): boolean => {
      return section.value.type === 'header';
    });
    const isDetailSection = computed((): boolean => {
      return section.value.type === 'detail';
    });
    const isFooterSection = computed((): boolean => {
      return section.value.type === 'footer';
    });

    return {
      isHeaderSection,
      isDetailSection,
      isFooterSection
    };
  }
});
</script>

<style scoped></style>
