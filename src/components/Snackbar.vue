<template>
  <div class="snackbar-wrapper text-center ma-2">
    <v-snackbar
      app
      top
      rounded
      absolute
      :timeout="timeout"
      :color="this.$store.state.snackbar_color"
      :value="this.$store.state.snackbarBoolean"
    >
      {{ this.$store.state.snackbar_message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="SnackbarClose()"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeout: 4000,
    };
  },
  mounted() {
    setTimeout(() => this.SnackbarClose(), this.timeout);
  },
  methods: {
    SnackbarClose() {
      let payloadObj = {
        boolean: false,
        message: null,
      };
      this.$store.dispatch("toggleSnackbar_off", payloadObj);
    },
  },
};
</script>

<style scoped>
.snackbar-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 1000;
}
/* @media all and (max-width: 470px) {
  .v-snack__content {
    margin: 0 !important;
    padding: 10px 7px 0px 7px !important;
  }
}
@media all and (min-width: 471px) {
  .v-snack__content {
    margin: 0 !important;
    padding: 10px 10px 10px 30px !important;
  }
}
.snackbar-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 1000;
} */
</style>
