import {registerPlugins} from '@/plugins';

import App from './App.vue';
import store from "./store";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {createApp} from 'vue';

const app = createApp(App);

registerPlugins(app);

app.component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .mount('#app');
