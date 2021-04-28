<template>
  <v-container>
    <v-row>
      <h1 class="font-weight-bold">Newest</h1>
    </v-row>
    <v-row>
      <v-progress-circular
        :size="70"
        :width="7"
        color="accent"
        indeterminate
        v-if="loading"
      ></v-progress-circular>
      <v-card
        class="mx-auto mt-3"
        max-width="350"
        min-width="350"
        outlined
        v-for="anime in animes"
        :key="anime.id"
        v-else
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              {{ anime.japaneseName }}
            </div>
            <v-list-item-title class="headline mb-1">
              {{ anime.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ anime.description }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"
            ><v-img :src="anime.imgSrc"></v-img
          ></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text> More info </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    animes: [],
    loading: true,
  }),
  created() {
    const config = {
      method: "get",
      url: "/Anime/Newest",
    };
    this.$axios(config)
      .then((result) => {
        this.animes = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.$store.commit("setError");
        this.error = true;
        this.loading = false;
        console.log(error);
      });
  },
};
</script>

<style>
</style>