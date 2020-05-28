import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggued: false,
      token: '',
      email: '',
      type: 0,
    },
    isLoading: false,
    dishes: [], //Platos
    orders: [],
    discounts: [],
    stock: [],
  },
  mutations: {
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setLoginVariables(state, payload = {}) {
      payload.token
        ? (state.user.token = payload.token)
        : (state.user.token = '');
      payload.email
        ? (state.user.email = payload.email)
        : (state.user.email = '');
      payload.type ? (state.user.type = payload.type) : (state.user.type = 2);
      state.user.isLoggued = true;
    },
    Logout(state) {
      state.user.token = '';
      state.user.email = '';
      state.user.type = 0;
      state.user.isLoggued = false;
    },
  },
  actions: {},
  modules: {},
});
