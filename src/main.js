import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import OSpy from '@huolala-tech/page-spy-plugin-ospy';
import router from './router';
import store from './store';
import '@huolala-tech/page-spy-plugin-ospy/dist/index.css';
import App from './App.vue';

// const $oSpy = new OSpy();

createApp(App).use(store).use(router).use(ElementPlus)
  .mount('#app');
