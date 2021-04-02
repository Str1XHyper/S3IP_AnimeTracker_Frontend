<template>
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
</template>

<script>

export default {
    data:() =>({
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
};
</script>

<style>
</style>