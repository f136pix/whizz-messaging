import { auth } from "./auth.module";
import { messages } from "./messages.module";

import { createStore } from "vuex";

const store = createStore({
  modules: {
    auth,
    messages
  },
});

export default store;
