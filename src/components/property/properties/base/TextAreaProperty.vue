<template>
  <div class="uk-flex uk-flex-top th-property">
    <div class="th-label">
      {{ label }}
    </div>
    <div class="uk-flex uk-width-expand">
      <textarea
        type="text"
        class="uk-textarea"
        :value="value"
        @change="change($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const change = (value: string) => {
      emit('change', value);
    };

    return {
      change
    };
  }
});
</script>

<style scoped>
.th-property {
  padding-top: 5px;
}

.th-label {
  font-size: 0.8rem;
  width: 100px;
}

textarea {
  font-size: 0.8rem;
  resize: vertical;
}
</style>
