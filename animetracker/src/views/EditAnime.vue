<template>
  <div>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <colgroup>
            <col span="1" style="width: 30%" />
            <col span="1" style="width: 45%" />
            <col span="1" style="width: 25%" />
            <col span="1" style="width: 5%" />
            <col span="1" style="width: 5%" />
          </colgroup>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th class="text-left">Image</th>
              <th class="text-left"></th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="anime in animes" :key="anime.Id">
              <td>{{ anime.Name }}</td>
              <td>{{ anime.Description }}</td>
              <td>{{ anime.ImgSrc }}</td>
              <td>
                <v-btn outlined @click="openEditDialog(anime)" tile>Edit</v-btn>
              </td>
              <td>
                <v-btn
                  tile
                  outlined
                  color="error"
                  @click="openDeleteDialog(anime)"
                  >Delete</v-btn
                >
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <v-container class="py-0"
                  ><v-btn tile color="success" outlined>Add</v-btn></v-container
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <v-row justify="center">
      <v-dialog v-model="deleteDialog" persistent max-width="600px">
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
      <v-dialog v-model="editDialog" persistent max-width="600px">
        <v-card>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-card-title>
                <span class="headline">Edit anime with ID: </span>
                <v-text-field class="ml-2" disabled :value="id"> </v-text-field>
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
    animes: [],
    deleteDialog: false,
    selected: {},
    editDialog: false,
    name: "",
    desc: "",
    img: "",
    id: "",
  }),
  created() {
    const config = {
      method: "get",
      url: "/Anime",
    };
    this.$axios(config).then((result) => {
      this.animes = result.data;
    });
  },
  methods: {
    openDeleteDialog(anime) {
      this.selected = anime;
      this.deleteDialog = true;
    },
    openEditDialog(anime) {
      this.name = anime.Name;
      this.desc = anime.Description;
      this.id = anime.id;
      this.img = anime.ImgSrc;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.name = "";
      this.desc = "";
      this.id = "";
      this.img = "";
      this.$refs.observer.reset();
      this.editDialog = false;
    },
    submit() {
      this.$refs.observer.validate().then(() => {
        this.updateAnime();
        var result = this.animes.find(({ id }) => id === this.id);
        result.Name = this.name;
        result.Description = this.desc;
        result.ImgSrc = this.img;
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
          ID: this.id,
          Name: this.name,
          Description: this.desc,
          ImgSrc: this.img,
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