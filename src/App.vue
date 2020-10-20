<template>
  <v-app>
    <router-view name="glavni_router"></router-view>
    <!-- <intro v-if="this.$store.state.Intro === true" /> -->
    <!-- <intro v-if="this.$route.matched.some(({ name }) => name === '/')" />-->
    <!-- <intro v-if="checking_1" /> -->
    <v-main v-if="!checking_2">
      <navbar />
      <!-- OVAKO SE CUVA CACHE ZA SVAKU STRANU POSEBNO CAK I AKO IMA PARAMETAR NPR. /anime/:id -->
      <!-- Max 10 sam stavio zato sto toliko ima route -->
      <!-- <keep-alive :max="10">
        <router-view name="a" :key="$route.fullPath"></router-view>
      </keep-alive> -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <!-- :key="$route.fullPath"
      v-else-if="checking_2" -->

    <footerMoj />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Intro from "./components/Intro.vue";
import FooterMoj from "./components/FooterMoj.vue";
export default {
  name: "App",

  components: {
    // Intro,
    Navbar,
    FooterMoj,
  },

  data: () => ({
    //
    a: "",
  }),
  computed: {
    // checking() {
    //   let check;
    //   if (this.$route.path == "/") {
    //     // this.$router.push("/home");
    //     check = true;
    //   } else if (this.$route.path == "*") {
    //     check = true;
    //   }
    //   return check;
    // },
    // checking_1() {
    //   let check = false;
    //   if (this.$route.path == "/") {
    //     check = true;
    //   }
    //   return check;
    // },
    checking_2() {
      let check = false;
      if (this.$route.path == "/") {
        check = true;
      }
      return check;
    },
    // checking_3() {
    //   let check = false;
    //   if (this.$route.path == "*") {
    //     check = true;
    //   }
    //   return check;
    // },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
