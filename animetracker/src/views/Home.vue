<template>
  <div class="home">
    <h1>Test</h1>
    <v-container>
      <v-row>
        <Newest :key="rerender" />
      </v-row>
    </v-container>
    <v-container>
      <v-alert dense v-if="$store.state.apiError" type="error" color="error">
        <v-row align="center">
          <v-col class="grow">
            An error occured while requesting the animes, Notify
            tijnvanveghel@gmail.com if this problems remains
          </v-col>
          <v-col class="shrink">
            <v-btn fab text small @click="forceUpdate"
              ><v-icon>mdi-reload</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import Newest from "../components/HomePage/NewestAnimes";
export default {
  data: () => ({
    rerender: 0,
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.animes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.animes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    forceUpdate() {
      this.rerender += 1;
      this.$store.commit("clearError");
    },
  },
  components: {
    Newest,
  },
};
</script>
