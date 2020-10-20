<template>
  <!-- poupup window -->
  <div class="text-center">
    <v-dialog
      v-model="LoginDialog"
      persistent
      xs12
      sm6
      offset-sm3
      max-width="400px"
    >
      <!--desktop logout-->
      <template
        v-if="IsLoggedIn & $vuetify.breakpoint.mdAndUp"
        v-slot:activator="{ off: logoutActivator }"
      >
        <v-btn
          class="dugme primary mr-2"
          dark
          v-on="logoutActivator"
          v-shortkey="['ctrl', 'alt', 'l']"
          @shortkey="Logout()"
          @click="Logout()"
        >
          Logout
          <v-icon class="ml-1">mdi-logout</v-icon>
        </v-btn>
      </template>
      <!--mobile logout-->

      <template
        v-else-if="IsLoggedIn & $vuetify.breakpoint.smAndDown"
        v-slot:activator="{ off: logoutActivator }"
      >
        <v-btn
          class="dugme primary"
          dark
          v-on="logoutActivator"
          v-shortkey="['ctrl', 'alt', 'l']"
          @shortkey="Logout()"
          @click="Logout()"
        >
          <v-icon class="ml-1">mdi-logout</v-icon>
        </v-btn>
      </template>
      <!--desktop login-->
      <template
        v-else-if="!IsLoggedIn & $vuetify.breakpoint.mdAndUp"
        v-slot:activator="{ on: loginActivator }"
      >
        <v-btn class="dugme primary mr-2" dark v-on="loginActivator">
          Login
          <v-icon class="ml-2">mdi-login</v-icon>
        </v-btn>
      </template>
      <!--mobile login-->
      <template
        v-else-if="!IsLoggedIn & $vuetify.breakpoint.smAndDown"
        v-slot:activator="{ on: loginActivator }"
      >
        <v-btn class="dugme primary mr-2" dark v-on="loginActivator">
          Login
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="primary lighten-1 headline dugme"
          >Login</v-card-title
        >
        <v-card-text xs-12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent="onLogin">
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    name="email"
                    label="E-mail"
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
                <v-flex d-flex xs12>
                  <!-- Ovo dugme je disabled kada kliknes da se logujes da ne bi imao opciju da u toku samog logovanja mozes da kliknes na "nazad" -->
                  <v-btn
                    @click="LoginDialog = false"
                    :disabled="this.disabled"
                    color="error"
                    >Nazad</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- Ovo dugme ima loading opciju ukljucenu (kruzic koji se vrti kada cekas da se nesto zavrsi) -->
                  <v-btn type="submit" :loading="this.loading" color="success"
                    >Login</v-btn
                  >
                </v-flex>
              </v-layout>
              <v-divider class="mt-4"></v-divider>
              <v-row class="justify-center mt-4">
                <v-btn color="orange" @click="login_as_guest">Demo login</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      showPass: false,
    };
  },
  watch: {
    LoginDialog() {
      if (this.$store.getters.LoginDialog == false) {
        this.email = "";
        this.password = "";
      }
    },
  },
  computed: {
    IsLoggedIn: {
      get() {
        return this.$store.getters.IsLoggedIn;
      },
    },
    LoginDialog: {
      get() {
        return this.$store.getters.LoginDialog;
      },
      set(newValue) {
        return this.$store.dispatch("setLoginDialog", newValue);
      },
    },
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
  },
  methods: {
    onLogin() {
      if (this.email == null) {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Unesite email !",
          color: "error",
        });
      } else if (this.password == null) {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Unesite šifru !",
          color: "error",
        });
        //ako nisu prazna polja onda saljem informacije mail i password u $store i tamo se proverava da li ima greske na backendu
        //ili moze da se loguje korisnik
      } else {
        this.$store.dispatch("LoginUser", {
          email: this.email,
          password: this.password,
        });
      }
    },
    Logout() {
      if (this.IsLoggedIn) {
        if (this.$route.path !== "/home") {
          this.$router.replace({ name: "Home" });
        }
        this.$store.dispatch("Logout");
      }
    },
    login_as_guest() {
      this.$store.dispatch("LoginUser", {
        email: "guest123@gmail.com",
        password: "123123",
      });
    },
  },
};
</script>

<style>
</style>