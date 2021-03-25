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
      <ProfileDropdown/>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import ProfileDropdown from '../src/components/ProfileDropdown'
export default {
  name: "App",

  data: () => ({
    //
  }),
  components:{
    ProfileDropdown
  }
};
</script>
