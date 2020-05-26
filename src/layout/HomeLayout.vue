<template>
  <v-app>
    <v-appBar app color="white" dark absolute>
      <div class="d-flex align-center">
        <router-link to="/home">
          <v-img
            alt="Logo de La Mostaza"
            class="shrink mr-2"
            contain
            :src="require('../assets/images/Logo.svg')"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-spacer />
      <div v-if="this.$vuetify.breakpoint.smAndUp">
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
      </div>
      <div v-else>
        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon class="accent--text" v-on="on"></v-app-bar-nav-icon>
          </template>

          <v-list>
            <router-link
              to="/home"
              v-scroll-to="link.href"
              class="my-2 text-dec"
              v-for="(link, i) in links"
              :key="i"
            >
              <v-list-item>
                <v-list-item-title class="accent--text">{{ link.text }}</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/login">
              <v-list-item class="primary">
                <v-list-item-icon class="mr-1">
                  <v-icon color="white">mdi-account-tie</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="white--text">Panel de empleados</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </div>
    </v-appBar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer padless>
      <v-row justify="space-between" align="center" no-gutters>
        <v-col class="black py-4 text-center primary--text" cols="12">
          © {{ new Date().getFullYear() }} —
          <strong>
            Mostaza team made with
            <v-icon color="red">mdi-heart</v-icon>
          </strong>
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
