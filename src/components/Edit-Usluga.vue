<template>
  <div>
    <v-dialog
      v-model="edit_EditUsluga_dialog"
      persistent
      xs12
      sm6
      offset-sm3
      max-width="400px"
    >
      <template v-slot:activator="{ on: Ukljuci }">
        <v-btn
          icon
          color="blue darken-3"
          height="48"
          width="48"
          v-on="Ukljuci"
          @click="refresh()"
        >
          <v-icon small>far fa-edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="primary lighten-1 headline justify-center align-center mx-auto"
          >Izmena usluge</v-card-title
        >
        <v-card-text xs-12 sm6 offset-sm3>
          <v-container>
            <!-- lazy-validation -->
            <v-form @submit.prevent ref="Edit_Usluga_ref" lazy-validation>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    :rules="Rules"
                    label="Naziv usluge"
                    type="text"
                    v-model="Naziv_usluge"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    :rules="Rules"
                    label="Opis usluge"
                    type="text"
                    v-model="Opis_usluge"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <!-- u style ima kako da se skinu strelice sa strane-->
                  <v-text-field
                    label="Cena usluge (primer '3000')"
                    type="number"
                    v-model.number="Cena"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-btn
                  color="error"
                  @click="edit_EditUsluga_dialog = false"
                  :disabled="disabled"
                  >Nazad</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  class="pa-2"
                  color="success"
                  @click="validate_Edit_Usluga"
                  :loading="loading"
                  >Snimi izmene</v-btn
                >
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  props: ["naziv_grupe_cena", "naziv_usluge", "opis_usluge", "cena_usluge"],
  data: () => ({
    Naziv_grupe_cena: "",
    Naziv_usluge: "",
    Opis_usluge: "",

    Cena: {
      type: Number,
      default: 0,
      required: false,
      validator(value) {
        return value >= 0;
      },
    },
    edit_EditUsluga_dialog: false,
    Rules: [
      (v) => !!v || "Sva polja moraju biti popunjena",
      (v) =>
        (v && v.length >= 3) ||
        "Naziv grupe cena mora da ima vise od 3 karaktera",
    ],
  }),
  computed: {
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
  },
  methods: {
    refresh() {
      this.Naziv_grupe_cena = this.naziv_grupe_cena;
      this.Naziv_usluge = this.naziv_usluge;
      this.Opis_usluge = this.opis_usluge;
      this.Cena = this.cena_usluge;
    },
    validate_Edit_Usluga() {
      this.$refs.Edit_Usluga_ref.validate();

      if (
        this.Naziv_usluge == "" ||
        this.Naziv_usluge == " " ||
        this.Naziv_usluge == undefined ||
        this.Opis_usluge == "" ||
        this.Opis_usluge == " " ||
        this.Opis_usluge == undefined ||
        this.Cena == "" ||
        this.Cena == " " ||
        this.Cena == undefined
      ) {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera (this.Rules to odradjuje)
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else if (this.Odabrana_grupa_cena == "") {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: 'Odaberite "grupu cena" u koju zelite da ubacite novu cenu',
          color: "error",
        });
      } else {
        this.$store
          .dispatch("Edit_Cena", {
            Odabrana_grupa_cena: this.Naziv_grupe_cena,
            Naziv_usluge: this.Naziv_usluge,
            Opis_usluge: this.Opis_usluge,
            Cena: this.Cena,
          })
          .then(() => {
            var stari_naziv_usluge = this.naziv_usluge;
            var novi_naziv_usluge = this.Naziv_usluge;
            if (stari_naziv_usluge !== novi_naziv_usluge) {
              firebase
                .firestore()
                .collection("cenovnik")
                .doc(this.Naziv_grupe_cena)
                .update({
                  [stari_naziv_usluge]: firebase.firestore.FieldValue.delete(),
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            setTimeout(() => {
              //refreshuje listu posle brisanja
              this.$store.dispatch("Pregled_grupa_cena");
              //gasi dialog
              this.edit_EditUsluga_dialog = false;
            }, 1000);
          });
      }
    },
  },
};
</script>

<style scoped>
/* brisanje strelice gore dole za "input" type"number" */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>