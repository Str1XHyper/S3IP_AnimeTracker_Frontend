<template>
<div>
  <v-data-table
    :headers="headers"
    :items="watching"
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
        <v-btn tile color="success" outlined @click="openAddDialog()"
          >Add</v-btn
        >
      </v-toolbar>
    </template>
    <template v-slot:item.progress="{ item }">
      {{item.progress}} / {{item.anime.episodes}}
    </template>
    <template v-slot:item.completed="{ item }">
      <v-icon color="accent" class="mr-2" @click="openMoveDialog(item)">
        mdi-eye-check
      </v-icon>
    </template>
    <template v-slot:item.remove="{ item }">
      <v-icon color="error" @click="openRemoveDialog(item)">
        mdi-eye-off
      </v-icon>
    </template>
  </v-data-table>
<v-dialog
      transition="dialog-bottom-transition"
      v-model="moveDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            Are you sure you want to move "{{ selected.anime.name }}"<br> to completed?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="moveDialog = false"> Cancel </v-btn>
          <v-btn color="accent" @click="moveToCompleted" text>
            Completed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <v-btn color="error" @click="removeFromWatching" text>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>

export default {
    data:() =>({
      selected: {
      anime: {
        name: "string",
      },
    },
      moveDialog:false,
    removeDialog: false,
      search:"",
      loading: true,
      watching: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "anime.name",
        },
        { text: "Description", value: "anime.description" },
        { text: "Progress", value: "progress" },
        { text: "Complete", value: "completed", sortable: false, align: "right", width: 50, filterable: false },
        { text: "Remove", value: "remove", sortable: false, align: "right", width: 50, filterable: false },
      ],
    }),
    
  created() {
    const config = {
      method: "get",
      url: "/List/Watching/Get/" + this.$store.state.user.iD,
    };
    this.$axios(config)
      .then((result) => {
        this.watching = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
      });
  },
  methods:{
    openMoveDialog(progress){
      this.selected = progress;
      this.moveDialog = true;
    },
    openRemoveDialog(progress) {
      this.selected = progress;
      this.removeDialog = true;
    },
    removeFromWatching() {
      const config = {
        method: "delete",
        url: "/List/Watching/Remove/",
        data: {
          animeID: this.selected.anime.id,
          userID: this.$store.state.user.iD,
        },
      };
      this.$axios(config)
        .then((result) => {
          this.removeDialog = false;
          var index = this.watching.findIndex(
            ({ id }) => id === this.selected.anime.id
          );
          this.watching.splice(index, 1);
        })
        .catch((error) => {
          this.error = true;
        });
    },
    moveToCompleted(){
      const config = {
        method: "post",
        url: "/List/Completed/Add/",
        data: {
          animeID: this.selected.anime.id,
          userID: this.$store.state.user.iD,
        },
      };
      this.$axios(config)
        .then((result) => {
          this.moveDialog = false;
          var index = this.watching.findIndex(
            ({ id }) => id === this.selected.anime.id
          );
          this.watching.splice(index, 1);
        })
        .catch((error) => {
          this.error = true;
        });
    },
  },
};
</script>

<style>
</style>