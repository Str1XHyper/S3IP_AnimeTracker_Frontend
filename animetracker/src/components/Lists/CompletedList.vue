<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="completed"
      :search="search"
      v-bind:loading="loading"
      loading-text="Loading animes... Please wait"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn tile color="success" outlined @click="forceUpdate()"
            >Add</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:item.progress="{ item }">
        {{ item.anime.episodes }} / {{ item.anime.episodes }}
      </template>
      <template v-slot:item.remove="{ item }">
        <v-icon color="error" @click="openRemoveDialog(item)">
          mdi-eye-off
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="removeDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            Are you sure you want to delete "{{ selected.anime.name }}"?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="removeDialog = false"> Cancel </v-btn>
          <v-btn color="error" @click="removeFromCompleted" text>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    removeDialog: false,
    search: "",
    loading: true,
    selected: {
      anime: {
        name: "string",
      },
    },
    completed: [],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "anime.name",
      },
      { text: "Description", value: "anime.description" },
      { text: "Progress", value: "progress" },
      {
        text: "Remove",
        value: "remove",
        sortable: false,
        align: "right",
        width: 50,
        filterable: false,
      },
    ],
  }),

  created() {
    const config = {
      method: "get",
      url: "/List/Completed/Get/" + this.$store.state.user.iD,
    };
    this.$axios(config)
      .then((result) => {
        this.completed = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
      });
  },
  methods: {
    openRemoveDialog(progress) {
      this.selected = progress;
      this.removeDialog = true;
    },
    removeFromCompleted() {
      const config = {
        method: "delete",
        url: "/List/Completed/Remove/",
        data: {
          animeID: this.selected.anime.id,
          userID: this.$store.state.user.iD,
        },
      };
      this.$axios(config)
        .then((result) => {
          this.removeDialog = false;
          var index = this.completed.findIndex(
            ({ id }) => id === this.selected.anime.id
          );
          this.completed.splice(index, 1);
        })
        .catch((error) => {
          this.error = true;
        });
    },
  }
};
</script>

<style>
</style>