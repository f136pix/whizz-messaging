/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router';

import vuetify from './vuetify';

// Types
import type {App} from 'vue';

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(MessageCheckPlugin)
    .use(MessageOpenPlugin);
}

import MessageCheckPlugin from "./messages/MessageCheckPlugin";

import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import MessageOpenPlugin from "./messages/MessageOpenPlugin";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

export {FontAwesomeIcon};
