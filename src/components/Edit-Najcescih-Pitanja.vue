<template>
  <div>
    <v-dialog
      v-model="edit_Najcesca_Pitanja_dialog"
      persistent
      xs12
      sm6
      offset-sm3
      max-width="400px"
    >
      <template v-slot:activator="{ on: editNajcescaPitanja }">
        <v-btn icon class="dugme mr-2" dark v-on="editNajcescaPitanja">
          <v-icon small>far fa-edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="primary lighten-1 headline dugme justify-center text-center"
          style="wrap-text"
        >Izmena najčešćih pitanja</v-card-title>
        <v-card-text xs-12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    name="pitanje"
                    label="Pitanje"
                    id="pitanje"
                    v-model="editedItem.pitanje"
                    :key="editedItem.id"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs-12>
                  <v-textarea
                    name="odgovor"
                    label="Odgovor"
                    id="odogvor"
                    v-model="editedItem.odgovor"
                    :key="editedItem.id"
                    required
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex d-flex xs12>
                  <v-btn
                    color="error"
                    @click="edit_Najcesca_Pitanja_dialog = false"
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
  props: ["naj_pitanja_info"],
  data() {
    return {
      edit_Najcesca_Pitanja_dialog: false,
      editedItem: {},
    };
  },
  created() {
    //automatski pravi ceo array i nazive u njima (ne mora u editedItem da se napravi npr. id: "", naziv: "", text:"" itd)
    this.editedItem = Object.assign({}, this.naj_pitanja_info);
  },
  watch: {
    naj_pitanja_info() {
      return (this.editedItem = Object.assign({}, this.naj_pitanja_info));
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
        .collection("najcesca_pitanja")
        .doc(this.editedItem.id)
        .update({
          pitanje: this.editedItem.pitanje,
          odgovor: this.editedItem.odgovor,
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
            this.edit_Najcesca_Pitanja_dialog = false;
            this.$store.dispatch("Pregled_najcescih_pitanja");
          }, 500);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
  },
};
</script>

<style>
</style>