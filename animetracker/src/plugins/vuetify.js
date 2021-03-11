import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
        themes: {
          light: {
            primary: '#fff',
            secondary: '#F0EDEE',
            dark1: "#403d39",
            dark2: "#252422",
            accent: '#F15025',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          },
          dark: {
            primary: "#181A1B",
            secondary: "#333138",
            dark1: "#403d39",
            dark2: "#252422",
            accent: '#F15025',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        },
        dark: true,
      },
});
