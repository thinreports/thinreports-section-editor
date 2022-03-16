<template>
  <MenuDropdownSubTree :title="$t('toolbar.group.zoom')">
    <MenuDropdownButton
      text="100%"
      @click="setZoomRate(1.0)"
    />
    <MenuDropdownButton
      text="200%"
      @click="setZoomRate(2.0)"
    />
    <li class="uk-nav-divider" />
    <MenuDropdownButton
      :text="$t('toolbar.zoom.in')"
      icon="mdi mdi-magnify-plus-outline"
      @click="zoomIn"
    />
    <MenuDropdownButton
      :text="$t('toolbar.zoom.out')"
      icon="mdi mdi-magnify-minus-outline"
      @click="zoomOut"
    />
    <li class="uk-nav-divider" />
    <MenuDropdownButton
      :text="$t('toolbar.zoom.reset')"
      @click="resetZoom"
    />
  </MenuDropdownSubTree>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { editor } from '../../store';
import MenuDropdownButton from './MenuDropdownButton.vue';
import MenuDropdownSubTree from './MenuDropdownSubTree.vue';

export default defineComponent({
  components: {
    MenuDropdownSubTree,
    MenuDropdownButton
  },
  setup () {
    const setZoomRate = (rate: number) => editor.actions.setZoomRate(rate);
    const resetZoom = () => editor.actions.resetZoom();
    const zoomIn = () => editor.actions.zoomIn();
    const zoomOut = () => editor.actions.zoomOut();

    return {
      setZoomRate,
      resetZoom,
      zoomIn,
      zoomOut
    };
  }
});
</script>
