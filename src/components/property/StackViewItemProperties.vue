<template>
  <div>
    <PropertyCaption caption="StackView" />
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
      ignore-height
      @change="updateFollowStretch"
    />
    <AffectBottomMarginProperty
      :value="item.affectBottomMargin"
      @change="updateAffectBottomMargin"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
import DescriptionProperty from './properties/DescriptionProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import FollowStretchProperty from './properties/FollowStretchProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import LeftProperty from './properties/LeftProperty.vue';
import TopProperty from './properties/TopProperty.vue';
import WidthProperty from './properties/WidthProperty.vue';
import { report } from '@/store';
import { StackViewItem, Item } from '@/types';

export default defineComponent({
  components: {
    DisplayProperty,
    IdProperty,
    DescriptionProperty,
    FollowStretchProperty,
    WidthProperty,
    LeftProperty,
    TopProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => StackViewItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const updateWidth = (value: boolean) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'width', value: Number(value) });
    };
    const updateX = (value: boolean) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'x', value: Number(value) });
    };
    const updateY = (value: boolean) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'y', value: Number(value) });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateFollowStretch = (value: Item['followStretch']) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateId = (value: string) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateStackViewItem({ uid: item.value.uid, key: 'description', value });
    };

    return {
      updateWidth,
      updateX,
      updateY,
      updateDisplay,
      updateFollowStretch,
      updateAffectBottomMargin,
      updateId,
      updateDescription
    };
  }
});
</script>

<style scoped></style>
