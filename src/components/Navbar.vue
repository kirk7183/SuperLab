<template>
  <div class="primary">
    <v-container class="ma-0 py-0" fluid>
      <v-row class="d-flex" align="center" justify="center">
        <!--960px and more-->
        <v-col cols="1" class="pa-0 mr-5 my-3 hidden-sm-and-down">
          <v-img
            src="../assets/SuperLab.png"
            @click="goToHome()"
            :style="{ cursor: 'pointer', maxWidth: '50px;' }"
          ></v-img>
        </v-col>
        <v-col cols="3" class="my-1 hidden-md-and-up">
          <v-img class="Picture hidden-md-and-up"
            src="../assets/SuperLab.png"
            @click="goToHome()"
            :style="{ cursor: 'pointer', width: '80%' }"
          ></v-img>
        </v-col>
        <span class="hidden-sm-and-down">
          <v-card class="d-flex align-center pa-1 mb-0">
            <!-- telefon -->
            <v-flex class="mx-2">
              <v-icon size="35">mdi-phone</v-icon>
            </v-flex>
            <!-- align-center-->
            <v-flex class="textaa ma-2 mr-4">
              <p>012/222-222</p>
              <p>064/555-555</p>
            </v-flex>
            <v-spacer></v-spacer>
            <!-- radno vreme -->
            <v-flex class="mx-2">
              <v-icon size="35">mdi-clock-outline</v-icon>
            </v-flex>
            <div class="textaa ma-2 mr-4">
              <p>Pon - Pet: 07:00 - 20:00</p>
              <p>Sub - Ned: 09:00 - 15:00</p>
            </div>
            <!-- adresa -->
            <v-flex class="mx-2">
              <v-icon size="35">mdi-map-marker-radius</v-icon>
            </v-flex>
            <div class="textaa ma-2 mr-2">
              <p>Trg Bratstva i jedinstva 110</p>
              <p>12000 Požarevac, Srbija</p>
            </div>
            <!-- social networks -->
            <div class="d-flex">
              <div class="social ml-5 mt-1 mr-2">
                <a href="https://www.facebook.com/igor.k.vasic.9"
                  target="_blank"
                >
                  <v-icon size="35" color="indigo"
                    >fab fa-facebook-square</v-icon
                  >
                </a>
              </div>
              <div class="social ml-2 mt-1 mr-2">
                <a href="https://www.instagram.com/kirk_zmajeva_kugla/"
                  target="_blank"
                >
                  <v-icon size="35" color="red lighten-3">mdi-instagram</v-icon>
                </a>
              </div>
            </div>
          </v-card>
        </span>
      </v-row>
    </v-container>

    <v-app-bar>
      <!-- Mobile Hamburger meni - za desktop je skroz dole gde je extention za tabove pise: Meni kao i desktop meni (tabs)-->
      <v-menu offset-y transition="scale-transition" z-index="101">
        <template center v-slot:activator="{ on }">
          <!--ikonica hamburger meni-->
          <v-icon v-on="on" size="35" color="primary" class="hidden-md-and-up"
            >mdi-menu</v-icon
          >
        </template>

        <!--unutrasnjost hamburger menija za mobilni-->
        <v-scale-transition>
          <v-list>
            <v-list-item-group v-model="active_tab" color="primary">
              <!-- ispis u hamburger meniju i odmah link do stranice uz pomoc ":to="" "-->
              <v-list-item v-for="tab in tabs" :key="tab.id" :to="tab.path">
                <v-list-item-content>
                  <!--mobile ispis onoga sto je na monitorima "tab"-->
                  <!-- @click="OpenOnlineRezultatiDialog(tab.id)" -->
                  <v-list-item-title exact>{{ tab.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-scale-transition>
      </v-menu>

      <v-spacer></v-spacer>

      <!--NAPREDNE OPCIJE za mobilne tj hamburger meni za monitore koji se pojavljuju kada se neko loguje-->
      <v-menu offset-y transition="scale-transition" z-index="101">
        <template center v-slot:activator="{ on }">
          <!--desktop hamburger meni -->
          <v-btn
            icon
            v-on="on"
            v-show="IsLoggedIn"
            class="hidden-sm-and-down mr-2"
          >
            <v-icon size="35" color="primary">mdi-menu</v-icon>
          </v-btn>
          <!--mobile dugme "napredne opcije"-->
          <v-btn
            offset-y
            v-on="on"
            v-show="IsLoggedIn"
            class="hidden-md-and-up primary"
            >Napredne opcije</v-btn
          >
        </template>
        <!--unutrasnje opcije hamburgera za monitore tj naprednih opcija za telefone-->
        <v-list>
          <v-list-item-group v-model="tabsAuth.id" color="primary">
            <v-list-item
              v-for="(tabAuth, index) in tabsAuth"
              :key="tabAuth.id"
              exact
              @click="OpenOnlineRezultatiDialog(index + 1)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ tabAuth.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <!--prikaz e-maila logovanog korisnika-->
      <span v-if="IsLoggedIn & $vuetify.breakpoint.mdAndUp">
        <v-flex
          xs12
          text-xs-center
          align-center
          class="justify-center px-2 mr-3"
          >{{ PodaciKorisnika.UserData.email }}</v-flex
        >
      </span>
      <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

      <!--Import components-->
      <login class="mr-0 pa-0" />
      <register v-show="!IsLoggedIn" class="mr-0 pa-0" />

      <!-- Meni -->
      <!--desktop meni (tabs)-->
      <template v-slot:extension v-if="$vuetify.breakpoint.mdAndUp">
        <v-tabs v-model="active_tab" centered wrap>
          <v-tab to="/home">Početna</v-tab>
          <v-tab to="/najcescaPitanja">Najčešća pitanja</v-tab>
          <v-tab to="/onlineRezultati">Online rezultati</v-tab>
          <v-tab to="/cenovnik">Cenovnik</v-tab>
          <v-tab to="/about">O nama</v-tab>
        </v-tabs>
      </template>

      <!--mobile meni (tabs) je gore na pocetku...to je hamburger meni-->
    </v-app-bar>
    <!--import componenti-->
    <!-- <OnlineRezultati-dialog v-if="this.$store.state.OnlineRezultati" /> -->
    <Snackbar v-if="this.$store.state.snackbarBoolean" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import router from "@/router";
export default {
  name: "Navbar",
  components: {
    Login: () => import("./Login.vue"),
    Register: () => import("./Register.vue"),
    // OnlineRezultatiDialog: () => import("./OnlineRezultati-dialog.vue"),
    Snackbar: () => import("./Snackbar.vue"),
  },
  data() {
    return {
      active_tab: 0, //ide od 0 do 3 brojanje taba
      tabs: [
        { id: 1, name: "Početna", path: "/home" },
        {
          id: 2,
          name: "Najčešća pitanja",
          path: "/najcescaPitanja",
        },
        {
          id: 3,
          name: "Online rezultati",
          path: "/onlineRezultati",
        },
        { id: 4, name: "Cenovnik", path: "/cenovnik" },
        { id: 5, name: "O nama", path: "/about" },
      ],
      tabsAuth: [
        { id: 6, name: "Korisnički panel", path: "/korisnickiPanel" },
        { id: 7, name: "Rezultati", path: "/unosRezultata" },
        { id: 8, name: "Obaveštenja", path: "/unosObavestenja" },
        { id: 9, name: "Usluge i cene", path: "/uslugeCene" },
        { id: 10, name: "Najčešćca pitanja", path: "unosNajcescaPitanja" },
      ],
    };
  },
  //Kada se refresh strana provera da li je korisnik neki vec logovan, ako jeste onda stavi da je true
  beforeCreate: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var UserData = firebase.auth().currentUser;
        this.IsLoggedIn = UserData;
      }
    });
  },

  computed: {
    PodaciKorisnika: {
      get() {
        return this.$store.getters.PodaciKorisnika;
      },
    },
    IsLoggedIn: {
      get() {
        return this.$store.getters.IsLoggedIn;
      },
      set(newValue) {
        return this.$store.dispatch("setIsLoggedIn", newValue); //ako je neko logovan posalji da je TRUE
      },
    },
  },

  methods: {
    OpenOnlineRezultatiDialog(idTab) {
      if (idTab == 1) {
        router.replace("/korisnickiPanel");
      } else if (idTab == 2) {
        router.replace("/unosRezultata");
      } else if (idTab == 3) {
        router.replace("/UnosObavestenja");
      } else if (idTab == 4) {
        router.replace("/uslugeCene");
      } else if (idTab == 5) {
        router.replace("/unosNajcescaPitanja");
      }
    },
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style scoped>
div.textaa > p {
  margin: 0px !important;
}
.scale-transition-enter-active {
  transition: all 0.3s ease;
}
.scale-transition-leave-active {
  transition: all 0.2s ease;
}
.social a {
  text-decoration: none;
}
.social:hover {
  opacity: 0.6;
}
</style>
