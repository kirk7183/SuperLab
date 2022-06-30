<template>
  <div>
    <!-- v-circular dok ocitava podatke -->
    <div class="text-center mt-12" v-if="LoadingDataCenovnik">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card
      elevation="5"
      max-width="1100"
      :class="
        $vuetify.breakpoint.smAndUp
          ? `my-10 mx-auto`
          : $vuetify.breakpoint.xs
          ? `my-7 mx-2`
          : ``
      "
      :style="
      $vuetify.breakpoint.lgAndUp
        ? `max-width: 1200px;  margin-left:auto !important; margin-right:auto !important;`
        : $vuetify.breakpoint.xs
        ? ``
        : ``
    "
      v-if="!LoadingDataCenovnik"
    >
      <p
        class="text-center font-weight-medium text-uppercase mb-8 pt-8 display-1"
      >
        cenovnik
      </p>
      <v-container fluid class="ma-0 pa-0">
        <v-row class="d-flex ma-0 pa-0" justify="center">
          <v-col cols="12" md="6" class="py-5 px-0 mr-0">
            <div
              v-for="(grupa, index) in lista_grupa_cena"
              :key="index"
              class="mx-auto"
            >
              <v-card
                class="mb-5 pa-0"
                :class="
                  $vuetify.breakpoint.smAndUp
                    ? ` mx-4`
                    : $vuetify.breakpoint.xs
                    ? ` mx-2`
                    : ``
                "
              >
                <v-toolbar flat color="primary" dark dense class="pl-0 pr-0">
                  <!-- Listanje grupe cena -->
                  <v-toolbar-title class="mr-0 text-capitalize">{{
                    grupa.naziv_grupe_cena
                  }}</v-toolbar-title>
                </v-toolbar>
                <!-- Listanje usluga -->
                <div v-for="(lista, indexaa) in grupa.dataa" :key="indexaa">
                  <v-card-text
                    hide-details
                    class="pl-1 pa-1 pr-2 align-center d-flex"
                  >
                    <!-- hide details sluzi da ispod natpisa skloni detalje tj. treba pogledati mislim da je to kada ima neku gresku onda ispod ispisuje u v-message-->
                    <v-checkbox
                      hide-details
                      class="ma-0 pa-0 text-capitalize font-weight-medium align-center justify-center d-flex"
                      color="success"
                      multiple
                      dense
                      id="indexaa"
                      v-model="selected"
                      :key="indexaa"
                      :label="indexaa"
                      :value="lista"
                      >></v-checkbox
                    >

                    <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon class="ml-2" color="primary" dark v-on="on"
                          >mdi-tooltip-outline</v-icon
                        >
                      </template>
                      <span>Opis: {{ lista.Opis_usluge }}</span>
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
                    <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
                    <p
                      v-if="$vuetify.breakpoint.smAndUp"
                      class="ma-0 font-weight-medium"
                    >
                      {{
                        lista.Cena
                          | currency(" Din", 2, {
                            symbolOnLeft: false,
                            decimalSeparator: ",",
                            thousandsSeparator: ".",
                          })
                      }}
                    </p>
                  </v-card-text>
                  <v-spacer></v-spacer>
                </div>
              </v-card>
            </div>
          </v-col>

          <!-- Ukupno -->
          <v-col cols="12" md="5" class="pt-5 mr-0">
            <v-card id="div_kalkulator">
              <v-toolbar flat color="success" dark dense class="pl-0 pr-0">
                <v-toolbar-title class="text-capitalize d-inline">
                  <p class="ma-0 pa-0">Ukupno:</p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <p class="ma-0 pa-0">
                  {{
                    totalItem
                      | currency(" Din", 2, {
                        symbolOnLeft: false,
                        decimalSeparator: ",",
                        thousandsSeparator: ".",
                      })
                  }}
                </p>
              </v-toolbar>

              <div class="overflow-y-auto pa-1">
                <v-row
                  class="ma-0 pa-0"
                  v-for="(lista1, indexa1) in selected"
                  :key="indexa1"
                >
                  <!--ikonica button close-->
                  <v-icon
                    class="ml-1"
                    id="icon-close"
                    color="black"
                    @click.prevent="icon_close(indexa1)"
                    >mdi-close-box-outline</v-icon
                  >

                  <p
                    class="pa-1 ma-0 align-center d-flex font-weight-medium text-capitalize body-2"
                  >
                    {{ lista1.Naziv_usluge | truncate(15, "...") }}
                  </p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon class="ml-2" color="primary" dark v-on="on"
                        >mdi-tooltip-outline</v-icon
                      >
                    </template>
                    <span>{{ lista1.Opis_usluge }}</span>
                  </v-tooltip>
                  <v-col class="pa-0">
                    <p class="pa-1 ma-0 text-right font-weight-medium body-2">
                      {{
                        lista1.Cena
                          | currency(" Din", 2, {
                            symbolOnLeft: false,
                            decimalSeparator: ",",
                            thousandsSeparator: ".",
                          })
                      }}
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: [],
      index1: "",
      checkboxState: false,
    };
  },
  created() {
    this.$store.dispatch("Pregled_grupa_cena");
  },
  computed: {
    ...mapGetters({ lista_grupa_cena: "Lista_grupa_cena" }),

    SmanjiNaziv(naziv) {
      return console.log(naziv);
    },

    LoadingDataCenovnik: {
      get() {
        return this.$store.state.LoadingDataCenovnik;
      },
    },

    totalItem: function () {
      let sum = 0;
      for (let i = 0; i < this.selected.length; i++) {
        sum += parseFloat(this.selected[i].Cena);
      }
      return sum;
    },
    // NE BRISATI OVO
    //  parseFloat(this.selected[i].Cena); - pretvaranje u float moze i parseInt
    //  this.current = `${parseInt(this.selected[i].Cena)+ parseInt(this.selected[i].Kolicina)}`   - znaci pretvori ga u int, zatim
    //  saberi i onda castuj u String  uz pomoc .... `${}  ...sve unutar viticaste zagrade se castuje u String
    //
    //  primer za... For
    // computed: {
    //   totalItem: function(){
    //       let sum = 0;
    //       for(let i = 0; i < this.items.length; i++){
    //         sum += (parseFloat(this.items[i].price) * parseFloat(this.items[i].quantity));
    //       }

    //      return sum;
    //    }
    // }
    // primer za... ForEach
    //   computed: {
    //     totalItem: function(){
    //       let sum = 0;
    //       this.items.forEach(function(item) {
    //          sum += (parseFloat(item.price) * parseFloat(item.quantity));
    //       });

    //      return sum;
    //    }
    // }
  },
  methods: {
    icon_close(DeleteValue) {
      this.selected.splice(DeleteValue, 1);
    },
  },
};
</script>

<style scoped>
#div_kalkulator {
  position: sticky;
  top: 30px;
}

#icon-close:hover {
  color: red !important;
  cursor: pointer;
}
/* da nema crni kruzic ili kvadratic posle klika */
.v-icon.v-icon::after {
  border-radius: none !important;
  background-color: white !important;
}
</style>
