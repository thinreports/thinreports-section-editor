<template>
  <div>
    <PropertyCaption caption="Text" />
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
    <TextProperty
      :value="text"
      @change="updateTexts"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import PropertyCaption from './PropertyCaption.vue';
import AffectBottomMarginProperty from './properties/AffectBottomMarginProperty.vue';
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
import TextProperty from './properties/TextProperty.vue';
import TopProperty from './properties/TopProperty.vue';
import VerticalAlignProperty from './properties/VerticalAlignProperty.vue';
import WidthProperty from './properties/WidthProperty.vue';
import { report } from '@/store';
import { TextItem, BuiltinFontFamily, ItemTextStyle } from '@/types';

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
    TextProperty,
    FontColorProperty,
    FontSizeProperty,
    FontFamilyProperty,
    HorizontalAlignProperty,
    VerticalAlignProperty,
    KerningProperty,
    LineHeightRatioProperty,
    FontStyleBoldProperty,
    FontStyleItalicProperty,
    FontStyleUnderlineProperty,
    FontStyleLinethroughProperty,
    PropertyCaption,
    AffectBottomMarginProperty
  },
  props: {
    item: {
      type: Object as () => TextItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const text = computed(() => {
      return item.value.texts.join('\n');
    });
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
      report.actions.updateTextItem({ uid: item.value.uid, key: 'id', value });
    };
    const updateDescription = (value: string) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'description', value });
    };
    const updateDisplay = (value: boolean) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'display', value });
    };
    const updateHeight = (value: string) => {
      report.actions.updateTextItemWith(item.value.uid, item => {
        item.height = Number(value);
      });
    };
    const updateWidth = (value: string) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'width', value: Number(value) });
    };
    const updateX = (value: string) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'x', value: Number(value) });
    };
    const updateY = (value: string) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'y', value: Number(value) });
    };
    const updateFollowStretch = (value: TextItem['followStretch']) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'followStretch', value });
    };
    const updateAffectBottomMargin = (value: boolean) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'affectBottomMargin', value });
    };
    const updateTexts = (value: string) => {
      report.actions.updateTextItemWith(item.value.uid, item => {
        item.texts = value.split('\n');
      });
    };
    const updateColor = (value: string) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, color: value } });
    };
    const updateFontSize = (value: string) => {
      report.actions.updateTextItemWith(item.value.uid, item => {
        item.fontSize = Number(value);
      });
    };
    const updateFontFamily = (value: BuiltinFontFamily) => {
      report.actions.updateTextItemWith(item.value.uid, item => {
        item.fontFamily = value;
      });
    };
    const updateTextAlign = (value: ItemTextStyle['textAlign']) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, textAlign: value } });
    };
    const updateVerticalAlign = (value: ItemTextStyle['verticalAlign']) => {
      report.actions.updateTextItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, verticalAlign: value } });
    };
    const updateLineHeightRatio = (value: string) => {
      report.actions.updateTextItemWith(item.value.uid, item => {
        item.lineHeightRatio = value !== '' ? Number(value) : '';
      });
    };
    const updateLetterSpacing = (value: string) => {
      const letterSpacing = value !== '' ? Number(value) : '';
      report.actions.updateTextItem({ uid: item.value.uid, key: 'style', value: { ...item.value.style, letterSpacing } });
    };
    const updateBold = (value: boolean) => {
      report.actions.updateTextItemWith(item.value.uid, item => { item.bold = value; });
    };
    const updateItalic = (value: boolean) => {
      report.actions.updateTextItemWith(item.value.uid, item => { item.italic = value; });
    };
    const updateUnderline = (value: boolean) => {
      report.actions.updateTextItemWith(item.value.uid, item => { item.underline = value; });
    };
    const updateLinethrough = (value: boolean) => {
      report.actions.updateTextItemWith(item.value.uid, item => { item.linethrough = value; });
    };

    return {
      text,
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
      updateTexts,
      updateColor,
      updateFontSize,
      updateFontFamily,
      updateTextAlign,
      updateVerticalAlign,
      updateLineHeightRatio,
      updateLetterSpacing,
      updateBold,
      updateItalic,
      updateUnderline,
      updateLinethrough
    };
  }
});
</script>

<style scoped></style>
