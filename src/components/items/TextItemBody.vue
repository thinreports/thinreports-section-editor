<template>
  <g>
    <g ref="box">
      <text
        v-for="(text, index) in item.texts"
        :key="index"
        :x="calculatedX"
        :y="calculateTextLineY(index)"
        :style="textStyle"
        dominant-baseline="text-before-edge"
        class="th-text"
        v-text="text || ' '"
      />
    </g>
    <rect
      :x="item.x"
      :y="item.y"
      :width="item.width"
      :height="item.height"
      fill="#ffffff"
      fill-opacity="0"
    />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, toRefs } from '@vue/composition-api';
import { calcDiv, calcPlus, calcMul, calcMinus } from '../../lib/strict-calculator';
import { report } from '../../store';
import { TextItem } from '@/types';

type TextStyle = {
  fontSize: string;
  fontFamily: string;
  fill: string;
  fontWeight: 'bold' | 'normal';
  fontStyle: 'italic' | 'normal';
  textDecoration: 'underline' | 'line-through' | 'underline line-through' | 'none';
  letterSpacing: string;
  textAnchor: 'start' | 'middle' | 'end';
};

export default defineComponent({
  props: {
    item: {
      type: Object as () => TextItem,
      required: true
    }
  },
  watch: {
    item: {
      handler (newItem: TextItem, oldItem: TextItem) {
        if (isAdjustingBoxWidthRequired(newItem, oldItem)) {
          nextTick(() => adjustBoxWidth());
        }
      },
      deep: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const textStyle = computed((): TextStyle => {
      return {
        fontSize: `${item.value.style.fontSize}px`,
        fontFamily: item.value.style.fontFamily.join(','),
        fill: item.value.style.color,
        fontWeight: fontWeight.value,
        fontStyle: fontStyle.value,
        textDecoration: textDecoration.value,
        textAnchor: textAnchor.value,
        letterSpacing: letterSpacing.value
      };
    });
    const fontWeight = computed((): TextStyle['fontWeight'] => {
      return item.value.style.fontStyle.includes('bold') ? 'bold' : 'normal';
    });
    const fontStyle = computed((): TextStyle['fontStyle'] => {
      return item.value.style.fontStyle.includes('italic') ? 'italic' : 'normal';
    });
    const textAnchor = computed((): TextStyle['textAnchor'] => {
      switch (item.value.style.textAlign) {
        case 'left': return 'start';
        case 'center': return 'middle';
        case 'right': return 'end';
        default: throw new Error('Invalid text align value');
      }
    });
    const textDecoration = computed((): TextStyle['textDecoration'] => {
      const fontStyles = item.value.style.fontStyle;

      if (fontStyles.includes('underline') && fontStyles.includes('linethrough')) {
        return 'underline line-through';
      } else if (fontStyles.includes('underline')) {
        return 'underline';
      } else if (fontStyles.includes('linethrough')) {
        return 'line-through';
      } else {
        return 'none';
      }
    });
    const letterSpacing = computed((): TextStyle['letterSpacing'] => {
      return item.value.style.letterSpacing !== '' ? `${item.value.style.letterSpacing}px` : 'normal';
    });
    const calculatedX = computed((): number => {
      switch (textAnchor.value) {
        case 'start': return item.value.x;
        case 'middle': return calcPlus(item.value.x, calcDiv(item.value.width, 2));
        case 'end': return calcPlus(item.value.x, item.value.width);
        default: throw new Error('Invalid text align value');
      }
    });
    const calculatedY = computed((): number => {
      switch (item.value.style.verticalAlign) {
        case 'top': return item.value.y;
        case 'middle': return calcPlus(item.value.y, calcDiv(calcMinus(item.value.height, item.value.contentHeight), 2));
        case 'bottom': return calcMinus(calcPlus(item.value.y, item.value.height), item.value.contentHeight);
        default: throw new Error('Invalid vertical align value');
      }
    });

    const calculateTextLineY = (index: number) => {
      return calcPlus(calculatedY.value, calcMul(item.value.style.lineHeight, index));
    };
    const adjustBoxWidth = () => {
      const bbox = (this.$refs.box as SVGGElement).getBBox();
      report.actions.adjustTextItemWidth({ uid: item.value.uid, minWidth: bbox.width });
    };
    const isAdjustingBoxWidthRequired = (item: TextItem, prevItem: TextItem): boolean => {
      const itemStyle = item.style;
      const prevItemStyle = prevItem.style;

      return (
        item.width !== prevItem.width ||
        itemStyle.fontSize !== prevItemStyle.fontSize ||
        itemStyle.fontFamily.join() !== prevItemStyle.fontFamily.join() ||
        itemStyle.fontStyle.join() !== prevItemStyle.fontStyle.join() ||
        item.texts.join() !== prevItem.texts.join() ||
        itemStyle.letterSpacing !== prevItemStyle.letterSpacing
      );
    };

    return {
      textStyle,
      calculatedX,
      calculateTextLineY
    };
  }
});
</script>

<style scoped>
.th-text {
  text-rendering: 'geometricPrecision';
  white-space: 'pre';
}
</style>
