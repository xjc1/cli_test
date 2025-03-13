import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';
import OSpy from '@huolala-tech/page-spy-plugin-ospy';
import '@huolala-tech/page-spy-plugin-ospy/dist/index.css';
import App from './App.vue';
// 2. 引入组件样式
import 'vant/lib/index.css';

const $oSpy = new OSpy();

createApp(App).use(store).use(router).use(ElementPlus)
  .mount('#app');
