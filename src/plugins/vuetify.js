import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#E19D17',
        secondary: '#000000',
        accent: '#969696',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
      },
    },
  },
});
