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
        <v-list-item><v-btn @click="setTab(0)" text class="px-0" id="profile-dropdown-plantowatch"><v-icon class="mr-5">mdi-format-list-bulleted</v-icon>Plan to watch</v-btn></v-list-item>
        <v-list-item><v-btn @click="setTab(1)" text class="px-0" id="profile-dropdown-watching"><v-icon class="mr-5">mdi-eye</v-icon>Watching</v-btn></v-list-item>
        <v-list-item><v-btn @click="setTab(2)" text class="px-0" id="profile-dropdown-completed"><v-icon class="mr-5">mdi-check</v-icon>Completed</v-btn></v-list-item>
      </div>
      <v-divider></v-divider>
      <div v-if="(adminAndHigher) && $store.state.loggedIn">
        <v-list-item><v-btn to="/EditAnime" text class="px-0" id="profile-dropdown-editanimes"><v-icon class="mr-5">mdi-pencil</v-icon>Edit animes</v-btn></v-list-item>
        <v-list-item><v-btn to="/EditUser" text class="px-0" id="profile-dropdown-editusers"><v-icon class="mr-5">mdi-account-cog</v-icon>Edit users</v-btn></v-list-item>
      <v-divider></v-divider>
      </div>
      <v-list-item>
        <v-switch color="accent" label="Darkmode" v-model="$vuetify.theme.dark">
        </v-switch>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import LoginForm from './LoginForm'
export default {
  components:{
    LoginForm
  },
  computed: {
    adminAndHigher() {
      return (this.$store.state.user.role == 'Owner' || this.$store.state.user.role == 'Admin');
    },
  },
  methods:{
    setTab(tab){
      this.$store.commit("setListTab", tab)
      this.$router.push('MyList')
    }
  }
};
</script>

<style>
</style>