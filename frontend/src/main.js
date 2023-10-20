import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//import 'vue-code-highlight/themes/duotone-sea.css';
//import 'vue-code-highlight/themes/window.css';//okaidia prism

//import '@/assets/scss/global.scss';
//import '@/assets/scss/variables.scss';
//import '@/assets/scss/neumorphism.scss';

import 'vue-code-highlight/themes/prism-okaidia.css';

import 'vue-code-highlight/themes/window.css';

import VueCodeHighlight from 'vue-code-highlight';

createApp(App).use(store).use(router).use(VueCodeHighlight).mount('#app');
