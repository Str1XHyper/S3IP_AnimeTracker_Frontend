<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="px-0" v-bind="attrs" v-on="on"
          ><v-icon class="mr-5">mdi-login</v-icon>Login</v-btn
        >
      </template>
      <v-tabs fixed-tabs color="accent">
        <v-tab> Login </v-tab>
        <v-tab> Register </v-tab>
        <v-tab-item>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form>
              <v-container>
                <v-row>
                  <v-col>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Username"
                      rules="required"
                    >
                      <v-text-field
                        v-model="username"
                        label="Username*"
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
                      name="Password"
                      rules="required"
                    >
                      <v-text-field
                        label="Password*"
                        v-model="password"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row class="mb-auto mx-auto">
                  <small>*indicates required field</small>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" @click="login" :disabled="invalid">
                    Login
                  </v-btn>
                </v-row>
              </v-container>
            </form>
          </validation-observer>
        </v-tab-item>
        <v-tab-item>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form>
              <v-container>
                <v-row>
                  <v-col>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Username"
                      rules="required"
                    >
                      <v-text-field
                        v-model="username"
                        label="Username*"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required"
                    >
                      <v-text-field
                        v-model="email"
                        label="Email*"
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
                      name="Password"
                      rules="required"
                    >
                      <v-text-field
                        label="Password*"
                        v-model="password"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row class="mb-auto mx-auto">
                  <small>*indicates required field</small>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" @click="register" :disabled="invalid">
                    Register
                  </v-btn>
                </v-row>
              </v-container>
            </form>
          </validation-observer></v-tab-item
        >
      </v-tabs>
    </v-dialog>
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
    dialog: false,
    username: "",
    password: "",
    email: "",
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    login() {
      var config = {
        method: "post",
        url: "/Auth/Login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          password: this.password,
          username: this.username,
        },
      };

      this.$axios(config)
        .then((response) =>{
            this.$cookie.set("TC.ISD", response.data.JWT, {
              expires: 30,
              domain: "localhost",
              SameSite: "Lax",
              Secure: true,
            });

          this.$store.commit("setLoggedIn")
          this.$store.commit("setUser", response.data.user);

          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    register() {},
  },
};
</script>

<style>
</style>



