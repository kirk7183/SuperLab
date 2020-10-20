<template>
  <!-- Stari dialog - nije koriscen u programu vise-->
  <!-- <v-dialog v-model="dialog" persistent xs12 sm6 offset-sm3 max-width="400px"> -->
    <!-- <v-card>
      <div class="text-center pt-4 title">
        Online rezultati
        <p>- jos nije podeseno-</p>
      </div>
      <v-card-text xs12 sm6 offset-sm3>
        <v-container>
          <form @submit.prevent="onSignup">
            <v-layout row>
              <v-flex xs-12>
                <v-text-field
                  name="email"
                  label="Molimo Vas unesite broj koji ste dobili"
                  id="email"
                  v-model="email"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex d-flex xs12>
                <v-btn type="submit">Unesi</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="OpenOnlineRezultatiDialog">Nazad</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {},
  methods: {
    OpenOnlineRezultatiDialog() {
      this.$store.dispatch("PromeniStanjeOnlineRezultati", false);
    },
  },
};
</script>

<style>
</style> -->