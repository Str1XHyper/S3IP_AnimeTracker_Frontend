<template>
  <v-app>
    <v-app-bar app color="secondary">
      <v-btn href="/" text>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          <v-toolbar-title> AniTracker </v-toolbar-title>
        </div>
      </v-btn>

      <v-spacer></v-spacer>
      <v-menu offset-y >
        <template v-slot:activator="{ on, attrs,value: opened }">
          <v-btn text v-bind="attrs" v-on="on"> Profile 
            <v-icon v-if="opened">mdi-chevron-up</v-icon>
            <v-icon v-if="!opened">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item><v-icon class="mr-1">mdi-account-plus</v-icon>Register</v-list-item>
          <v-list-item><v-icon class="mr-1">mdi-login</v-icon>Login</v-list-item>
          <v-list-item>
            <v-switch
              color="accent"
              label="Darkmode"
              v-model="$vuetify.theme.dark"
            >
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
  name: "App",

  data: () => ({
    //
  }),
};
</script>
