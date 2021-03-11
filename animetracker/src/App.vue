<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>
        AniTracker
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        text
          v-bind="attrs"
          v-on="on"
        >
          Profile
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-switch color="accent" label="Darkmode" v-model="$vuetify.theme.dark">
          </v-switch>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
