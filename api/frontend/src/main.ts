//@ts-ignore
import {registerPlugins} from '@/plugins';

import store from "./store/index";
import App from './App.vue';

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {createApp} from 'vue';

const app = createApp(App);

registerPlugins(app);

app.component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .mount('#app');
