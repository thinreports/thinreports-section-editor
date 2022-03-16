<template>
  <div>
    <PropertyCaption caption="ImageBlock" />
    <IdProperty
      :value="item.id"
      @change="updateId"
    />
    <DisplayProperty
      :value="item.display"
      @change="updateDisplay"
    />
    <DescriptionProperty
      :value="item.description"
      @change="updateDescription"
    />
    <HeightProperty
      :value="item.height"
      @change="updateHeight"
    />
    <WidthProperty
      :value="item.width"
      @change="updateWidth"
    />
    <LeftProperty
      :value="item.x"
      @change="updateX"
    />
    <TopProperty
      :value="item.y"
      @change="updateY"
    />
    <FollowStretchProperty
      :value="item.followStretch"
      @change="updateFollowStretch"
    />
    <AffectBottomMarginProperty
      :value="item.affectBottomMargin"
      @change="updateAffectBottomMargin"
    />
    <HorizontalAlignProperty
      :value="item.style.positionX"
      @change="updatePositionX"
    />
    <VerticalAlignProperty
      :value="item.style.positionY"
      @change="updatePositionY"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
import DescriptionProperty from './properties/DescriptionProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import FollowStretchProperty from './properties/FollowStretchProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import HorizontalAlignProperty from './properties/HorizontalAlignProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import LeftProperty from './properties/LeftProperty.vue';
import TopProperty from './properties/TopProperty.vue';
import VerticalAlignProperty from './properties/VerticalAlignProperty.vue';
import WidthProperty from './properties/WidthProperty.vue';
import { report } from '@/store';
import { ImageBlockItem } from '@/types';

export default defineComponent({
  components: {
    DisplayProperty,
    IdProperty,
    DescriptionProperty,
    FollowStretchProperty,
    HeightProperty,
    WidthProperty,
    LeftProperty,
    TopProperty,
    HorizontalAlignProperty,
    VerticalAlignProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => ImageBlockItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateHeight = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'height', value: Number(value) });
    };
    const updateWidth = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'width', value: Number(value) });
    };
    const updateX = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'x', value: Number(value) });
    };
    const updateY = (value: string) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'y', value: Number(value) });
    };
    const updateFollowStretch = (value: ImageBlockItem['followStretch']) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updatePositionX = (value: ImageBlockItem['style']['positionX']) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, positionX: value } });
    };
    const updatePositionY = (value: ImageBlockItem['style']['positionY']) => {
      report.actions.updateImageBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, positionY: value } });
    };

    return {
      updateId,
      updateDescription,
      updateDisplay,
      updateHeight,
      updateWidth,
      updateX,
      updateY,
      updateFollowStretch,
      updateAffectBottomMargin,
      updatePositionX,
      updatePositionY
    };
  }
});
</script>

<style scoped></style>
