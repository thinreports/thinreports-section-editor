import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import { root } from './store';
import '@mdi/font/css/materialdesignicons.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';

const app = createApp(App);

app.use(i18n);
app.mount('#app');

// Watch store for development
if (process.env.NODE_ENV !== 'production') {
  const dummyElement = document.createElement('div');
  dummyElement.id = '_storeDummyEntry';
  document.body.appendChild(dummyElement);

  createApp({
    name: 'StoreDummyComponent',
    computed: {
      state: () => root.state
    },
    // To suppress the "Component is missing template or render function." warning
    render () {
      return undefined;
    }
  }).mount('#_storeDummyEntry');
}
