<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="animes"
        :search="search"
        v-bind:loading="loading"
        loading-text="Loading animes... Please wait"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Animes</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              tile
              color="success"
              outlined
              @click="openAddDialog()"
              id="anime-add-button"
              >Add</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="accent" small class="mr-2" @click="openEditDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <v-alert v-if="error" outlined type="error" color="error">
        There was an error receiving the animes
      </v-alert>
    </v-container>

    <v-row justify="center">
      <v-dialog 
        transition="dialog-bottom-transition" v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              Are you sure you want to delete "{{ selected.Name }}"?</span
            >
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false"> Cancel </v-btn>
            <v-btn color="error" text @click="deleteAnime()"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog 
        transition="dialog-bottom-transition" v-model="editDialog" max-width="600px">
        <v-card>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-card-title v-if="isEdit">
                <span class="headline">Edit anime with ID: </span>
                <v-text-field class="ml-2" disabled :value="id"> </v-text-field>
              </v-card-title>
              <v-card-title v-if="!isEdit">
                <span class="headline">Add new anime</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required"
                      >
                        <v-text-field
                          v-model="name"
                          label="Name*"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required"
                      >
                        <v-text-field
                          label="Image source"
                          v-model="img"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="JapanesName"
                        rules="required"
                      >
                        <v-text-field
                          v-model="japname"
                          label="Japanese name*"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Description"
                        rules="required"
                      >
                        <v-textarea
                          label="Description*"
                          required
                          v-model="desc"
                          :error-messages="errors"
                        ></v-textarea>
                      </ValidationProvider> </v-col
                  ></v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" type="submit" :disabled="invalid">
                  Save
                </v-btn>
                <v-btn @click="closeEditDialog"> Cancel </v-btn>
              </v-card-actions>
            </form>
          </validation-observer>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  data: () => ({
    search: "",
    error: false,
    loading: true,
    animes: [],
    deleteDialog: false,
    selected: {},
    editDialog: false,
    isEdit: false,
    name: "",
    japname: "",
    desc: "",
    img: "",
    id: "",

    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false, align:"right" },
    ],
  }),
  created() {
    const config = {
      method: "get",
      url: "/Anime/All",
    };
    this.$axios(config)
      .then((result) => {
        console.log(result.data)
        this.animes = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
    openDeleteDialog(anime) {
      this.selected = anime;
      this.deleteDialog = true;
    },
    openEditDialog(anime) {
      this.name = anime.name;
      this.desc = anime.description;
      this.id = anime.id;
      this.img = anime.imgSrc;
      this.japname = anime.japaneseName;
      this.isEdit = true;
      this.editDialog = true;
    },
    openAddDialog() {
      this.name = "";
      this.desc = "";
      this.id = "";
      this.img = "";
      this.japname = "";
      this.isEdit = false;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.name = "";
      this.desc = "";
      this.id = "";
      this.img = "";
      this.japname = "";
      this.$refs.observer.reset();
      this.isEdit = false;
      this.editDialog = false;
    },
    submit() {
      this.$refs.observer.validate().then(() => {
        if (this.isEdit) {
          this.updateAnime();
          var result = this.animes.find(({ id }) => id === this.id);
          result.Name = this.name;
          result.Description = this.desc;
          result.ImgSrc = this.img;
          result.JapaneseName = this.japname;
        } else {
          this.addAnime();
        }
        this.closeEditDialog();
      });
    },
    updateAnime() {
      var config = {
        method: "put",
        url: "/Anime/EditAnime",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          description: this.desc,
          iD: this.id,
          imgSrc: this.img,
          japaneseName: this.japname,
          name: this.name,
        },
      };

      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addAnime() {
      var config = {
        method: "post",
        url: "/Anime/AddAnime",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          description: this.desc,
          imgSrc: this.img,
          japaneseName: this.japname,
          name: this.name,
        },
      };

      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteAnime() {
      var config = {
        method: "delete",
        url: "/Anime/RemoveAnime",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ID: this.selected.id },
      };

      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      this.deleteDialog = false;

      var index = this.animes.findIndex(({ id }) => id === this.selected.id);
      this.animes.splice(index, 1);
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style>
</style>