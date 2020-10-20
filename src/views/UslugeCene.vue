<template>
  <div>
    <v-card class="mx-4 mt-4" elevation="5">
      <v-col class="justify-center align-center">
        <v-row>
          <v-btn class="mx-auto mt-4" @click="Nova_Cena_method()"
            >Nova cena</v-btn
          >
        </v-row>
        <v-row>
          <v-btn class="mx-auto my-5" @click="Nova_Grupa_Cena_method()"
            >Nova grupa cena</v-btn
          >
        </v-row>
        <v-row>
          <v-btn class="mx-auto mb-4" @click="Pregled_Postojecih_Cena_method()"
            >Pregled postojećih cena</v-btn
          >
        </v-row>
      </v-col>
    </v-card>
    <!-- v-circular dok ocitava podatke -->
    <div class="text-center mt-12" v-if="LoadingDataUslugeCena">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Nova cena -->
    <v-expand-transition>
      <v-card class="mx-4 my-4" v-if="Nova_Cena_boolean" elevation="5">
        <v-toolbar color="blue lighten-2" height="50">
          <v-toolbar-title class="mx-auto">Nova cena</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form
              @submit.prevent
              ref="Nova_Cena_ref"
              v-model="valid"
              lazy-validation
            >
              <v-row class="justify-center">
                <v-col cols="12" sm="4">
                  <h3 align="center" class="mb-5">
                    <b>Unesite novu cenu</b>
                  </h3>
                  <br />
                  <v-overflow-btn
                    class="my-2"
                    :items="lista_grupa_cena"
                    v-model="Odabrana_grupa_cena"
                    label="Izaberite grupu cena"
                    item-text="naziv_grupe_cena"
                    dense
                  ></v-overflow-btn>
                  <v-text-field
                    v-model="Naziv_usluge"
                    label="Naziv usluge"
                    :rules="Rules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="Opis_usluge"
                    label="Opis usluge"
                    :rules="Rules"
                    required
                  ></v-text-field>
                  <!-- u style ima kako da se skinu strelice sa strane-->
                  <v-text-field
                    v-model.number="Cena"
                    label="Cena u dinarima (primer: '3000')"
                    type="number"
                    required
                  ></v-text-field>

                  <v-row class="mt-3">
                    <v-btn
                      @click="reset_Nova_Cena"
                      color="error"
                      :disabled="this.disabled"
                      >Obriši</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      @click="validate_Nova_Cena"
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
    </v-expand-transition>

    <!-- Nova grupa cena -->
    <v-expand-transition>
      <v-card class="mx-4 my-4" v-if="Nova_Grupa_Cena_boolean" elevation="5">
        <v-toolbar color="blue lighten-2" height="50">
          <v-toolbar-title class="mx-auto">Nova grupa cena</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form
              @submit.prevent
              ref="Nova_Grupa_Cena_ref"
              v-model="valid"
              lazy-validation
            >
              <v-row class="justify-center">
                <v-col cols="12" sm="4">
                  <h3 align="center" class="mb-5">
                    <b>Unesite novu grupu cena</b>
                  </h3>
                  <v-text-field
                    v-model="Nova_Grupa_Cena"
                    label="Nova grupa cena"
                    :rules="Rules"
                    required
                  ></v-text-field>

                  <v-row class="mt-3">
                    <v-btn
                      @click="reset_Nova_Grupa_Cena"
                      color="error"
                      :disabled="this.disabled"
                      >Obriši</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      @click="validate_Nova_Grupa_Cena"
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
    </v-expand-transition>

    <!-- Pregled postojecih cena -->
    <v-expand-transition>
      <v-card
        class="mx-4 my-4 pb-4"
        v-if="Pregled_Postojecih_Cena_boolean"
        elevation="5"
      >
        <v-toolbar color="blue lighten-2" height="50">
          <v-toolbar-title class="mx-auto"
            >Pregled postojećih cena</v-toolbar-title
          >
        </v-toolbar>
        <!--da bi bio prazan prostor -->
        <v-card-text>
          <v-container fluid>
            <v-row class="justify-center"></v-row>
          </v-container>
        </v-card-text>

        <div
          v-for="(grupa, index) in lista_grupa_cena"
          :key="index"
          class="pa-2"
        >
          <v-card class="mx-auto mb-5 pa-0" max-width="600" elevation="10">
            <v-toolbar
              flat
              color="primary lighten-1"
              dark
              dense
              class="pl-0 pr-0"
              height="40"
            >
              <!-- Listanje grupe cena -->
              <v-toolbar-title
                :class="
                  $vuetify.breakpoint.smAndUp
                    ? `headline`
                    : $vuetify.breakpoint.xs
                    ? `body-1`
                    : ``
                "
                >{{ grupa.naziv_grupe_cena }}</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <!-- ikonica za brisanje(delete) grupe cena -->
              <v-btn
                icon
                @click="
                  (potvrda_grupa_cena = true),
                    (item_za_brisanje_grupe = grupa.naziv_grupe_cena)
                "
              >
                <v-icon small size="2">mdi-delete</v-icon>
              </v-btn>
              <!-- import Edit-GrupeCena.vue> ikonica za edit GrupeCena -->
              <import_EditGrupeCena
                v-model="grupa.naziv_grupe_cena"
                :key="index"
                :grupa="grupa"
                :naziv_grupe_cena="grupa.naziv_grupe_cena"
                :index="index"
              ></import_EditGrupeCena>
            </v-toolbar>
            <!-- Listanje usluga -->
            <div v-for="(lista, indexaa) in grupa.dataa" :key="indexaa">
              <v-card-text class="pl-4 pr-2 py-0 align-center d-flex">
                {{ indexaa }}
                <!-- Tooltip-->
                <v-tooltip top xs-5>
                  <template v-slot:activator="{ on }">
                    <v-icon class="ml-2" color="primary" dark v-on="on"
                      >mdi-tooltip-outline</v-icon
                    >
                  </template>
                  <span>{{ lista.Opis_usluge }}</span>
                  <br />
                  <span v-if="$vuetify.breakpoint.xs"
                    >Cena:
                    {{
                      lista.Cena
                        | currency(" Din", 2, {
                          symbolOnLeft: false,
                          decimalSeparator: ",",
                          thousandsSeparator: ".",
                        })
                    }}</span
                  >
                </v-tooltip>
                <v-spacer></v-spacer>
                <span v-if="$vuetify.breakpoint.smAndUp">{{
                  lista.Cena
                    | currency(" Din", 2, {
                      symbolOnLeft: false,
                      decimalSeparator: ",",
                      thousandsSeparator: ".",
                    })
                }}</span>

                <!-- ikonica za brisanje(delete) vrsta usluge tj. cena -->
                <v-btn
                  icon
                  class="mx-2"
                  height="48"
                  width="48"
                  @click="
                    (potvrda_usluga = true),
                      (item_za_brisanje_grupe = grupa.naziv_grupe_cena),
                      (item_za_brisanje_usluge = indexaa)
                  "
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
                <!-- import Edit-Usluga.vue> ikonica za edit Usluga tj. cena -->
                <import_EditUsluga
                  :naziv_grupe_cena="grupa.naziv_grupe_cena"
                  :naziv_usluge="indexaa"
                  :opis_usluge="lista.Opis_usluge"
                  :cena_usluge="lista.Cena"
                ></import_EditUsluga>
              </v-card-text>
              <v-spacer></v-spacer>
            </div>
          </v-card>
        </div>
      </v-card>
    </v-expand-transition>

    <!--Dialog za potvrdu brisanja Grupe Cena DA/NE -->
    <v-dialog v-model="potvrda_grupa_cena" max-width="400px">
      <v-card>
        <v-card-title class="headline font-weight-black justify-center error"
          >Potvrda</v-card-title
        >
        <v-card-text class="font-weight-black mt-5" align="center"
          >Brisanjem grupe cena: "{{ item_za_brisanje_grupe }}", automatski
          brišete i sve cene u okviru te grupe !</v-card-text
        >
        <v-card-text class="font-weight-black" align="center"
          >Da li ste sigurni da zelite da obrišete grupu cena?</v-card-text
        >
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="error" :disabled="this.disabled" @click="ne()"
            >NE</v-btn
          >
          <v-btn
            color="success"
            :loading="this.loading"
            @click="delete_item_grupa_cena(item_za_brisanje_grupe)"
            >DA</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Dialog za potvrdu brisanja Usluga DA/NE -->
    <v-dialog v-model="potvrda_usluga" max-width="400px">
      <v-card>
        <v-card-title class="headline font-weight-black justify-center error"
          >Potvrda</v-card-title
        >
        <v-card-text class="font-weight-black mt-5" align="center"
          >Brisanje usluge: "{{ item_za_brisanje_usluge }}" !</v-card-text
        >
        <v-card-text class="font-weight-black" align="center"
          >Da li ste sigurni da zelite da obrišete uslugu?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" :disabled="this.disabled" @click="ne()"
            >NE</v-btn
          >
          <v-btn
            color="success"
            :loading="this.loading"
            @click="delete_item_usluga(item_za_brisanje_usluge)"
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
    import_EditGrupeCena: () => import("../components/Edit-GrupeCena.vue"),
    import_EditUsluga: () => import("../components/Edit-Usluga.vue"),
  },
  data() {
    return {
      valid: true,
      Nova_Cena_boolean: false,
      Nova_Grupa_Cena_boolean: false,
      Pregled_Postojecih_Cena_boolean: false,
      Odabrana_grupa_cena: "",
      Naziv_usluge: "",
      Opis_usluge: "",
      Cena: "",
      Nova_Grupa_Cena: "",
      potvrda_grupa_cena: false,
      potvrda_usluga: false,
      item_za_brisanje_grupe: "",
      item_za_brisanje_usluge: "",
      Rules: [
        (v) => !!v || "Sva polja moraju biti popunjena",
        (v) =>
          (v && v.length >= 3) ||
          "Naziv grupe cena mora da ima 3 ili više karaktera",
      ],
    };
  },
  computed: {
    ...mapGetters({ lista_grupa_cena: "Lista_grupa_cena" }),

    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
    LoadingDataUslugeCena: {
      get() {
        return this.$store.state.LoadingDataUslugeCena;
      },
    },
  },
  methods: {
    Nova_Cena_method() {
      this.$store.dispatch("Pregled_grupa_cena");

      this.Nova_Grupa_Cena_boolean = false;
      this.Pregled_Postojecih_Cena_boolean = false;
      setTimeout(() => {
        this.Nova_Cena_boolean = !this.Nova_Cena_boolean;
      }, 700);
    },
    Nova_Grupa_Cena_method() {
      this.Nova_Cena_boolean = false;
      this.Pregled_Postojecih_Cena_boolean = false;
      setTimeout(() => {
        this.Nova_Grupa_Cena_boolean = !this.Nova_Grupa_Cena_boolean;
      }, 700);
    },
    Pregled_Postojecih_Cena_method() {
      if (this.Nova_Cena_boolean == true) {
        this.Nova_Cena_boolean = false;
      }
      if (this.Nova_Grupa_Cena_boolean == true) {
        this.Nova_Grupa_Cena_boolean = false;
      }
      this.$store.dispatch("Pregled_grupa_cena").then(() => {
        this.Pregled_Postojecih_Cena_boolean = !this
          .Pregled_Postojecih_Cena_boolean;
      });
    },

    validate_Nova_Cena() {
      this.$refs.Nova_Cena_ref.validate();
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
          .dispatch("Nova_Cena", {
            Odabrana_grupa_cena: this.Odabrana_grupa_cena,
            Naziv_usluge: this.Naziv_usluge,
            Opis_usluge: this.Opis_usluge,
            Cena: this.Cena,
          })
          .then(() => {
            this.reset_Nova_Cena();
            this.Odabrana_grupa_cena = "";
          });
      }
    },
    validate_Nova_Grupa_Cena() {
      this.$refs.Nova_Grupa_Cena_ref.validate();
      if (this.Nova_Grupa_Cena == "" || this.Nova_Grupa_Cena == " ") {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera (this.Rules to odradjuje)
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else {
        this.$store
          .dispatch("Nova_Grupa_Cena", {
            naziv_grupe: this.Nova_Grupa_Cena,
            edit_grupa_cena: false,
          })
          .then(this.reset_Nova_Grupa_Cena());
      }
    },
    reset_Nova_Cena() {
      this.$refs.Nova_Cena_ref.reset();
    },
    reset_Nova_Grupa_Cena() {
      this.$refs.Nova_Grupa_Cena_ref.reset();
    },
    delete_item_grupa_cena(idGrupe) {
      this.$store.state.LoadingButton = true;
      this.$store.state.DisabledButton = true;
      firebase
        .firestore()
        .collection("cenovnik")
        .doc(idGrupe)
        .delete()
        .then(() => {
          this.$store.state.LoadingButton = false;
          this.$store.state.DisabledButton = false;
          this.ne();
          //refreshuje listu posle brisanja
          this.$store.dispatch("Pregled_grupa_cena");
          //salje poruku da je uspesno izbrisana grupa cena
          this.$store.dispatch("Snackbar_Message", {
            boolean: true,
            message: "Uspešno ste obrisali grupu cena",
            color: "orange",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete_item_usluga(nazivUsluge1) {
      this.$store.state.LoadingButton = true;
      this.$store.state.DisabledButton = true;
      var usluga = nazivUsluge1;
      console.log(nazivUsluge1);
      firebase
        .firestore()
        .collection("cenovnik")
        .doc(this.item_za_brisanje_grupe)
        .update({
          [usluga]: firebase.firestore.FieldValue.delete(),
        })
        .then(() => {
          this.$store.state.LoadingButton = false;
          this.$store.state.DisabledButton = false;
          this.ne();
          //refreshuje listu posle brisanja
          this.$store.dispatch("Pregled_grupa_cena");
          //salje poruku da je uspesno izbrisana grupa cena
          this.$store.dispatch("Snackbar_Message", {
            boolean: true,
            message: "Uspešno ste obrisali uslugu",
            color: "orange",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ne() {
      this.potvrda_grupa_cena = false;
      this.potvrda_usluga = false;
    },
  },
};
</script>

<style >
.expand-transition-enter-active {
  transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
}
.expand-transition-leave-active {
  transition: all 0.7s cubic-bezier(1, 0.8, 0.5, 1);
}
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