<template>
  <div>
    <!--Buttons -->

    <v-card class="mx-4 mt-4">
      <v-col class="justify-center align-center">
        <v-row>
          <v-btn class="mx-auto mt-4" @click="Novo_najčešćePitanjeButton()">Novo najčešće pitanje</v-btn>
        </v-row>
        <v-row>
          <v-btn
            class="mx-auto my-5"
            @click="Pregled_načešćihPitanjaButton()"
          >Pregled najčešćih pitanja</v-btn>
        </v-row>
      </v-col>
    </v-card>
    <!-- v-circular dok ocitava podatke -->
    <div class="text-center mt-12" v-if="LoadingDataUnosNajcescihPitanja">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!--Novo najcesce pitanje CARD-->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="novo_najcescePitanje" elevation="5">
        <v-toolbar flat color="primary" dark height="50">
          <v-toolbar-title class="mx-auto" he>Unesite novo najčešće pitanje</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form
              @submit.prevent="novo_najcescePitanje"
              ref="Novo_naj_pitanje_ref"
              v-model="valid"
              lazy-validation
            >
              <v-row class="justify-center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="najcesce_pitanje"
                    label="Najčešće pitanje"
                    :rules="Rules"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="odgovor_najcesceg_pitanja"
                    label="Odgovor najčešćeg pitanja"
                    :rules="Rules"
                    required
                  ></v-textarea>

                  <v-row class="mt-3">
                    <v-btn @click="reset" color="error" :disabled="this.disabled">Obriši</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      @click="validate"
                      :loading="this.loading"
                      color="success"
                    >Snimi</v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <!-- Pregled najcescih pitanja CARD-->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="pregled_najcescih_pitanja">
        <v-toolbar color="primary" dark height="50">
          <v-toolbar-title class="mx-auto">Pregled najčešćih pitanja</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <div v-for="(naj_pitanja,index) in lista_najcescih_pitanja" :key="index" class="post">
            <v-card class="mx-auto mb-5" max-width="1100" elevation="5">
              <v-toolbar flat color="primary lighten-1 " dense dark height="35" elevation="10">
                <v-toolbar-title class="mx-auto body-1">{{ naj_pitanja.pitanje }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- ikonica za brisanje(delete) obavestenja -->
                <v-btn
                  icon
                  class="mr-2"
                  @click="potvrda = true, id_za_brisanje=naj_pitanja.id, pitanje_za_brisanje=naj_pitanja.pitanje"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>

                <!--import import_NajcescihPitanja.vue> ikonica pencil(olovka)-->
                <import_EditNajcescihPitanja :naj_pitanja_info="naj_pitanja" :key="naj_pitanja.id"></import_EditNajcescihPitanja>

                <!-- ikonica za prikaz ili skrivanje ispisa  -->
                <v-btn icon @click="naj_pitanja.show = !naj_pitanja.show" class>
                  <v-icon>{{ naj_pitanja.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-toolbar>

              <v-row>
                <v-spacer></v-spacer>
              </v-row>

              <v-expand-transition>
                <div v-show="naj_pitanja.show">
                  <v-divider></v-divider>

                  <v-card-text class="ma-0 pa-0 pt-2">
                    <v-textarea
                      auto-grow
                      dense
                      rounded
                      readonly
                      :value="naj_pitanja.odgovor"
                      :key="naj_pitanja.show"
                    ></v-textarea>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <!--Dialog za potvrdu brisanja NAJCESCIH PITANJA DA/NE -->
    <v-dialog v-model="potvrda" max-width="400px">
      <v-card>
        <v-card-title class="headline font-weight-black justify-center error">Potvrda</v-card-title>
        <v-card-text
          class="font-weight-black mt-5"
          align="center"
        >Brisanje pitanja: "{{pitanje_za_brisanje}}" !</v-card-text>
        <v-card-text
          class="font-weight-black"
          align="center"
        >Da li ste sigurni da zelite da obrišete ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" :disabled="this.disabled" @click="ne()">NE</v-btn>
          <v-btn color="success" :loading="this.loading" @click="delete_item(id_za_brisanje)">DA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Kraj -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
export default {
  components: {
    import_EditNajcescihPitanja: () =>
      import("../components/Edit-Najcescih-Pitanja.vue"),
  },
  data() {
    return {
      novo_najcescePitanje: false,
      pregled_najcescih_pitanja: false,
      valid: true,
      potvrda: false,
      id_za_brisanje: "",
      pitanje_za_brisanje: "",
      najcesce_pitanje: "",
      odgovor_najcesceg_pitanja: "",
      Rules: [
        (v) => !!v || "Sva polja moraju biti popunjena",
        (v) => (v && v.length >= 3) || "Morate uneti više od 3 karaktera",
      ],
    };
  },
  computed: {
    ...mapGetters({ lista_najcescih_pitanja: "Lista_najcescih_pitanja" }),

    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
    LoadingDataUnosNajcescihPitanja: {
      get() {
        return this.$store.state.LoadingDataUnosNajcescihPitanja;
      },
    },
  },

  methods: {
    Novo_najčešćePitanjeButton() {
      if (this.pregled_najcescih_pitanja == true) {
        this.pregled_najcescih_pitanja = !this.pregled_najcescih_pitanja;
      }
      setTimeout(() => {
        this.novo_najcescePitanje = !this.novo_najcescePitanje;
      }, 300);
    },
    Pregled_načešćihPitanjaButton() {
      this.$store.dispatch("Pregled_najcescih_pitanja");

      if (this.novo_najcescePitanje == true) {
        this.novo_najcescePitanje = !this.novo_najcescePitanje;
      }
      setTimeout(() => {
        this.pregled_najcescih_pitanja = !this.pregled_najcescih_pitanja;
      }, 300);
    },

    validate() {
      this.$refs.Novo_naj_pitanje_ref.validate(); //proverava RULES
      if (
        this.najcesce_pitanje == "" ||
        this.najcesce_pitanje == " " ||
        this.odgovor_najcesceg_pitanja == "" ||
        this.odgovor_najcesceg_pitanja == " "
      ) {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Molim Vas proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else {
        this.$store.dispatch("Novo_najcesce_pitanje", {
          pitanje: this.najcesce_pitanje,
          odgovor: this.odgovor_najcesceg_pitanja,
          show: false, //ovo mora da bi se v-card mogla pojedinacno otvarati tj prikazivati sadrzaj
        });
        setTimeout(() => {
          this.reset();
        }, 1000);
      }
    },
    reset() {
      this.$refs.Novo_naj_pitanje_ref.reset();
    },
    delete_item(id) {
      this.$store.state.LoadingButton = true;
      this.$store.state.DisabledButton = true;
      firebase
        .firestore()
        .collection("najcesca_pitanja")
        .doc(id)
        .delete()
        .then(() => {
          setTimeout(() => {
            this.$store.state.LoadingButton = false;
            this.$store.state.DisabledButton = false;
            this.$store.dispatch("Snackbar_Message", {
              boolean: true,
              message: "Uspešno ste izbrisali najčešće pitanje",
              color: "orange",
            });
            this.edit_Najcesca_Pitanja_dialog = false;
            this.$store.dispatch("Pregled_najcescih_pitanja");
            this.ne();
          }, 500);
        })
        .catch((error) => {
          console.error("Error delete document: ", error);
        });
    },
    ne() {
      this.potvrda = false;
    },
  },
};
</script>

<style>
</style>