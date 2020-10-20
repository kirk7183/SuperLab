<template>
  <v-container class="pa-5" fluid>
    <v-layout row align-center>
      <v-flex class="align-item:center; justify-content:center">
        <h1 style="text-align: center">
          Stranica koju želite da posetite ne postoji !!!
        </h1>
        <h4 class="text-center">
          Molimo vas vratite se na početnu stranicu i koristite meni za
          navigaciju
        </h4>
        <div class="text-center" style="margin-top: 30px">
          <!-- router da vrati predhodnu stranicu kao prikaz (previous page)-->
          <!-- <v-btn @click="$router.go(-1)">Back</v-btn>-->
          <v-btn @click="$router.replace({ name: 'Home' })"
            >početna strana</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>