<template>
  <!-- ONLINE REZULTATI SU SMESTENI U "STORAGE" U FIREBASE-U-->
  <div
    :class="
      $vuetify.breakpoint.smAndUp
        ? `pa-5`
        : $vuetify.breakpoint.xs
        ? `pa-1 mt-3`
        : ``
    "
    :style="
      $vuetify.breakpoint.lgAndUp
        ? `max-width: 1200px;  margin-left:auto !important; margin-right:auto !important;`
        : $vuetify.breakpoint.xs
        ? `ma-3 mt-7`
        : ``
    "
  >
    <!-- Pregled rezultata CARD -->

    <v-card class="mx-2 my-4" elevation="5">
      <v-toolbar flat color="primary" dark height="50">
        <v-toolbar-title class="mx-auto">Pregled rezultata</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form
            @submit.prevent="pregled_rezultata_boolean"
            ref="pregled_rezultata_boolean_ref"
            lazy-validation
          >
            <v-row class="justify-center">
              <v-col cols="12" sm="6" class="align-center justify-center">
                <!-- za text u centru potrebno je u class dati mu naziv ali i u css-->
                <v-text-field
                  class="inputFiskalniRacun centered-input"
                  v-model="br_fiskalnog_racuna"
                  type="number"
                  label="Upišite broj fiskalnog računa"
                  required
                ></v-text-field>
                <v-btn @click="listaj" class="mb-9 d-flex mx-auto"
                  >Prikazi</v-btn
                >

                <div
                  v-for="(lista, index) in orderBy(odabranaLista, 'ime')"
                  :key="index"
                >
                  <v-toolbar height="50" class="justify-center d-flex mb-2">
                    <v-toolbar-title>
                      <a :href="`${lista.url}`" target="_blank">{{
                        lista.ime
                      }}</a>
                    </v-toolbar-title>
                  </v-toolbar>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
import firebase from "firebase/app";
export default {
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      br_fiskalnog_racuna: "",
      ime_i_prezime: "",
      odabranaLista: [],
    };
  },
  methods: {
    listaj() {
      this.odabranaLista = [];
      let url;

      firebase
        .storage()
        .ref("rezultati/" + this.br_fiskalnog_racuna)
        .listAll()
        .then((sve) => {
          sve.items.forEach((each) => {
            each
              .getDownloadURL()
              .then((sta) => {
                url = sta;
              })
              .then(() => {
                this.odabranaLista.push({ ime: each.name, url: url });
              });
          });
        });
    },
  },
};
</script>

<style scoped>
/* ove strelice idu zato sto je scoped inace ako nije samo se obrisu te tri strelice (je vece)*/
/* da text bude u sredini u input-u */
.centered-input >>> input {
  text-align: center;
}

.inputFiskalniRacun input[type="number"] {
  -moz-appearance: textfield;
}
.inputFiskalniRacun input::-webkit-outer-spin-button,
.inputFiskalniRacun input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>