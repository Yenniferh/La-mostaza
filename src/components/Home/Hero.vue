<template>
  <v-container
    id="inicio"
    fluid
    class="hero--container white--text fill-height mt-4 pa-0"
  >
    <v-row no-gutters :class="this.$vuetify.breakpoint.xsOnly && 'py-6'">
      <v-col cols="12" xs="12">
        <v-img :src="img" :lazy-src="imgLazy" aspect-ratio="1.7">
          <v-container class="hero--gradient fill-height pa-0 ma-0">
            <v-row align="center" class="ml-8" no-gutters>
              <v-col cols="12" xs="12" sm="6">
                <h1 class="display-4 text-capitalize primary--text">
                  La mostaza
                </h1>
                <p class="headline my-4">
                  Sabores que cautivan el paladar.
                  <br />Recetas únicas que enamoran. <br />Querrás volver.
                </p>
                <router-link to="/home" v-scroll-to="`#menu`">
                  <v-btn color="primary mb-4" large>Ver menú</v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import imgChef from '@/assets/images/chef.jpg';
import imgChefLazy from '@/assets/images/chef-min.jpg';
export default {
  name: 'Hero',
  data: () => ({
    img: imgChef,
    imgLazy: imgChefLazy,
  }),
};
</script>
