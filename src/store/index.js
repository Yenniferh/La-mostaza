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
    dishes: [],
    orders: [],
    discounts: [],
    products: [],
  },
  mutations: {
    restartLoading(state) {
      state.isLoading = false;
    },

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

    setDishes(state, payload = {}) {
      payload.dishes && (state.dishes = payload.dishes);
    },

    setProducts(state, payload = {}) {
      payload.products && (state.products = payload.products);
    },

    setOrders(state, payload = {}) {
      payload.orders && (state.orders = payload.orders);
    },

    setDiscounts(state, payload = {}) {
      payload.discounts && (state.discounts = payload.discounts);
    },
  },
  actions: {},
  modules: {},
});
