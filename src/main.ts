import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import { Tabs, Tab } from 'vue3-tabs-component';
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from './modules/router';
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .use(createVuestic())
    .use(pinia)
    .use(router)
    .mount('#app')
