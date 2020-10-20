<template>
  <div>
    <!--Buttons -->

    <v-card class="mx-4 mt-4">
      <v-col class="justify-center align-center">
        <v-row>
          <v-btn class="mx-auto mt-4" @click="Novo_obavestenjeButton()"
            >Novo obaveštenje</v-btn
          >
        </v-row>
        <v-row>
          <v-btn class="mx-auto my-5" @click="Pregled_obavestenjaButton()"
            >Pregled obaveštenja</v-btn
          >
        </v-row>
      </v-col>
    </v-card>
    <!--Novo obavestenje CARD-->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="Novo_obavestenje">
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title class="mx-auto"
            >Unesite novo obaveštenje</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form
              @submit.prevent="Novo_obavestenje"
              ref="Novo_obav_ref"
              v-model="valid"
              lazy-validation
            >
              <v-row class="justify-center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="naziv_obavestenja"
                    label="Naziv obaveštenja"
                    :rules="Rules"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="text_obavestenja"
                    label="Text obaveštenja"
                    :rules="Rules"
                    required
                  ></v-textarea>

                  <v-row class="mt-3">
                    <v-btn
                      @click="reset"
                      color="error"
                      :disabled="this.disabled"
                      >Obriši</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      @click="validate"
                      :loading="this.loading"
                      color="success"
                      >Snimi</v-btn
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <!-- Pregled obavestenja CARD-->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="Pregled_obavestenja">
        <v-toolbar color="primary" dark dense>
          <v-toolbar-title class="mx-auto">Pregled obaveštenja</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-col class="mx-auto" cols="12" sm="4" md="2">
              <v-overflow-btn
                v-model="broj"
                :items="brojObave"
                item-text="text"
                item-value="vrednost"
                label="Broj poslednjih obaveštenja:"
              ></v-overflow-btn>
              <v-row>
                <v-btn
                  class="mx-auto my-3"
                  color="success"
                  @click="PrikaziObavestenjaButton(broj)"
                  >Prikaži</v-btn
                >
              </v-row>
            </v-col>
          </v-container>

          <!-- v-circular dok ocitava podatke -->
          <div class="text-center mt-12" v-if="LoadingDataObavestenja">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>

          <div
            v-for="(obave, index) in lista_obavestenja"
            :key="index"
            class="post"
          >
            <!-- getMonth() + 1 ...+1 je zato sto je januar 0(nula)-->
            <v-card class="mx-auto mb-5" max-width="800" elevation="5" shaped>
              <v-toolbar flat color="primary lighten-1" dark dense height="35">
                <v-toolbar-title class="mx-auto heading-6">{{
                  obave.naziv
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- ikonica za brisanje(delete) obavestenja -->
                <v-btn
                  icon
                  class="mr-2"
                  @click="
                    (potvrda = true),
                      (id_za_brisanje = obave.id),
                      (obavestenje_za_brisanje = obave.naziv)
                  "
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>

                <!-- import Edit-Obavestenja.vue>  ikonica pencil(olovka)-->
                <Import_EditObavestenja
                  v-bind:obave_info="obave"
                  v-bind:broj="broj"
                  :key="obave.id"
                ></Import_EditObavestenja>

                <!-- ikonica za prikaz ili skrivanje ispisa  -->
                <v-btn icon @click="obave.show = !obave.show" class>
                  <v-icon>{{
                    obave.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-toolbar>

              <v-row>
                <!-- da ne bude zabune getDay() vraca dan u nedelji, getDate()vraca dan u mesecu-->
                <v-card-subtitle class="ml-3 pa-3">
                  Postavljeno:
                  {{ obave.datum.toDate().getDate() }} /
                  {{ datumPrerada(obave.datum.toDate().getMonth()) }} /
                  {{ obave.datum.toDate().getFullYear() }}
                </v-card-subtitle>

                <v-spacer></v-spacer>
              </v-row>

              <v-expand-transition>
                <div v-show="obave.show">
                  <v-divider></v-divider>

                  <v-card-text class="ma-0 pa-0 pt-2">
                    <v-textarea
                      auto-grow
                      dense
                      rounded
                      readonly
                      :value="obave.text"
                      :key="obave.show"
                    ></v-textarea>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <!--Dialog za potvrdu brisanja obavestenja DA/NE -->
    <v-dialog v-model="potvrda" max-width="400px">
      <v-card>
        <v-card-title class="headline font-weight-black justify-center error"
          >Potvrda</v-card-title
        >
        <v-card-text class="font-weight-black mt-5" align="center"
          >Brisanje obaveštenja: "{{ obavestenje_za_brisanje }}" !</v-card-text
        >
        <v-card-text class="font-weight-black" align="center"
          >Da li ste sigurni da zelite da obrišete ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" :disabled="this.disabled" @click="ne()"
            >NE</v-btn
          >
          <v-btn
            color="success"
            :loading="this.loading"
            @click="delete_item(id_za_brisanje)"
            >DA</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Kraj -->
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";
export default {
  components: {
    Import_EditObavestenja: () => import("../components/Edit-Obavestenja.vue"),
  },
  data() {
    return {
      id_za_brisanje: "",
      obavestenje_za_brisanje: "",
      index: false,
      potvrda: false,
      Novo_obavestenje: false,
      Pregled_obavestenja: false,

      naziv_obavestenja: "",
      text_obavestenja: "",
      valid: true,
      naziv: "",
      brojObave: [
        { text: "10", vrednost: 10 },
        { text: "20", vrednost: 20 },
        { text: "50", vrednost: 50 },
      ],
      broj: 10,
      Meseci: [
        "Januar",
        "Februar",
        "Mary",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avgust",
        "Septembar",
        "Oktobar",
        "Novembar",
        "Decembar",
      ],
      Rules: [
        (v) => !!v || "Sva polja moraju biti popunjena",
        (v) =>
          (v && v.length >= 3) ||
          "Naziv obaveštenja mora da ima vise od 3 karaktera",
      ],
    };
  },
  computed: {
    ...mapGetters({ lista_obavestenja: "Lista_obavestenja" }),
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
    LoadingDataObavestenja: {
      get() {
        return this.$store.state.LoadingDataObavestenja;
      },
    },
  },

  methods: {
    validate() {
      this.$refs.Novo_obav_ref.validate();
      if (
        this.naziv_obavestenja == "" ||
        this.naziv_obavestenja == " " ||
        this.text_obavestenja == "" ||
        this.text_obavestenja == " "
      ) {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Molim Vas proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else {
        this.$store.dispatch("Novo_obavestenje", {
          naziv: this.naziv_obavestenja,
          text: this.text_obavestenja,
          show: false, //ovo mora da bi se v-card mogla pojedinacno otvarati tj prikazivati sadrzaj
        });
        setTimeout(() => {
          this.reset();
        }, 1000);
      }
    },
    reset() {
      this.$refs.Novo_obav_ref.reset();
    },
    Novo_obavestenjeButton() {
      if (this.Pregled_obavestenja == true) {
        this.Pregled_obavestenja = !this.Pregled_obavestenja;
      }
      setTimeout(() => {
        this.Novo_obavestenje = !this.Novo_obavestenje;
      }, 300);
    },
    Pregled_obavestenjaButton() {
      if (this.Novo_obavestenje == true) {
        this.Novo_obavestenje = !this.Novo_obavestenje;
      }
      setTimeout(() => {
        this.Pregled_obavestenja = !this.Pregled_obavestenja;
      }, 300);
    },
    PrikaziObavestenjaButton(odabranihBroj) {
      this.$store.dispatch("Pregled_obavestenja", odabranihBroj);
    },
    datumPrerada(month) {
      return this.Meseci[month];
    },
    delete_item(id) {
      this.$store.state.LoadingButton = true;
      this.$store.state.DisabledButton = true;
      firebase
        .firestore()
        .collection("obavestenja")
        .doc(id)
        .delete()
        .then(() => {
          setTimeout(() => {
            this.$store.state.LoadingButton = false;
            this.$store.state.DisabledButton = false;
            this.$store.dispatch("Snackbar_Message", {
              boolean: true,
              message: "Uspešno ste izbrisali obaveštenje",
              color: "orange",
            });
            this.PrikaziObavestenjaButton(this.broj);
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

<style scoped>
.scale-transition-enter-active {
  transition: all 0.5s ease;
}
.scale-transition-leave-active {
  transition: all 0.2s ease;
}
</style>