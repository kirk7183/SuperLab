<template>
  <div>
    <v-dialog v-model="edit_Obavestenja_dialog" persistent xs12 sm6 offset-sm3 max-width="400px">
      <template v-slot:activator="{ on: editObavestenja }">
        <v-btn icon class="dugme mr-2" dark v-on="editObavestenja">
          <v-icon small>far fa-edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="primary lighten-1 headline dugme justify-center">Izmena obaveštenja</v-card-title>
        <v-card-text xs-12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    name="naziv"
                    label="Naziv"
                    id="naziv"
                    v-model="editedItem.naziv"
                    :key="editedItem.id"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    name="datum"
                    label="Datum"
                    id="datum"
                    :value="editedItem.datum.toDate().getDate() +' / '+ datumPrerada(this.editedItem.datum.toDate().getMonth()) +' / '+ editedItem.datum.toDate().getFullYear()"
                    :key="editedItem.id"
                    type="text"
                    disabled
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-textarea
                    name="text"
                    label="Text"
                    id="text"
                    v-model="editedItem.text"
                    :key="editedItem.id"
                    required
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex d-flex xs12>
                  <v-btn
                    color="error"
                    @click="edit_Obavestenja_dialog = false"
                    :disabled="this.disabled"
                  >Nazad</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="pa-2"
                    type="submit"
                    @click="onEditSave() "
                    :loading="this.loading"
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
import firebase from "firebase/app";
export default {
  props: ["obave_info", "broj"],
  data() {
    return {
      obave_info_edit: [],
      edit_Obavestenja_dialog: false,
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
      editedItem: {
        // id: "",
        // naziv: "",
        // text: ""
      },
    };
  },
  created() {
    //automatski pravi ceo array i nazive u njima (ne mora u editedItem da se napravi npr. id: "", naziv: "", text:"" itd)
    this.editedItem = Object.assign({}, this.obave_info);
  },
  watch: {
    obave_info() {
      return (this.editedItem = Object.assign({}, this.obave_info));
    },
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
    onEditSave() {
      this.$store.state.LoadingButton = true;
      this.$store.state.DisabledButton = true;
      firebase
        .firestore()
        .collection("obavestenja")
        .doc(this.editedItem.id)
        .update({
          naziv: this.editedItem.naziv,
          text: this.editedItem.text,
        })
        .then(() => {
          setTimeout(() => {
            this.$store.state.LoadingButton = false;
            this.$store.state.DisabledButton = false;
            this.$store.dispatch("Snackbar_Message", {
              boolean: true,
              message: "Uspešno ste promenili podatak",
              color: "success",
            });
            this.$store.dispatch("Pregled_obavestenja", this.broj);
            this.edit_Obavestenja_dialog = false;
          }, 500);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
    datumPrerada(month) {
      return this.Meseci[month];
    },
  },
};
</script>

<style>
</style>