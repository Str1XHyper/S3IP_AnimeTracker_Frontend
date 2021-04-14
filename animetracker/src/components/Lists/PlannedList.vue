<template>
  <v-data-table
    :headers="plannedHeaders"
    :items="planned"
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
    <template v-slot:item.watching="{ item }">
      <v-icon color="accent" class="mr-2" @click="openMoveDialog(item)">
        mdi-eye
      </v-icon>
    </template>
    <template v-slot:item.remove="{ item }">
      <v-icon color="error" large @click="openRemoveDialog(item)">
        mdi-playlist-remove
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    selected: {
      anime: {
        name: "string",
      },
    },
    search: "",
    loading: true,
    planned: [],
    plannedHeaders: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Description", value: "description" },
      {
        text: "Watching",
        value: "watching",
        sortable: false,
        align: "right",
        width: 50,
        filterable: false,
      },
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
      url: "/List/Planned/Get/" + this.$store.state.user.iD,
    };
    this.$axios(config)
      .then((result) => {
        this.planned = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
      });
  },
  methods: {
  },
};
</script>

<style>
</style>