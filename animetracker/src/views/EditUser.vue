<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        v-bind:loading="loading"
        loading-text="Loading users... Please wait"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
              color="accent"
              small
              class="mr-2"
              @click="openEditDialog(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon color="error" small @click="openDeleteDialog(item)" v-if="item.iD != $store.state.user.iD">
              mdi-delete
            </v-icon>
            <v-icon color="secondary" small v-else>
              mdi-delete
            </v-icon>
        </template>
      </v-data-table>
      <v-alert v-if="error" outlined type="error" color="error">
        An unknown error occured! Please contact tijnvanveghel@gmail.com
      </v-alert>
    </v-container>

    <v-row justify="center">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="deleteDialog"
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">
              Are you sure you want to delete "{{ selected.username }}"?</span
            >
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false"> Cancel </v-btn>
            <v-btn color="error" text @click="deleteUser()"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="editDialog"
        max-width="600px"
      >
        <v-card>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-card-title>
                <span class="headline">Edit user with ID: </span>
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
                          @click="warn"
                          v-model="username"
                          label="Username*"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Email"
                        rules="required"
                      >
                        <v-text-field
                          @click="warn"
                          label="Email*"
                          v-model="email"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox outlined solo v-model="role" :items="roles">
                      </v-combobox>
                    </v-col>
                  </v-row>
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
        <v-alert class="mb-0" v-model="EditWarning" color="error" dismissible>
          Changing this could cause trouble with logging in!
        </v-alert>
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
    users: [],
    deleteDialog: false,
    selected: {},
    editDialog: false,
    username: "",
    email: "",
    role: "",
    id: "",
    EditWarning: false,
    roles: ["User", "Admin", "Owner"],
    headers: [
      {
        text: "Username",
        align: "start",
        value: "username",
      },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false, align: "right" },
    ],
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    warn() {
      this.EditWarning = true;
    },
    openEditDialog(user) {
      this.username = user.username;
      this.email = user.email;
      this.id = user.iD;
      this.role = user.role;
      this.editDialog = true;
    },
    openDeleteDialog(user) {
      this.selected = user;
      this.deleteDialog = true;
    },
    closeEditDialog() {
      this.username = "";
      this.email = "";
      this.id = "";
      this.role = "";
      this.$refs.observer.reset();
      this.editDialog = false;
    },
    submit() {
      this.$refs.observer.validate().then(() => {
        this.editUser();
        var result = this.users.find(({ iD }) => iD === this.id);
        result.username = this.username;
        result.email = this.email;
        result.role = this.role;
        this.closeEditDialog();
      });
    },
    editUser() {
      const config = {
        method: "put",
        url: "/User/Edit",
        data: {
          email: this.email,
          id: this.id,
          role: this.role,
          username: this.username,
        },
      };
      this.$axios(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
    deleteUser() {
      const config = {
        method: "delete",
        url: "/User/Delete",
        data: {
          id: this.selected.iD,
        },
      };
      this.$axios(config)
        .then((response) => {
          this.deleteDialog = false;

          var index = this.users.findIndex(({ iD }) => iD === this.selected.iD);
          this.users.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
  },
  created() {
    const config = {
      method: "get",
      url: "/User",
    };
    this.$axios(config)
      .then((result) => {
        this.users = result.data;
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