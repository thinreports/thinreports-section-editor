<template>
  <g>
    <CanvasSelector
      v-for="{ row, bounds } in rowWithBounds"
      :key="`selector-${row.uid}`"
      :bounds="bounds"
      @select="activateRow(row.uid)"
    />
    <g
      v-for="({ row, bounds }, index) in rowWithBounds"
      :key="row.uid"
    >
      <StackViewItemRow
        :row="row"
        :bounds="bounds"
        :section-translation="sectionTranslation"
      />
      <StackViewItemRowDivider
        v-if="stackViewActive && !isLastRow(index)"
        :top="bounds.y + bounds.height"
        :left="bounds.x"
        :width="bounds.width"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { DeepReadonly } from 'utility-types';
import { report } from '../../store';
import CanvasSelector from '../base/CanvasSelector.vue';
import StackViewItemRow from './StackViewItemRow.vue';
import StackViewItemRowDivider from './StackViewItemRowDivider.vue';
import { StackViewRow, Translation, BoundingBox, StackViewItem, StackViewRowUid } from '@/types';

type RowWithBounds = {
  row: DeepReadonly<StackViewRow>;
  bounds: BoundingBox;
};

export default defineComponent({
  components: {
    StackViewItemRow,
    CanvasSelector,
    StackViewItemRowDivider
  },
  props: {
    rows: {
      type: Array as () => StackViewItem['rows'],
      required: true
    },
    itemBounds: {
      type: Object as () => BoundingBox,
      required: true
    },
    sectionTranslation: {
      type: Object as () => Translation,
      required: true
    },
    stackViewActive: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const { rows, itemBounds } = toRefs(props);

    const rowWithBounds = computed((): RowWithBounds[] => {
      const rowsWithBounds: RowWithBounds[] = [];
      let top: number = itemBounds.value.y;

      rows.value.forEach(rowUid => {
        const row = report.getters.findStackViewRow(rowUid);
        const bounds = {
          x: itemBounds.value.x,
          y: top,
          width: itemBounds.value.width,
          height: row.height
        };
        rowsWithBounds.push({ row, bounds });
        top += row.height;
      });

      return rowsWithBounds;
    });

    const activateRow = (uid: StackViewRowUid) => {
      report.actions.activateEntity({ uid, type: 'stack-view-row' });
    };
    const isLastRow = (index: number): boolean => {
      return rows.value.length === index + 1;
    };

    return {
      rowWithBounds,
      activateRow,
      isLastRow
    };
  }
});
</script>

<style scoped>
.th-stack-view-row-divider {
  stroke: #aaaaaa;
  pointer-events: none;
}
</style>
