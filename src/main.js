import { createApp } from 'vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { vuefire } from 'vuefire';
import App from './App.vue';
import router from './router';

const vueApp = createApp(App);
vueApp.use(router);
vueApp.use(vuefire);
vueApp.mount('#app');
