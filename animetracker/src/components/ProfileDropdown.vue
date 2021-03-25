<template>
  <v-menu offset-y transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs, value: opened }">
      <v-btn v-if="!$store.state.loggedIn" text v-bind="attrs" v-on="on">
        Profile
        <v-icon v-if="opened">mdi-chevron-up</v-icon>
        <v-icon v-else>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn v-else text v-bind="attrs" v-on="on">
        {{ $store.state.user.username }}
        <v-icon v-if="opened">mdi-chevron-up</v-icon>
        <v-icon v-else>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <div v-if="!$store.state.loggedIn">
        <v-list-item><LoginForm/></v-list-item>
      </div>
      <div v-else>
        <v-list-item><v-btn text class="px-0"><v-icon class="mr-5">mdi-account</v-icon>Profile</v-btn></v-list-item>
        <v-divider></v-divider>
        <v-subheader>My lists</v-subheader>
        <v-list-item><v-btn text class="px-0"><v-icon class="mr-5">mdi-eye</v-icon>Watching</v-btn></v-list-item>
        <v-list-item><v-btn text class="px-0"><v-icon class="mr-5">mdi-format-list-bulleted</v-icon>Plan to watch</v-btn></v-list-item>
        <v-list-item><v-btn text class="px-0"><v-icon class="mr-5">mdi-check</v-icon>Completed</v-btn></v-list-item>
      </div>
      <v-divider></v-divider>
      <v-list-item>
        <v-switch color="accent" label="Darkmode" v-model="$vuetify.theme.dark">
        </v-switch>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components:{
    LoginForm
  }
};
</script>

<style>
</style>