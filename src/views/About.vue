<template>
  <v-container fluid class="ma-0">
    <v-row class="d-flex ma-0 pa-0" justify="center">
      <v-col cols="12" md="12" class="py-4 px-0 mr-0">
        <v-card elevation="11" max-width="1200" class="pa-5 mx-auto">
          <p class="pa-7 pb-1 ma-0 headline font-weight-black">
            O NAMA - lorem ipsum text
          </p>
          <v-divider id="divider1" class="pb-5 mx-7"></v-divider>
          <!-- -TERNARY OPERATOR-->
          <v-row>
            <!-- Nas tim - Slike -->
            <v-col cols="12" md="5" class="px-5 text-justify">
              <p class="text-center title mb-7">Naš tim čine:</p>
              <span v-for="(pojedinac, index) in tim" :key="index">
                <v-row align="center" justify="center">
                  <img
                    :src="pojedinac.img"
                    alt="avatar"
                    width="100"
                    class="d-flex justify-center align-center mt-5"
                  />
                </v-row>
                <p class="text-center mt-3">{{ pojedinac.titula_i_ime }}</p>
                <p>{{ pojedinac.biografija }}</p>
              </span>
            </v-col>

            <!-- Timeline -->
            <v-col
              cols="12"
              md="7"
              :class="$vuetify.breakpoint.smAndUp ? `text-justify` : ``"
              class="pt-10 px-5"
            >
              <v-timeline
                :dense="
                  true ? $vuetify.breakpoint.xs : $vuetify.breakpoint.smAndUp
                "
                :align-top="
                  true ? $vuetify.breakpoint.xs : $vuetify.breakpoint.smAndUp
                "
              >
                <v-timeline-item
                  :right="
                    true ? $vuetify.breakpoint.xs : $vuetify.breakpoint.smAndUp
                  "
                  v-for="(year, i) in years"
                  :key="i"
                  :color="year.color"
                  small
                  class="ma-0"
                  :class="$vuetify.breakpoint.xs ? `pb-5` : `pb-3`"
                >
                  <template v-slot:opposite>
                    <span
                      :class="`headline font-weight-bold ${year.color}--text`"
                      v-text="year.year + '.'"
                    ></span>
                  </template>
                  <div class>
                    <!--za mobilne telefone da pokaze godinu iznad naziva-->
                    <span
                      v-if="$vuetify.breakpoint.xs"
                      :class="`headline font-weight-bold ${year.color}--text`"
                      v-text="year.year + '.'"
                    ></span>
                    <!-- kraj -->
                    <!-- TERNARY OPERATOR sa vise parametara stavlja se [] za niz, inace moze i {} koji sluzi za nested ternary operator -->
                    <!-- `headline font-weight-light ${year.color}--text` znaci u svakom slucaju ti odradi ovo ne vezano za uslov-->
                    <h2
                      :class="[
                        $vuetify.breakpoint.xs ? `mb-1` : `mb-5`,
                        `headline font-weight-light ${year.color}--text`,
                      ]"
                      v-text="year.naslov"
                    ></h2>
                    <p :class="`subheading mb-4`" v-text="year.text"></p>
                  </div>
                </v-timeline-item>
              </v-timeline>
              <!-- TEXT -->
            </v-col>
            <v-col class="pa-5 text-justify">
              <br />
              <b class="pl-7">Lorem</b>
              <p class="d-inline">{{ pasus1 }}</p>
              <br />
              <br />
              <b class="pl-7">Nullam</b>
              <p class="d-inline">{{ pasus2 }}</p>
              <br />
              <br />
              <b class="pl-7">Fusce</b>
              <p class="d-inline">{{ pasus3 }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      pasus1:
        " ipsum dolor sit amet, consectetur adipiscing elit. Cras in finibus urna. Donec ut velit sit amet dui scelerisque feugiat quis iaculis orci. Nam orci metus, venenatis a rutrum ac, consequat in leo. Nullam sollicitudin lectus sit amet cursus sollicitudin. Fusce fermentum condimentum scelerisque. Vivamus placerat non orci eu maximus. Aliquam a tortor nec est tristique pharetra. Praesent porttitor quis nisl ac rhoncus. Aliquam vel viverra mi. Cras quis euismod purus. Mauris dolor dolor, feugiat in elementum ut, imperdiet nec urna.",
      pasus2:
        " sed posuere neque, quis rutrum mi. Proin sollicitudin, elit eget dictum fringilla, neque nisi convallis metus, sit amet accumsan urna ante nec justo. Pellentesque sit amet auctor lectus, nec dapibus nibh. Aliquam quis orci lacus. Quisque sit amet fermentum leo. Proin vel fringilla arcu. Aenean elementum aliquam lacus sed tempus. Nunc quis hendrerit nisl. Mauris sit amet augue scelerisque nisi euismod mollis. Suspendisse convallis mauris id dolor laoreet dictum. Ut nunc diam, varius imperdiet rhoncus ac, tincidunt quis diam.",
      pasus3:
        " convallis posuere orci, non commodo erat iaculis ut. Praesent finibus vestibulum sem, tincidunt aliquet dui tincidunt in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin malesuada a arcu a consequat. Vivamus nec tristique ante. Curabitur facilisis blandit congue. Integer accumsan purus elit, et pharetra enim varius et. Pellentesque a massa ultrices, tincidunt felis eget, tincidunt risus.",
      years: [
        {
          naslov: "SuperLab",
          color: "cyan",
          year: "1995",
          text:
            "je privatna akreditovana laboratorija u Požarevcu. Uspešno radi od 1995. godine i pruža kvalitetnu uslugu iz različitih oblasti laboratorijske dijagnostike: biohemije, mikrobiologije, patohistologije, citologije... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in finibus urna. Donec ut velit sit amet dui scelerisque feugiat quis iaculis orci. ",
        },
        {
          naslov: "Laboratorija",
          color: "green",
          year: "1998",
          text:
            "dobijata nagradu za labaratoriju godine zahvaljujuci stručnosti naših lekara koji redovno idu na usavršavanja... Nullam sed posuere neque, quis rutrum mi. Proin sollicitudin, elit eget dictum fringilla, neque nisi convallis metus, sit amet accumsan urna ante nec justo. ",
        },
        {
          naslov: "Kupujemo",
          color: "pink",
          year: "2002",
          text:
            "najsavremeniju laboratorijsku opremu. Sva ispitivanja od tada pa do danas izvode se na automatizovanim hematološkim, biohemijskim i imunohemijskim analizatorima... Lorem ipsum tincidunt aliquet dui tincidunt in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; ",
        },
        {
          naslov: "Kvalitet",
          color: "orange",
          year: "2007",
          text:
            "usluga doveo je do proširenja naših kapaciteta gde zaposljavamo jos 12 doktora... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in finibus urna. Donec ut velit sit amet dui scelerisque feugiat quis iaculis orci. Nam orci metus, venenatis a rutrum ac, consequat in leo.",
        },
        {
          naslov: "Otvaramo",
          color: "red",
          year: "2012",
          text:
            "novu labaratoriju u Smederevu. Opremili smo je najnovijim .... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in finibus urna. Donec ut velit sit amet dui scelerisque feugiat quis iaculis orci. Nam orci metus, venenatis a rutrum ac, consequat in leo.",
        },
      ],
      tim: [
        {
          img: require("../assets/avatar.png"),
          titula_i_ime: "mr sci. Pera Perić",
          biografija:
            "Rodjen 1975. u Beogradu. Studirao na ...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          img: require("../assets/avatar.png"),
          titula_i_ime: "mr dr Jovan Jovanović",
          biografija:
            "Rodjen 1969. u Novom Sadu. Studirao na ...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          img: require("../assets/avatar.png"),
          titula_i_ime: "dr Stevan Stevanović",
          biografija:
            "Rodjen 1971. u Smederevu. Studirao na ...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          img: require("../assets/avatar.png"),
          titula_i_ime: "prim. mr sci. Goran Goranović",
          biografija:
            "Rodjen 1975. u Obrenovcu. Studirao na ...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
      ],
    };
  },
};
</script>
<style scoped>
#divider1 {
  border-color: red !important;
}
</style>