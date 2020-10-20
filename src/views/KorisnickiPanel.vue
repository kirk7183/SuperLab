<template>
  <div class="pa-5">
    <!-- v-circular dok ocitava podatke -->
    <div class="text-center mt-12" v-if="LoadingDataKorisnickiPanel">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card class="mx-4 my-4" elevation="5" v-if="!LoadingDataKorisnickiPanel">
      <v-toolbar flat color="primary" dark height="50">
        <v-toolbar-title class="mx-auto">Korisnički panel</v-toolbar-title>
      </v-toolbar>

      <v-card-title
        class="justify-center text-center"
        :class="$vuetify.breakpoint.smAndUp ? `headline` : ($vuetify.breakpoint.xs ? `body-2 pb-0` : ``)"
      >
        Ime :
        <br v-if="$vuetify.breakpoint.xs" />
        {{userDataAdvance.ime}}
      </v-card-title>
      <v-card-title
        class="justify-center text-center"
        :class="$vuetify.breakpoint.smAndUp ? `headline ` : ($vuetify.breakpoint.xs ? `body-2 pb-0` : ``)"
      >
        Prezime :
        <br v-if="$vuetify.breakpoint.xs" />
        {{userDataAdvance.prezime}}
      </v-card-title>
      <v-card-title
        class="justify-center text-center"
        :class="$vuetify.breakpoint.smAndUp ? `headline` : ($vuetify.breakpoint.xs ? `body-2 pb-0` : ``)"
      >
        E-mail :
        <br v-if="$vuetify.breakpoint.xs" />
        {{userDataAdvance.email}}
      </v-card-title>
      <v-card-title
        class="justify-center text-center"
        :class="$vuetify.breakpoint.smAndUp ? `headline` : ($vuetify.breakpoint.xs ? `body-2` : ``)"
      >
        Admin :
        <br v-if="$vuetify.breakpoint.xs" />
        {{userDataAdvance.admin}}
      </v-card-title>

      <v-divider></v-divider>
      <v-row>
        <v-row class="justify-center align-center">
          <v-btn @click="promena_Sifre" class="my-7">Promena sifre</v-btn>
        </v-row>
        <!-- PROMENA SIFRE DIALOG -->
        <v-dialog
          v-model="this.$store.state.promenaSifreDialog"
          persistent
          xs12
          sm6
          offset-sm3
          max-width="400px"
        >
          <v-card>
            <v-card-title class="primary lighten-1 headline">Promena šifre</v-card-title>
            <v-card-text xs-12 sm6 offset-sm3>
              <v-container>
                <v-form @submit.prevent="onPasswordChange">
                  <v-layout row>
                    <v-flex xs-12>
                      <v-text-field
                        name="oldPassword"
                        label="Ukucajte staru šifru"
                        id="oldPassword"
                        v-model="old_password"
                        required
                        :append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showOld ? 'text' : 'password'"
                        @click:append="showOld = !showOld"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs-12>
                      <v-text-field
                        name="newPassword"
                        label="Ukucajte novu šifru"
                        id="newPassword"
                        v-model="new_password"
                        required
                        :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNew ? 'text' : 'password'"
                        @click:append="showNew = !showNew"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs-12>
                      <v-text-field
                        name="newPassword_check"
                        label="Ponovite novu šifru"
                        id="newPassword_check"
                        v-model="new_password_check"
                        required
                        :type="showNew ? 'text' : 'password'"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-row class="mt-3">
                    <v-btn color="error" :disabled="disabled" @click="nazad()">Nazad</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="success" :loading="loading">Snimi</v-btn>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      new_password_check: "",
      showOld: false,
      showNew: false,
    };
  },

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("UserDataAdvance");
      }
    });
  },
  // NE BRISATI ***** VAZNO***DIREKTNO WATCH U VUEX
  //watch getter i kada getters ima podatak tj nije "" ili undefined onda prekida ocitavanje i prikazuje podatke
  // watch: {
  //   "$store.getters.UserDataAdvance.ime": function() {
  //     this.ime = this.$store.getters.UserDataAdvance.ime;
  //   }
  // },

  computed: {
    ...mapGetters({ userDataAdvance: "UserDataAdvance" }),

    LoadingDataKorisnickiPanel: {
      get() {
        return this.$store.state.LoadingDataKorisnickiPanel;
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
    promena_Sifre() {
      this.$store.state.promenaSifreDialog = true;
    },
    nazad() {
      this.$store.state.promenaSifreDialog = false;
    },
    onPasswordChange() {
      if (this.old_password == this.new_password && this.old_password != "") {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message:
            "Stara šifra i nova šifra su vam iste ! Promenite novu šifru !",
          color: "error",
        });
      } else if (this.new_password != this.new_password_check) {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message:
            "Nova šifra vam se ne slaže ! Proverite da li vam se nova šifra poklapa !",
          color: "error",
        });
      } else {
        this.$store.dispatch("promenaSifre", {
          oldPassword: this.old_password,
          newPassword: this.new_password,
        });
      }
    },
  },
};
</script>

<style>
</style>