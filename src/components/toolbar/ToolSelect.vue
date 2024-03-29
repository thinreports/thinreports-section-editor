<template>
  <div class="uk-flex">
    <MenuDropdown />

    <ToolButton
      description="Select"
      :active="isActiveTool('select')"
      @click="activateTool('select')"
    >
      <i class="mdi mdi-cursor-default" />
    </ToolButton>

    <ToolButton
      description="Rect"
      :active="isActiveTool('rect')"
      @click="activateTool('rect')"
    >
      <ItemIcon type="rect" />
    </ToolButton>

    <ToolButton
      description="Ellipse"
      :active="isActiveTool('ellipse')"
      @click="activateTool('ellipse')"
    >
      <ItemIcon type="ellipse" />
    </ToolButton>

    <ToolButton
      description="Line"
      :active="isActiveTool('line')"
      @click="activateTool('line')"
    >
      <ItemIcon type="line" />
    </ToolButton>

    <ToolButton
      description="Text"
      :active="isActiveTool('text')"
      @click="activateTool('text')"
    >
      <ItemIcon type="text" />
    </ToolButton>

    <ToolButton
      description="Text Block"
      :active="isActiveTool('text-block')"
      @click="activateTool('text-block')"
    >
      <ItemIcon type="text-block" />
    </ToolButton>

    <ToolButton
      description="Image"
      @click="openSelectImage"
    >
      <ItemIcon type="image" />
    </ToolButton>

    <ToolButton
      description="Image Block"
      :active="isActiveTool('image-block')"
      @click="activateTool('image-block')"
    >
      <ItemIcon type="image-block" />
    </ToolButton>

    <ToolButton
      description="Stack View"
      :active="isActiveTool('stack-view')"
      @click="activateTool('stack-view')"
    >
      <ItemIcon type="stack-view" />
    </ToolButton>

    <LocaleMenu />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { selectImage } from '../../lib/select-image';
import { editor, report } from '../../store';
import ItemIcon from '../icons/ItemIcon.vue';
import LocaleMenu from './LocaleMenu.vue';
import MenuDropdown from './MenuDropdown.vue';
import ToolButton from './ToolButton.vue';
import { ToolType } from '@/types';

export default defineComponent({
  components: {
    MenuDropdown,
    ToolButton,
    ItemIcon,
    LocaleMenu
  },
  setup () {
    const activeTool = computed(() => {
      return editor.state.activeTool;
    });

    const activateTool = (tool: ToolType) => {
      editor.actions.activateTool({ tool });
    };
    const isActiveTool = (tool: ToolType) => {
      return activeTool.value === tool;
    };
    const openSelectImage = async () => {
      const targetCanvas = report.getters.activeOrFirstCanvas();

      if (!targetCanvas) return;

      const imageData = await selectImage();

      report.actions.drawNewImageItem({
        targetType: targetCanvas.type,
        targetUid: targetCanvas.uid,
        bounds: {
          x1: 0,
          y1: 0,
          x2: imageData.width,
          y2: imageData.height
        },
        data: {
          mimeType: imageData.mimeType,
          base64: imageData.base64
        }
      });
    };

    return {
      activateTool,
      isActiveTool,
      openSelectImage
    };
  }
});
</script>
