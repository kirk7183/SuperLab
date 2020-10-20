<template>
  <v-dialog
    v-model="RegisterDialog"
    v-if="this.$store.state.IsLoggedIn == false"
    persistent
    xs12
    sm6
    offset-sm3
    max-width="400px"
  >
    <!--desktop registracija-->
    <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:activator="{ on }">
      <v-btn class="dugme primary" dark v-on="on">
        Registracija
        <v-icon class="ml-2">mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <!--mobile registracija-->
    <template
      v-else-if="$vuetify.breakpoint.smAndDown"
      v-slot:activator="{ on }"
    >
      <v-btn class="dugme primary" dark v-on="on">Registracija</v-btn>
    </template>
    <!-- <v-flex xs12 sm6 offset-sm3> -->
    <v-card>
      <v-card-title class="primary lighten-1 headline dugme"
        >Registracija</v-card-title
      >
      <v-card-text xs12 sm6 offset-sm3>
        <v-container>
          <v-form @submit.prevent="onSignup">
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  name="ime"
                  label="Ime"
                  id="ime"
                  v-model="ime"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  name="prezime"
                  label="Prezime"
                  id="prezime"
                  v-model="prezime"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  name="email"
                  label="e-mail"
                  id="email"
                  v-model="email"
                  type="email"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  name="password"
                  label="Šifra"
                  id="password"
                  v-model="password"
                  required
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  class="mb-4"
                  name="confirmPassword"
                  label="Ponovite šifru"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :rules="[comparePasswords]"
                  :type="showPass ? 'text' : 'password'"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex d-flex xs12>
                <v-btn
                  @click="RegisterDialog = false"
                  :disabled="disabled"
                  color="error"
                  >Nazad</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn type="submit" :loading="loading" color="success"
                  >Registracija</v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      ime: "",
      prezime: "",
      showPass: false,
    };
  },
  watch: {
    RegisterDialog() {
      if (!this.RegisterDialog) {
        (this.email = ""),
          (this.password = ""),
          (this.confirmPassword = ""),
          (this.ime = ""),
          (this.prezime = "");
      }
    },
  },
  computed: {
    RegisterDialog: {
      get() {
        return this.$store.getters.RegisterDialog;
      },
      set(newValue) {
        return this.$store.dispatch("setRegisterDialog", newValue);
      },
    },
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Sifre se ne poklapaju"
        : "";
    },
  },
  methods: {
    onSignup() {
      if (this.password != this.confirmPassword) {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Vaše šifre se ne poklapaju !",
          color: "error",
        });
      } else if (this.ime == "") {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Niste upisali ime !",
          color: "error",
        });
      } else if (this.prezime == "") {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Niste upisali prezime !",
          color: "error",
        });
        //ako nisu prazna polja onda saljem informacije mail i password u $store i tamo se proverava da li ima greske na backendu
        //ili moze da se registruje korisnik
      } else {
        this.$store.dispatch("SignupUser", {
          email: this.email,
          password: this.password,
          ime: this.ime,
          prezime: this.prezime,
        });
      }
    },
  },
};
</script>

<style>
</style>