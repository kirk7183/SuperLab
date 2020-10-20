<template>
  <div class="main">
    <div class="intro">
      <v-parallax src="..\assets\slika-10.jpg" height="400">
        <div class="naziv-firme">
          <sequential-entrance fromLeft delay="1000">
            <!-- sve unutar sequential-entrance mora da ima neku klasu, bilo koju da bi radilo -->
            <!-- zato sto za prvu stavku nema delay, ona odmah krene, delay je za drugu, zato sam stavio kao prazano polje da krene prvo -->
            <!-- BITNO !!! stavim paragraf kao lazni prvi text koji nema nista pa onda mora div sa klasom, pa tek onda sta radi tranziciju-->
            <p class="mora-da-ima-klasu-ovo-je-lazni-paragraf"></p>
            <div class="box">
              <!-- TERNARY OPERATOR sa vise parametara stavlja se [] za niz, inace moze i {} koji sluzi za nested ternary operator -->
              <p
                class="black--text font-weight-black"
                :class="[
                  $vuetify.breakpoint.sm ? `display-2` : `display-3`,
                  $vuetify.breakpoint.xs ? `display-1` : `ml-12 pl-12`,
                ]"
              >
                SuperLab
              </p>
            </div>
          </sequential-entrance>
          <sequential-entrance fromBottom delay="2000">
            <p class="mora-da-ima-klasu-ovo-je-lazni-paragraf"></p>
            <div :class="$vuetify.breakpoint.xs ? `` : `ml-12 pl-12`">
              <v-btn
                class="black--text subtitle-1 font-weight-black"
                @click="homePage"
                >Dobrodošli</v-btn
              >
            </div>
          </sequential-entrance>
        </div>
      </v-parallax>
      <!--Vuetify Parallax  !BITNO DA BI PARALLAX RADIO REZOLUCIJA SLIKA MORA DA BUDE OKO 1600 USIRINU. pOGLEDAJ SLIKA-10 ILI 1.JPG-->
      <div>
        <p
          v-scroll-animation-dole-gore-slow
          class="font-weight-medium row wrap justify-center ma-0 pa-5 text-center"
          :class="$vuetify.breakpoint.smAndDown ? `display-1` : `display-2`"
        >
          Stručno i ljubazno osoblje
        </p>
        <v-parallax src="..\assets\2.jpg" height="300"></v-parallax>
        <p
          v-scroll-animation-dole-gore
          class="font-weight-medium row wrap justify-center ma-0 pa-5 text-center"
          :class="$vuetify.breakpoint.smAndDown ? `display-1` : `display-2`"
        >
          Saveti
        </p>
        <v-parallax src="..\assets\3.jpg" height="300"></v-parallax>
        <p
          v-scroll-animation-dole-gore
          class="font-weight-medium row wrap justify-center ma-0 pa-5 text-center"
          :class="$vuetify.breakpoint.smAndDown ? `display-1` : `display-2`"
        >
          Online rezultati
        </p>
        <v-parallax src="..\assets\1.jpg" height="300"></v-parallax>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  components: {},
  data() {
    return {};
  },
  methods: {
    homePage() {
      this.$store.state.Intro = "false";
      this.$router.push("/home");
    },
  },
};
</script>
<style scoped>
.before-enter-dole-gore-slow {
  opacity: 0;
  transform: translateY(100px);
  transition: all 2s ease-out;
  transition-delay: 3s;
}

.enter-dole-gore-slow {
  opacity: 1;
  transform: translateY(0px);
}

.before-enter-dole-gore {
  opacity: 0;
  transform: translateY(100px);
  transition: all 2s ease-out;
  /* transition-delay: 1s; */
}

.enter-dole-gore {
  opacity: 1;
  transform: translateY(0px);
}
</style>
