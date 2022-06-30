<template>
  <!-- Prikaz najcescis pitanja korisnicima-->
  <v-card
    :class="
      $vuetify.breakpoint.smAndUp
        ? `ma-7 mt-9`
        : $vuetify.breakpoint.xs
        ? `ma-3 mt-7`
        : ``
    "
    :style="
      $vuetify.breakpoint.lgAndUp
        ? `max-width: 1200px;  margin-left:auto !important; margin-right:auto !important;`
        : $vuetify.breakpoint.xs
        ? `ma-3 mt-7`
        : ``
    "
    elevation="5"
  >
    <v-col
      cols="12"
      md="12"
      :class="
        $vuetify.breakpoint.smAndUp
          ? `pa-5`
          : $vuetify.breakpoint.xs
          ? `pa-2`
          : ``
      "
    >
      <p
        class="headline font-weight-medium mt-10 mb-10"
        :class="
          $vuetify.breakpoint.smAndUp
            ? `headline`
            : $vuetify.breakpoint.xs
            ? `body-1`
            : ``
        "
        align="center"
      >
        Najčešća pitanja pacijenata:
      </p>
      <!-- v-circular dok ocitava podatke -->
      <div class="text-center mt-12" v-if="LoadingDataNajcescaPitanja">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div
        cols="12"
        md="12"
        v-for="(naj_pitanja, index) in lista_najcescih_pitanja"
        :key="index"
        class="ma-0 pa-0"
      >
        <v-card
          class="mx-auto mb-5"
          max-width="1200"
          v-if="!LoadingDataNajcescaPitanja"
        >
          <v-toolbar
            flat
            color="primary"
            dark
            dense
            :height="
              $vuetify.breakpoint.smAndUp
                ? `45`
                : $vuetify.breakpoint.xs
                ? `30`
                : ``
            "
          >
            <v-toolbar-title
              class="mx-auto"
              :class="
                $vuetify.breakpoint.smAndUp
                  ? `subheading`
                  : $vuetify.breakpoint.xs
                  ? `body-2`
                  : ``
              "
              >{{ naj_pitanja.pitanje }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="naj_pitanja.show = !naj_pitanja.show" class>
              <v-icon>{{
                naj_pitanja.show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-toolbar>

          <v-expand-transition>
            <div v-show="naj_pitanja.show">
              <v-divider></v-divider>
              <v-card-text class="pt-2 pb-0 text-justify primary--text"
                >Pitanje:</v-card-text
              >
              <v-card-text
                class="py-2 text-justify"
                style="text-indent: 20px"
                >{{ naj_pitanja.pitanje }}</v-card-text
              >
              <v-card-text class="pt-2 pb-0 text-justify success--text"
                >Odgovor:</v-card-text
              >
              <v-card-text
                class="py-2 text-justify"
                style="text-indent: 20px"
                >{{ naj_pitanja.odgovor }}</v-card-text
              >
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </v-col>
  </v-card>
</template>
  

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  created() {
    this.$store.dispatch("Pregled_najcescih_pitanja");
  },

  computed: {
    ...mapGetters({ lista_najcescih_pitanja: "Lista_najcescih_pitanja" }),

    LoadingDataNajcescaPitanja: {
      get() {
        return this.$store.state.LoadingDataNajcescaPitanja;
      },
    },
  },
  methods: {
    datumPrerada(month) {
      return this.Meseci[month];
    },
  },
};
</script>

<style>
</style>