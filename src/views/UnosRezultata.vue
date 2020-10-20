<template>
  <div>
    <v-card class="mx-4 my-4">
      <v-row class="justify-center">
        <v-btn
          @click="Unos_novogRezultataButoon()"
          class="mr-2"
          :class="$vuetify.breakpoint.xs ? `mb-4 mt-5` : ``"
          >Unos novog rezultata</v-btn
        >
        <v-btn
          @click="Pregled_rezultataBoolean()"
          class="ml-2"
          :class="$vuetify.breakpoint.xs ? `mb-5` : ``"
          >Pregled rezultata</v-btn
        >
      </v-row>
    </v-card>

    <!--Unos novih rezultata CRUD-->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="novi_rezultat_boolean" elevation="5">
        <v-toolbar flat color="primary" dark height="50">
          <v-toolbar-title class="mx-auto"
            >Unos novog rezultata</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form
              @submit.prevent="novi_rezultat_boolean"
              ref="novi_rezultat_boolean_ref"
              v-model="valid"
              lazy-validation
            >
              <v-row class="justify-center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="ime_i_prezime"
                    :rules="Rules"
                    type="text"
                    label="Ime i prezime pacijenta"
                    required
                  ></v-text-field>
                  <!-- u style ima kako da se skinu strelice sa strane-->
                  <v-text-field
                    v-model.number="br_fiskalnog_racuna"
                    :rules="Rules"
                    type="number"
                    label="Broj fiskalnog računa"
                    required
                  ></v-text-field>

                  <!-- Input FILES-->
                  <p>
                    Odaberite skeniranu sliku, PDF fajl ili fajl u kome se
                    nalaze analize
                  </p>
                  <input
                    type="file"
                    ref="file1"
                    multiple
                    @change="detectFiles($event)"
                    class="mb-4"
                  />

                  <v-row class="mt-3">
                    <v-btn
                      @click="reset"
                      color="error"
                      :disabled="this.disabled"
                      >Obriši</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="onUpload"
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

    <!-- Pregled rezultata CARD -->
    <v-scale-transition>
      <v-card class="mx-4 my-4" v-if="pregled_rezultata_boolean" elevation="5">
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
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="br_fiskalnog_racuna"
                    type="number"
                    label="Upišite broj fiskalnog računa"
                    required
                  ></v-text-field>
                  <v-row class="justify-center">
                    <v-btn
                      @click="
                        listaj(),
                          (prikaz_br_fiskalnog_racuna = br_fiskalnog_racuna)
                      "
                      class="my-5"
                      >Listaj</v-btn
                    >
                  </v-row>
                  <p
                    v-if="prikaz_br_fiskalnog_racuna !== ''"
                    class="justify-center d-flex title black--text text-center"
                    :class="$vuetify.breakpoint.smAndUp ? `text-h6` : `body-1`"
                  >
                    Broj fiskalnog racuna je:{{ prikaz_br_fiskalnog_racuna }}
                  </p>
                  <!-- orderBy(odabranaLista, 'ime') -->
                  <div v-for="(lista, index) in odabranaLista" :key="lista.ime">
                    <v-card
                      height="50"
                      class="justify-center align-center d-flex mb-2"
                    >
                      <a
                        :href="`${lista.url}`"
                        target="_blank"
                        class="ml-3"
                        :class="
                          $vuetify.breakpoint.smAndUp ? `text-h6` : `body-2`
                        "
                        >{{ lista.ime }}</a
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        class="mr-3"
                        text
                        @click="
                          (potvrda = true),
                            (ime_fajla_za_brisanje = lista.ime),
                            (index_fajla_za_brisanje = index)
                        "
                      >
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <!--Dialog za potvrdu brisanja REZULTAT FAJLA DA/NE -->
    <v-dialog v-model="potvrda" max-width="400px">
      <v-card>
        <v-card-title class="headline font-weight-black justify-center error"
          >Potvrda</v-card-title
        >
        <v-card-text class="font-weight-black mt-5" align="center"
          >Brisanje rezultata: "{{ ime_fajla_za_brisanje }}" !</v-card-text
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
            @click="
              deleteRezultat(ime_fajla_za_brisanje, index_fajla_za_brisanje)
            "
            >DA</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
import firebase from "firebase/app";
export default {
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      novi_rezultat_boolean: false,
      pregled_rezultata_boolean: false,
      valid: true,
      br_fiskalnog_racuna: "",
      prikaz_br_fiskalnog_racuna: "",
      odabrani_br_fiskalnog_racuna: "",
      ime_i_prezime: "",
      files: [],
      broj: 0,
      odabranaLista: [],
      potvrda: false,
      ime_fajla_za_brisanje: "",
      index_fajla_za_brisanje: "",
      Rules: [
        (v) => !!v || "Sva polja moraju biti popunjena",
        (v) => (v && v.length >= 3) || "Morate uneti više od 3 karaktera",
      ],
    };
  },

  computed: {
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
  },

  methods: {
    Unos_novogRezultataButoon() {
      if (this.pregled_rezultata_boolean == true) {
        this.pregled_rezultata_boolean = !this.pregled_rezultata_boolean;
      }
      setTimeout(() => {
        this.novi_rezultat_boolean = !this.novi_rezultat_boolean;
      }, 300);
    },
    Pregled_rezultataBoolean() {
      if (this.novi_rezultat_boolean == true) {
        this.novi_rezultat_boolean = !this.novi_rezultat_boolean;
      }
      setTimeout(() => {
        this.pregled_rezultata_boolean = !this.pregled_rezultata_boolean;
      }, 300);
    },
    detectFiles(e) {
      //ako korisnik odabere recimo 2fajla pa klikne ok i ono prikaze "2 files",
      //pa klikne opet pa odabere jos 3 fajla...da api za upload ce prikazati samo ta 3 fajla ali array this.files = [];
      //ce imati vec u nizu prva dva fajla i samo ce dodati ova 3 fajla i u firebase ce se snimiti sva 5 fajla zato na pocetku mora prazan niz
      this.files = [];
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.files.push(fileList[x]);
      });
    },
    onUpload() {
      if (
        this.ime_i_prezime == "" ||
        this.br_fiskalnog_racuna == "" ||
        this.files == ""
      ) {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Molim Vas proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else {
        let newIter = this.files;

        this.$store.state.LoadingButton = true;
        this.$store.state.DisabledButton = true;

        for (const fileM of newIter) {
          this.broj += 1;

          firebase
            .storage()
            .ref(
              "rezultati/" +
                this.br_fiskalnog_racuna +
                "/" +
                this.ime_i_prezime +
                "-" +
                this.broj
            )
            .put(fileM)
            .then(() => {
              setTimeout(() => {
                this.$store.state.LoadingButton = false;
                this.$store.state.DisabledButton = false;
                this.$store.dispatch("Snackbar_Message", {
                  boolean: true,
                  message: "Uspešno ste uneli novi rezultat",
                  color: "success",
                });
              }, 500);
            })
            .catch((error) => {
              console.error("Error delete document: ", error);
            });
        }
        setTimeout(() => {
          this.reset();
          this.broj = 0;
        }, 300);
      }
    },
    reset() {
      this.$refs.novi_rezultat_boolean_ref.reset();
    },
    listaj() {
      this.prikaz_br_fiskalnog_racuna = "";
      this.odabranaLista = [];
      this.odabrani_br_fiskalnog_racuna = this.br_fiskalnog_racuna;
      let url;
      if (this.br_fiskalnog_racuna == "") {
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Upišite broj fiskalnog računa",
          color: "error",
        });
      } else {
        let listRef = firebase
          .storage()
          .ref("rezultati/" + this.br_fiskalnog_racuna);

        var finishedList = listRef.listAll();

        finishedList.then((sve) => {
          sve.items.forEach((each) => {
            each
              .getDownloadURL()
              .then((url_iz_storage) => {
                //FIREBASE IMA PROBLEM OKO VRACANJA CATCH-a, NE PRIKAZUJE NISTA, ZATO SAM OSTAVIO OVO AKO PRORADI, AKO SE NE UKUCAJ DOBAR BROJ FISKALNOG RACUNA
                // if (
                //   url_iz_storage == "" ||
                //   url_iz_storage == undefined ||
                //   url_iz_storage == null
                // ) {
                //   this.$store.dispatch("Snackbar_Message", {
                //     boolean: true,
                //     message:
                //       "Vaši rezultati nisu gotovi ili ste uneli pogrešan broj fiskalnog računa",
                //     color: "error"
                //   });
                // } else {
                url = url_iz_storage;
                // }
              })
              .then(() => {
                this.odabranaLista.push({ ime: each.name, url: url });
                this.br_fiskalnog_racuna = "";
              });
          });
        });
      }
    },

    deleteRezultat(fajl, index) {
      //kada u direktorijumu nema ni jedan fajl, Firebase brise i direktorijum
      var path = "rezultati/" + this.odabrani_br_fiskalnog_racuna + "/" + fajl;
      firebase
        .storage()
        .ref()
        .child(path)
        .delete()
        .then(() => {
          this.$store.dispatch("Snackbar_Message", {
            boolean: true,
            message: "Uspesno ste obrisali fajl " + fajl,
            color: "success",
          });
        })
        .then(() => {
          this.odabranaLista.splice(index, 1);
          this.ne();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ne() {
      this.potvrda = false;
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