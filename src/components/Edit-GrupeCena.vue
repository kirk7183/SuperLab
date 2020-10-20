<template>
  <div>
    <v-dialog v-model="edit_GrupeCena_dialog" persistent xs12 sm6 offset-sm3 max-width="400px">
      <template v-slot:activator="{ on: Ukljuci }">
        <v-btn icon dark height="48" width="48" class="pl-4" v-on="Ukljuci" @click="refresh()">
          <v-icon small>far fa-edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="primary lighten-1 headline dugme justify-center"
        >Izmena naziva grupe cena</v-card-title>
        <v-card-text xs-12 sm6 offset-sm3>
          <v-container>
            <!-- lazy-validation -->
            <v-form @submit.prevent ref="Edit_Grupa_Cena_ref" v-model="valid" lazy-validation>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    :rules="Rules"
                    label="Naziv grupe cena"
                    type="text"
                    v-model="edited_grupa.naziv_grupe_cena"
                    :key="index"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex d-flex xs12>
                  <v-btn
                    @click="edit_GrupeCena_dialog = false"
                    :disabled="disabled"
                    color="error"
                  >Nazad</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="pa-2"
                    @click="validate_Edit_Grupa_Cena"
                    :loading="loading"
                    color="success"
                  >Snimi izmene</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: ["grupa", "index"],
  data: () => ({
    valid: true,
    edit_GrupeCena_dialog: false,
    Rules: [
      (v) => !!v || "Sva polja moraju biti popunjena",
      (v) =>
        (v && v.length >= 3) ||
        "Naziv grupe cena mora da ima vise od 3 karaktera",
    ],
    edited_grupa: [],
  }),
  created() {
    this.edited_grupa = Object.assign({}, this.grupa);
  },

  computed: {
    disabled: function () {
      return this.$store.state.DisabledButton;
    },
    loading: function () {
      return this.$store.state.LoadingButton;
    },
  },
  methods: {
    refresh() {
      this.edited_grupa = Object.assign({}, this.grupa);
    },
    validate_Edit_Grupa_Cena() {
      this.$refs.Edit_Grupa_Cena_ref.validate();

      if (
        this.edited_grupa.naziv_grupe_cena == "" ||
        this.edited_grupa.naziv_grupe_cena == " "
      ) {
        //ceka se da VALIDATE odradi svoje tj. da kaze da sva polja moraju biti popunjena ili da imaju vise od 3 karaktera (this.Rules to odradjuje)
        this.$store.dispatch("Snackbar_Message", {
          boolean: true,
          message: "Proverite da li ste uneli pravilno sve podatke",
          color: "error",
        });
      } else {
        //PROLAZ KROZ PETLJU U METHOD
        // for (const nesto in this.edited_grupa.dataa) {
        // Naziv_usluge: nesto
        // Opis_usluge: this.edited_grupa.dataa[nesto].Opis_usluge,
        // Cena: this.edited_grupa.dataa[nesto].Cena}
        this.$store
          .dispatch("Edit_Grupe_Cena", {
            nova_grupa_cena: this.edited_grupa.naziv_grupe_cena,
            naziv_grupe1: this.grupa.naziv_grupe_cena,
          })
          .then(() => {
            setTimeout(() => {
              this.edit_GrupeCena_dialog = false;
            }, 1000);
          });
      }
    },
  },
};
</script>

<style>
</style>