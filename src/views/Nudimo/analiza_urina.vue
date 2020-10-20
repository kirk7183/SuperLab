<template>
  <v-card
    :class="
      $vuetify.breakpoint.smAndUp
        ? `ma-12`
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
          ? `pa-7`
          : $vuetify.breakpoint.xs
          ? `pa-3`
          : ``
      "
    >
      <p
        class="headline font-weight-medium my-10"
        :class="
          $vuetify.breakpoint.smAndUp
            ? `headline`
            : $vuetify.breakpoint.xs
            ? `body-1`
            : ``
        "
        align="center"
      >
        Analiza urina
      </p>
      <p
        class="text-justify text-body-2 text-sm-body-1"
        :style="
          $vuetify.breakpoint.smAndUp
            ? `text-indent: 50px;`
            : `text-indent: 20px;`
        "
      >
        <img
          :src="require('@/assets/posuda.jpg')"
          alt="avatar"
          width="150"
          class="d-flex justify-center align-center float-left"
        />
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        sollicitudin quam lacus, vel porttitor augue fringilla in. Suspendisse
        non mi in urna interdum porttitor vitae non nulla. Sed egestas in libero
        iaculis ultricies. Nullam congue sem sed neque condimentum maximus.
        Donec nec sagittis eros. Sed quis magna eleifend, ornare sem rhoncus,
        venenatis libero. Phasellus mollis eros a libero inia pulvinar. Mauris
        laoreet lacus urna, eu pharetra mauris bibendum pharetra. Morbi a enim
        ut lorem tempus sagittis. Donec ex ipsum, varius eleifend placerat
        dictum, rutrum ut ipsum. Aenean mollis id metus et dapibus. Morbi sapien
        mi, ullamcorper ac metus ac, volutpat porttitor nisl. Nulla quis
        sollicitudin purus. Nam ac elementum diam. Mauris et rhoncus nunc. Etiam
        vitae est id metus ullamcorper vestibulum. Ut pretium tempor convallis.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
        fringilla massa, a luctus odio. Suspendisse eu luctus ante. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Phasellus placerat urna a massa suscipit viverra. Nunc sit amet
        cursus nisi. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Morbi vel augue varius, dictum ipsum at,
        gravida ipsum. Suspendisse lacus dui, sagittis eget risus quis, posuere
        aliquam ante. Cras imperdiet dictum neque at facilisis..."
      </p>
      <v-col class="text-right">
        <!-- VAZNO !!! da bi scroll i anchor radili u home mora da postoji method, update i mounted 'scrollToAnchor'-->
        <v-btn
          :small="$vuetify.breakpoint.xs"
          @click="$router.push({ path: '/home', hash: '#home_id_tag' })"
          >Nazad
        </v-btn>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
</style>