<template>
  <v-app>
    <v-appBar app color="white" dark absolute>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />
      <router-link
        v-for="(link, i) in links"
        :key="i"
        to="/home"
        v-scroll-to="link.href"
        class="my-2"
      >
        <v-btn color="accent" text rounded>{{ link.text }}</v-btn>
      </router-link>

      <v-btn
        class="ml-4"
        color="primary"
        active-class="black darken-1"
        :to="{ name: 'Login' }"
      >
        <span class="mr-2 font-weight-bold">Panel de empleados</span>
        <v-icon>mdi-account-tie</v-icon>
      </v-btn>
    </v-appBar>

    <v-content>
      <router-view></router-view>
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
  name: 'HomeLayout',

  data: () => ({
    links: [
      {
        text: 'Inicio',
        href: `#inicio`,
      },
      {
        text: 'Quiénes Somos',
        href: `#who`,
      },
      {
        text: 'Menú',
        href: `#menu`,
      },
      {
        text: 'Contáctanos',
        href: `#contact`,
      },
    ],
  }),
};
</script>
