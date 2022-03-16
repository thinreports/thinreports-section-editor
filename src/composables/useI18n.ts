import { computed, getCurrentInstance } from '@vue/composition-api';

export const useI18n = () => {
  const instance = getCurrentInstance()?.proxy;

  if (!instance) {
    throw new Error('Cannot useI18n outside of component');
  }

  const i18n = computed(() => instance.$i18n);

  return {
    i18n
  };
};
