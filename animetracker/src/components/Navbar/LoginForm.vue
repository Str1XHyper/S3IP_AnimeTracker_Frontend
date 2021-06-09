<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="px-0" v-bind="attrs" v-on="on"
          ><v-icon class="mr-5">mdi-login</v-icon>Login</v-btn
        >
      </template>
      <v-tabs fixed-tabs color="accent">
        <v-tab @click="alert = false"> Login </v-tab>
        <v-tab @click="alert = false"> Register </v-tab>
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
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
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
              <v-alert class="mb-0" v-model="loginError" color="error"
      dismissible>Wrong username and password combination</v-alert>
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
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        required
                      ></v-text-field>
                    </ValidationProvider> </v-col
                  ><v-col>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Confirm Password"
                      rules="required"
                    >
                      <v-text-field
                        label="Confirm Password*"
                        v-model="confirmPassword"
                        :error-messages="errors"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        :rules="[passwordMatch]"
                        @click:append="show3 = !show3"
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
      <v-alert class="mb-0" v-model="alert" color="error"
      dismissible> An unhandeld exception occured, please contact Tijnvanveghel@gmail.com </v-alert>
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
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    },
  },
  data: () => ({
    dialog: false,
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    show1: false,
    show2: false,
    show3: false,
    alert: false,
    loginError: false,
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
        .then((response) => {
          if(response.data == ""){
            this.loginError = true;
            return
          }
          this.$cookie.set("TC.ISD", response.data.jwt, {
            expires: 30,
            domain: "localhost",
            SameSite: "Lax",
          });

          this.$store.commit("setLoggedIn");
          this.$store.commit("setUser", response.data.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    register() {
      var config = {
        method: "post",
        url: "/Auth/Register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: this.email,
          password: this.password,
          username: this.username,
        },
      };

      this.$axios(config)
        .then((response) => {
          this.$store.commit("setLoggedIn");
          this.$store.commit("setUser", response.data);
        })
        .catch(function (error) {
          this.alert = true;
        });
    },
  },
};
</script>

<style>
</style>



