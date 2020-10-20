<template>
  <v-container class="pa-2">
    <div
      xl="12"
      style="background: #f0eeeb"
      :class="$vuetify.breakpoint.xs ? `pa-2` : `pa-4`"
    >
      <v-card elevation="18">
        <div class="slider">
          <!--autohideTime***koliko sekunde se vide kontrole na slici  -->
          <vue-flux
            class="flux-caurosel"
            :autohideTime="autohideTime"
            :delay="delay"
            :options="vfOptions"
            :images="vfImages"
            :transitions="vfTransitions"
            ref="slider"
          >
            <template v-slot:preloader>
              <flux-preloader />
            </template>
          </vue-flux>
        </div>
      </v-card>
      <v-container grid-list-xl :class="$vuetify.breakpoint.xs ? `pa-0` : ``">
        <v-layout row wrap justify-center class="mt-8">
          <v-flex
            xs6
            md3
            justify-center
            :class="$vuetify.breakpoint.xs ? `pl-3 pr-1 py-0` : ``"
          >
            <v-card class="mt-6">
              <v-img src="../assets/certificate.jpg" />
              <p class="text-center pa-2">Akreditovana laboratorija</p>
            </v-card>
          </v-flex>
          <v-flex
            xs6
            md3
            justify-center
            :class="$vuetify.breakpoint.xs ? `pr-3 pl-1 py-0` : ``"
          >
            <v-card class="mt-6">
              <v-img src="../assets/microskop.jpg" alt />
              <p class="text-center pa-2">Najsavremenija laboratorija</p>
            </v-card>
          </v-flex>
          <v-flex
            xs6
            md3
            justify-center
            :class="$vuetify.breakpoint.xs ? `pl-3 pr-1 py-0` : ``"
          >
            <v-card class="mt-6">
              <v-img src="../assets/doctors.jpg" alt />
              <p class="text-center pa-2">Profesionalni saveti lekara</p>
            </v-card>
          </v-flex>
          <v-flex
            xs6
            md3
            justify-center
            :class="$vuetify.breakpoint.xs ? `pr-3 pl-1 py-0` : ``"
          >
            <v-card class="mt-6">
              <v-img src="../assets/reward.jpg" alt />
              <p class="text-center pa-2">Labaratorija sa nagradama</p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- LEVA STRANA -->
      <v-container class="ma-0" fluid>
        <v-row class="d-flex ma-0 pa-0">
          <!-- Prikaz ponude korisnicima-->
          <v-col cols="12" md="5" class="pa-0 mr-0">
            <p class="display-1 font-weight-medium mb-10" align="center">
              Obaveštenja:
            </p>
            <div
              cols="12"
              md="6"
              v-for="(obave, index) in lista_obavestenja"
              :key="index"
              class="ma-0 pa-0"
            >
              <!-- getMonth() + 1 ...+1 je zato sto je januar 0(nula)-->
              <v-card class="mx-auto mb-5" max-width="500" elevation="11">
                <v-toolbar height="35" color="primary" dark>
                  <v-toolbar-title class="mx-auto text-subtitle-1">{{
                    obave.naziv
                  }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="obave.show = !obave.show" class>
                    <v-icon small>{{
                      obave.show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-row>
                  <!-- da ne bude zabune getDay() vraca dan u nedelji, getDate()vraca dan u mesecu-->
                  <v-card-subtitle class="ml-3">
                    Objavljeno:
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
          </v-col>

          <!-- linija uspravna izmedju obavestenja i ponude pacijentima-->
          <v-divider
            vertical
            class="mx-10"
            v-if="$vuetify.breakpoint.mdAndUp"
          ></v-divider>

          <!-- DESNA STRANA -->
          <v-col cols="12" md="5" class="pa-5 ml-0 text-center">
            <p
              id="home_id_tag"
              class="display-1 font-weight-medium mb-10 text-center"
              align="center"
            >
              SuperLab svojim pacijentima nudi:
            </p>
            <router-link to="/analiza_urina">
              <p>Analiza urina</p>
            </router-link>
            <router-link to="/vadjenje_krvi">
              <p>Vadjenje krvi</p>
            </router-link>
            <router-link to="/sakupljanje_uzorka_stolice">
              <p>Sakupljanje uzoraka stolice</p>
            </router-link>
            <router-link to="/test_na_intoleranciju">
              <p>Testiranje na intoleranciju</p>
            </router-link>
            <router-link to="/spermogram_i_spermokultura">
              <p>Spermogram i spermokultura</p>
            </router-link>
            <router-link to="/covid_19_testiranje">
              <p>Covid 19 testiranje</p>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Radno vreme za telefone na dnu -->
    <v-container class="hidden-md-and-up ma-0 py-0" fluid>
      <v-row align="center" justify="center" style="background: #1565c0">
        <v-col cols="4" sm="2" class="justify-center d-flex ml-6">
          <v-img src="../assets/SuperLab.png"></v-img>
        </v-col>
        <v-col class="mr-6 pa-0">
          <!-- social networks -->
          <v-card
            class="d-flex justify-center pa-0"
            style="background: white"
            elevation="5"
          >
            <div class="d-flex my-3">
              <div class="ma-0 pr-4" xs6>
                <a
                  href="https://www.facebook.com/igor.k.vasic.9"
                  target="_blank"
                >
                  <v-icon size="35" color="indigo"
                    >fab fa-facebook-square</v-icon
                  >
                </a>
              </div>
              <div class="ma-0 pl-4" xs6>
                <a
                  href="https://www.instagram.com/kirk_zmajeva_kugla/"
                  target="_blank"
                >
                  <v-icon size="35" color="red lighten-3">mdi-instagram</v-icon>
                </a>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-card
            class="d-flex align-center justify-center mx-6 my-3"
            elevation="5"
          >
            <v-layout wrap class justify-center>
              <!-- telefon -->
              <v-flex class="justify-center align-center d-flex" xs2>
                <v-icon size="25">mdi-phone</v-icon>
              </v-flex>
              <v-divider vertical></v-divider>
              <v-flex class="ma-0" xs9>
                <p class="justify-center d-flex ma-1">012/222-222</p>
                <p class="justify-center d-flex ma-1">064/555-555</p>
              </v-flex>

              <!-- radno vreme -->
              <v-flex class="justify-center align-center d-flex" xs2>
                <v-icon size="30">mdi-clock-outline</v-icon>
              </v-flex>
              <v-divider vertical></v-divider>
              <v-flex class="ma-0 pa-0" xs9>
                <p class="justify-center d-flex ma-1 mt-2">
                  Pon-Pet: 07:00-20:00
                </p>
                <p class="justify-center d-flex ma-1">Sub-Ned: 09:00-15:00</p>
              </v-flex>

              <!-- adresa -->
              <v-flex class="justify-center align-center d-flex" xs2>
                <v-icon size="30">mdi-map-marker-radius</v-icon>
              </v-flex>
              <v-divider vertical></v-divider>
              <v-flex class="ma-0" xs9>
                <p class="ma-1 mt-2" style="text-align: center">
                  Trg Bratstva i jedinstva 110
                </p>
                <p class="ma-1" style="text-align: center">
                  12000 Požarevac, Srbija
                </p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-col>
        <!-- Sva prava su zadrzana -->
        <v-col>
          <p class="mx-6" style="text-align: center">
            SuperLab pripadajući logotip je registrovani zaštitni znak kompanije
            SuperLab laboratorije. Sve oznake trećih strana - ® i ™ - vlasništvo
            su njihovih vlasnika.
          </p>
          <p class="mx-6" style="text-align: center">
            © 2020 SuperLab laboratorije. Sva prava zadržana
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
//odlican courasel...ima u demo delu mnogo bas mnogo opcija 2d i 3d github:https://github.com/deulos/vue-flux ... demo:https://deulos.github.io/vue-flux-docs/demos/
//pitanja vezana za picture size https://github.com/deulos/vue-flux/issues/20
import { VueFlux, FluxPreloader } from "vue-flux";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    VueFlux,

    FluxPreloader,
  },
  data() {
    return {
      naziv: "",
      vfOptions: {
        autoplay: true,
      },
      delay: 3000,
      autohideTime: 2500,
      vfImages: [
        require("@/assets/slika-3.jpg"),
        require("@/assets/slika-2.jpg"),
        require("@/assets/slika-12.jpg"),
        require("@/assets/slika-13.jpg"),
      ],
      vfTransitions: ["fade", "swipe", "round2", "blocks2"],

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
    };
  },
  created() {
    this.$store.dispatch("Pregled_obavestenja", 10);
  },
  mounted() {
    this.scrollToAnchor();
  },

  updated() {
    this.scrollToAnchor();
  },

  computed: {
    ...mapGetters({
      lista_obavestenja: "Lista_obavestenja",
    }),
  },
  methods: {
    datumPrerada(month) {
      return this.Meseci[month];
    },
    scrollToAnchor() {
      this.$nextTick(() => {
        if (this.$route.hash) {
          const $el = document.querySelector(this.$route.hash);
          $el && window.scrollTo(0, $el.offsetTop);
        }
      });
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 470px) {
  .flux-caurosel {
    height: 90px;
    position: relative;
    width: 100%;
  }
  @media all and (max-width: 321px) {
    .flux-caurosel {
      height: 80px;
      position: relative;
      width: 100%;
    }
  }
}
@media all and (min-width: 471px) {
  .flux-caurosel {
    height: 120px;
    position: relative;
    width: 100%;
  }
}
@media all and (min-width: 560px) {
  .flux-caurosel {
    height: 140px;
    position: relative;
    width: 100%;
  }
}
@media all and (min-width: 620px) {
  .flux-caurosel {
    height: 170px;
    position: relative;
    width: 100%;
  }
}
@media all and (min-width: 730px) {
  .flux-caurosel {
    height: 210px;
    position: relative;
    width: 100%;
  }
}
@media all and (min-width: 890px) {
  .flux-caurosel {
    height: 270px;
    position: relative;
    width: 100%;
  }
}

.scale-transition-enter-active {
  transition: all 0.3s ease;
}
.scale-transition-leave-active {
  transition: all 0.2s ease;
}
</style>