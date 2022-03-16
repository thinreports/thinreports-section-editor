<template>
  <div>
    <PropertyCaption caption="Line" />
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
import { computed, defineComponent, toRefs } from 'vue';
import { round } from '../../lib/round-float-values';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
import DescriptionProperty from './properties/DescriptionProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
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
import { LineItem, Bounds } from '@/types';

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
    StrokeColorProperty,
    StrokeWidthProperty,
    StrokeTypeProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => LineItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const isXDirectionPositive = computed((): boolean => {
      return item.value.x1 < item.value.x2;
    });
    const isYDirectionPositive = computed((): boolean => {
      return item.value.y1 < item.value.y2;
    });
    const bounds = computed((): Bounds => {
      return {
        x: isXDirectionPositive.value ? item.value.x1 : item.value.x2,
        y: isYDirectionPositive.value ? item.value.y1 : item.value.y2,
        width: round(Math.abs(item.value.x1 - item.value.x2)),
        height: round(Math.abs(item.value.y1 - item.value.y2))
      };
    });

    const updateId = (value: string) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateBounds = (bounds: Bounds) => {
      report.actions.updateLineItemValues({
        uid: item.value.uid,
        values: [
          { key: 'x1', value: isXDirectionPositive.value ? bounds.x : bounds.x + bounds.width },
          { key: 'x2', value: isXDirectionPositive.value ? bounds.x + bounds.width : bounds.x },
          { key: 'y1', value: isYDirectionPositive.value ? bounds.y : bounds.y + bounds.height },
          { key: 'y2', value: isYDirectionPositive.value ? bounds.y + bounds.height : bounds.y }
        ]
      });
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
    const updateFollowStretch = (value: LineItem['followStretch']) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateBorderColor = (value: string) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderColor: value } });
    };
    const updateBorderWidth = (value: string) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderWidth: Number(value) } });
    };
    const updateBorderStyle = (value: LineItem['style']['borderStyle']) => {
      report.actions.updateLineItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, borderStyle: value } });
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
      updateBorderColor,
      updateBorderWidth,
      updateBorderStyle
    };
  }
});
</script>

<style scoped></style>
