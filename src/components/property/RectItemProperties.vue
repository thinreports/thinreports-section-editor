<template>
  <div>
    <PropertyCaption caption="Rect" />
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
    <FillColorProperty
      :value="item.style.fillColor"
      @change="updateFillColor"
    />
    <StrokeColorProperty
      :value="item.style.borderColor"
      @change="updateBorderColor"
    />
    <StrokeWidthProperty
      :value="item.style.borderWidth"
      @change="updateBorderWidth"
    />
    <StrokeTypeProperty
      :value="item.style.borderStyle"
      @change="updateBorderStyle"
    />
    <CornerRadiusProperty
      :value="item.borderRadius"
      @change="updateBorderRadius"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
import CornerRadiusProperty from './properties/CornerRadiusProperty.vue';
import DescriptionProperty from './properties/DescriptionProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import FillColorProperty from './properties/FillColorProperty.vue';
import FollowStretchProperty from './properties/FollowStretchProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import LeftProperty from './properties/LeftProperty.vue';
import StrokeColorProperty from './properties/StrokeColorProperty.vue';
import StrokeTypeProperty from './properties/StrokeTypeProperty.vue';
import StrokeWidthProperty from './properties/StrokeWidthProperty.vue';
import TopProperty from './properties/TopProperty.vue';
import WidthProperty from './properties/WidthProperty.vue';
import { report } from '@/store';
import { RectItem } from '@/types';

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
    CornerRadiusProperty,
    FillColorProperty,
    StrokeColorProperty,
    StrokeWidthProperty,
    StrokeTypeProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => RectItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const updateId = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateHeight = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'height', value: Number(value) });
    };
    const updateWidth = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'width', value: Number(value) });
    };
    const updateX = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'x', value: Number(value) });
    };
    const updateY = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'y', value: Number(value) });
    };
    const updateFollowStretch = (value: RectItem['followStretch']) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateFillColor = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, fillColor: value } });
    };
    const updateBorderColor = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderColor: value } });
    };
    const updateBorderWidth = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderWidth: Number(value) } });
    };
    const updateBorderStyle = (value: RectItem['style']['borderStyle']) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderStyle: value } });
    };
    const updateBorderRadius = (value: string) => {
      report.actions.updateRectItem({ uid: item.value.uid, key: 'borderRadius', value: Number(value) });
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
      updateFillColor,
      updateBorderColor,
      updateBorderWidth,
      updateBorderStyle,
      updateBorderRadius
    };
  }
});
</script>

<style scoped></style>
