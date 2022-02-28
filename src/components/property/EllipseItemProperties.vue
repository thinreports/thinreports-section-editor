<template>
  <div>
    <PropertyCaption caption="Ellipse" />
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
      :value="bounds.height"
      @change="updateHeight"
    />
    <WidthProperty
      :value="bounds.width"
      @change="updateWidth"
    />
    <LeftProperty
      :value="bounds.x"
      @change="updateX"
    />
    <TopProperty
      :value="bounds.y"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
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
import { BoundsTransformer } from '@/lib/bounds-transformer';
import { report } from '@/store';
import { EllipseItem, Bounds, BoundingBox } from '@/types';

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
    FillColorProperty,
    StrokeColorProperty,
    StrokeWidthProperty,
    StrokeTypeProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => EllipseItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const bounds = computed((): BoundingBox => {
      const bounds = report.getters.itemBounds(item.value.uid);
      return new BoundsTransformer(bounds).toBBox();
    });

    const updateId = (value: string) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateBounds = (bounds: Bounds) => {
      const bPoints = BoundsTransformer.fromBBox(bounds).toBPoints();
      report.actions.updateEllipseItemBounds(item.value.uid, bPoints);
    };
    const updateX = (value: string) => {
      updateBounds({ ...bounds.value, x: Number(value) });
    };
    const updateY = (value: string) => {
      updateBounds({ ...bounds.value, y: Number(value) });
    };
    const updateWidth = (value: string) => {
      updateBounds({ ...bounds.value, width: Number(value) });
    };
    const updateHeight = (value: string) => {
      updateBounds({ ...bounds.value, height: Number(value) });
    };
    const updateFollowStretch = (value: EllipseItem['followStretch']) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateFillColor = (value: string) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, fillColor: value } });
    };
    const updateBorderColor = (value: string) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderColor: value } });
    };
    const updateBorderWidth = (value: string) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderWidth: Number(value) } });
    };
    const updateBorderStyle = (value: EllipseItem['style']['borderStyle']) => {
      report.actions.updateEllipseItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderStyle: value } });
    };

    return {
      bounds,
      updateId,
      updateDescription,
      updateDisplay,
      updateX,
      updateY,
      updateWidth,
      updateHeight,
      updateFollowStretch,
      updateAffectBottomMargin,
      updateFillColor,
      updateBorderColor,
      updateBorderWidth,
      updateBorderStyle
    };
  }
});
</script>

<style scoped></style>
