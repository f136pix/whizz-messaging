/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
// @ts-ignore

// Composables


import store from "../store";

import {createRouter, createWebHistory} from 'vue-router/auto';

function requireAuth(to, from, next) {
  if (to.path === '/auth/login') {
    next();
    return;
  }



  const isLoggedIn = store.state.auth.status.loggedIn;
  if (!isLoggedIn) {
    next({
      path: '/auth/login?redirect=true',
    });
  }
  // nao verifica action para /home
  if (to.path !== '/home') {
    store.dispatch("auth/update");
  }
  store.dispatch("messages/retrieve"); // atualiza mensagens no store
  next();

}

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach(requireAuth);

export default router;

