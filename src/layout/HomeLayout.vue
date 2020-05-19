<template>
  <v-app>
    <v-appBar app color="white" dark absolute>
      <div class="d-flex align-center">
        <v-img
          alt="Logo de La Mostaza"
          class="shrink mr-2"
          contain
          :src="require('../assets/images/Logo.svg')"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer />
      <router-link
        v-for="(link, i) in links"
        :key="i"
        to="/home"
        v-scroll-to="link.href"
        class="my-2 text-dec"
      >
        <v-btn color="accent" text rounded>{{ link.text }}</v-btn>
      </router-link>

      <v-btn class="ml-4" color="primary" active-class="darken-1" :to="{ name: 'Login' }">
        <span class="mr-2 font-weight-bold">Panel de empleados</span>
        <v-icon>mdi-account-tie</v-icon>
      </v-btn>
    </v-appBar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer color="primary" padless>
      <v-row justify="center">
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Mostaza</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",

  data: () => ({
    links: [
      {
        text: "Inicio",
        href: `#inicio`
      },
      {
        text: "Quiénes Somos",
        href: `#who`
      },
      {
        text: "Menú",
        href: `#menu`
      },
      {
        text: "Contáctanos",
        href: `#contact`
      }
    ]
  })
};
</script>
