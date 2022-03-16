<template>
  <div>
    <PropertyCaption caption="TextBlock" />
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
    <MultipleLineProperty
      :value="item.multipleLine"
      @change="updateMultipleLine"
    />
    <FontColorProperty
      :value="item.style.color"
      @change="updateColor"
    />
    <FontSizeProperty
      :value="item.style.fontSize"
      @change="updateFontSize"
    />
    <FontFamilyProperty
      :value="item.style.fontFamily[0]"
      @change="updateFontFamily"
    />
    <FontStyleBoldProperty
      :value="isBold"
      @change="updateBold"
    />
    <FontStyleItalicProperty
      :value="isItalic"
      @change="updateItalic"
    />
    <FontStyleUnderlineProperty
      :value="isUnderline"
      @change="updateUnderline"
    />
    <FontStyleLinethroughProperty
      :value="isLinethrough"
      @change="updateLinethrough"
    />
    <HorizontalAlignProperty
      :value="item.style.textAlign"
      @change="updateTextAlign"
    />
    <VerticalAlignProperty
      :value="item.style.verticalAlign"
      @change="updateVerticalAlign"
    />
    <LineHeightRatioProperty
      :value="item.style.lineHeightRatio"
      @change="updateLineHeightRatio"
    />
    <KerningProperty
      :value="item.style.letterSpacing"
      @change="updateLetterSpacing"
    />
    <BasicFormatProperty
      :value="item.format.base"
      @change="updateBasicFormat"
    />
    <DefaultTextProperty
      :value="item.value"
      @change="updateDefaultValue"
    />
    <OverflowProperty
      :value="item.style.overflow"
      @change="updateOverflow"
    />
    <WordWrapProperty
      :value="item.style.wordWrap"
      @change="updateWordWrap"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
import BasicFormatProperty from './properties/BasicFormatProperty.vue';
import DefaultTextProperty from './properties/DefaultTextProperty.vue';
import DescriptionProperty from './properties/DescriptionProperty.vue';
import DisplayProperty from './properties/DisplayProperty.vue';
import FollowStretchProperty from './properties/FollowStretchProperty.vue';
import FontColorProperty from './properties/FontColorProperty.vue';
import FontFamilyProperty from './properties/FontFamilyProperty.vue';
import FontSizeProperty from './properties/FontSizeProperty.vue';
import FontStyleBoldProperty from './properties/FontStyleBoldProperty.vue';
import FontStyleItalicProperty from './properties/FontStyleItalicProperty.vue';
import FontStyleLinethroughProperty from './properties/FontStyleLinethroughProperty.vue';
import FontStyleUnderlineProperty from './properties/FontStyleUnderlineProperty.vue';
import HeightProperty from './properties/HeightProperty.vue';
import HorizontalAlignProperty from './properties/HorizontalAlignProperty.vue';
import IdProperty from './properties/IdProperty.vue';
import KerningProperty from './properties/KerningProperty.vue';
import LeftProperty from './properties/LeftProperty.vue';
import LineHeightRatioProperty from './properties/LineHeightRatioProperty.vue';
import MultipleLineProperty from './properties/MultipleLineProperty.vue';
import OverflowProperty from './properties/OverflowProperty.vue';
import TopProperty from './properties/TopProperty.vue';
import VerticalAlignProperty from './properties/VerticalAlignProperty.vue';
import WidthProperty from './properties/WidthProperty.vue';
import WordWrapProperty from './properties/WordWrapProperty.vue';
import { report } from '@/store';
import { TextBlockItem, BuiltinFontFamily, ItemTextStyle, TextOverflowStyle, TextWordWrapStyle } from '@/types';

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
    FontColorProperty,
    FontSizeProperty,
    FontFamilyProperty,
    HorizontalAlignProperty,
    VerticalAlignProperty,
    KerningProperty,
    LineHeightRatioProperty,
    BasicFormatProperty,
    DefaultTextProperty,
    OverflowProperty,
    WordWrapProperty,
    MultipleLineProperty,
    FontStyleBoldProperty,
    FontStyleItalicProperty,
    FontStyleUnderlineProperty,
    FontStyleLinethroughProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => TextBlockItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const isBold = computed(() => {
      return item.value.style.fontStyle.includes('bold');
    });
    const isItalic = computed(() => {
      return item.value.style.fontStyle.includes('italic');
    });
    const isUnderline = computed(() => {
      return item.value.style.fontStyle.includes('underline');
    });
    const isLinethrough = computed(() => {
      return item.value.style.fontStyle.includes('linethrough');
    });

    const updateId = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateHeight = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'height', value: Number(value) });
    };
    const updateWidth = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'width', value: Number(value) });
    };
    const updateX = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'x', value: Number(value) });
    };
    const updateY = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'y', value: Number(value) });
    };
    const updateFollowStretch = (value: TextBlockItem['followStretch']) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateColor = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, color: value } });
    };
    const updateFontSize = (value: string) => {
      report.actions.updateTextFontAndLineSize({ uid: item.value.uid, fontSize: Number(value), lineHeightRatio: item.value.style.lineHeightRatio });
    };
    const updateFontFamily = (value: BuiltinFontFamily) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, fontFamily: [value] } });
    };
    const updateTextAlign = (value: ItemTextStyle['textAlign']) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, textAlign: value } });
    };
    const updateVerticalAlign = (value: ItemTextStyle['verticalAlign']) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, verticalAlign: value } });
    };
    const updateLineHeightRatio = (value: string) => {
      const lineHeightRatio = value !== '' ? Number(value) : '';
      report.actions.updateTextFontAndLineSize({ uid: item.value.uid, fontSize: item.value.style.fontSize, lineHeightRatio });
    };
    const updateLetterSpacing = (value: string) => {
      const letterSpacing = value !== '' ? Number(value) : '';
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, letterSpacing } });
    };
    const updateBasicFormat = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'format', value: { ...item.value.format, base: value } });
    };
    const updateDefaultValue = (value: string) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'value', value });
    };
    const updateOverflow = (value: TextOverflowStyle) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, overflow: value } });
    };
    const updateWordWrap = (value: TextWordWrapStyle) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, wordWrap: value } });
    };
    const updateMultipleLine = (value: boolean) => {
      report.actions.updateTextBlockItem({ uid: item.value.uid, key: 'multipleLine', value });
    };
    const updateBold = (value: boolean) => {
      report.actions.updateTextBlockItemWith(item.value.uid, item => { item.bold = value; });
    };
    const updateItalic = (value: boolean) => {
      report.actions.updateTextBlockItemWith(item.value.uid, item => { item.italic = value; });
    };
    const updateUnderline = (value: boolean) => {
      report.actions.updateTextBlockItemWith(item.value.uid, item => { item.underline = value; });
    };
    const updateLinethrough = (value: boolean) => {
      report.actions.updateTextBlockItemWith(item.value.uid, item => { item.linethrough = value; });
    };

    return {
      isBold,
      isItalic,
      isUnderline,
      isLinethrough,
      updateId,
      updateDescription,
      updateDisplay,
      updateHeight,
      updateWidth,
      updateX,
      updateY,
      updateFollowStretch,
      updateAffectBottomMargin,
      updateColor,
      updateFontSize,
      updateFontFamily,
      updateTextAlign,
      updateVerticalAlign,
      updateLineHeightRatio,
      updateLetterSpacing,
      updateBasicFormat,
      updateDefaultValue,
      updateOverflow,
      updateWordWrap,
      updateMultipleLine,
      updateBold,
      updateItalic,
      updateUnderline,
      updateLinethrough
    };
  }
});
</script>

<style scoped></style>
