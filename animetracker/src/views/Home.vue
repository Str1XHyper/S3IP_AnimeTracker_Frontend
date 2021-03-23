<template>
  <div class="home">
    <v-container >
      <v-row>
        <v-card
          class="mx-auto mt-3"
          max-width="350"
          min-width="350"
          outlined
          v-for="anime in animes"
          :key="anime.id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                {{ anime.JapaneseName }}
              </div>
              <v-list-item-title class="headline mb-1">
                {{ anime.Name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                anime.Description
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"
              ><v-img :src="anime.ImgSrc"></v-img
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> More info </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>



  </div>
</template>

<script>
export default {
  data: () => ({
    animes: [],
    dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'Name',
        },
        { text: 'Description', value: 'Description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        desc: 0,
      },
      defaultItem: {
        name: '',
        desc: 0,
      },
  }),
  created() {
    const config = {
      method: "get",
      url: "/Anime",
    };
    this.$axios(config)
      .then((result) => {
        this.animes = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
editItem (item) {
        this.editedIndex = this.animes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.animes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  }
};
</script>
