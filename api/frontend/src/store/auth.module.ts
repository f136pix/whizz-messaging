import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
// if user is saved in local storage, is logged in
const initialState = user
  ? {status: {loggedIn: true}, user}
  : {status: {loggedIn: false}, user: null};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({commit}, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({commit, dispatch}) {
      AuthService.logout();
      commit('logout');
      dispatch('messages/cleanUp', null, { root: true });
    },
    register({commit}, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    update({commit}) {
      return AuthService.update().then(
        (data) => {
          console.log(data);
          commit('checkSuccess', data);
          return Promise.resolve(data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    checkSuccess(state,data) {
      state.user = data.data;
      state.status.loggedIn = true;
    },
    checkFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};
