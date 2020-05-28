<template>
  <v-app id="sandbox">
    <v-card>
      <v-navigation-drawer
        v-if="!this.$vuetify.breakpoint.xsOnly"
        expand-on-hover
        mini-variant
        mini-variant-width="80"
        permanent
        app
        overflow
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-avatar>
              <v-img
                alt="Logo de La Mostaza"
                class="px-0 mx-0"
                contain
                :src="require('../assets/images/Logo.svg')"
                transition="scale-transition"
                width="40"
              />
            </v-list-item-avatar>
            <v-list-item-title class="title primary--text"
              >La Mostaza</v-list-item-title
            >
            <v-list-item-subtitle>Panel administrativo</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav class="py-3 my-2">
          <v-list-item
            v-for="item in items"
            :key="item.label"
            link
            :to="{ path: item.path }"
          >
            <v-list-item-icon>
              <v-icon color="primary" size="30">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-container>
      <v-app-bar app>
        <v-toolbar-title>
          <router-link
            :to="$route.path"
            class="primary-text text-uppercase text-dec"
            >{{ $route.name }}</router-link
          >
        </v-toolbar-title>
        <v-spacer />
        <router-link to="/home">
          <v-btn color="primary" @click="Logout" small>Cerrar sesión</v-btn>
        </router-link>
      </v-app-bar>
    </v-container>

    <v-content>
      <v-row no-gutters>
        <v-col cols="12" xs="12">
          <div class="container--gradient"></div>
          <v-row justify="center" class="margin-neg">
            <router-view />
          </v-row>
        </v-col>
      </v-row>
    </v-content>

    <v-footer v-if="!this.$vuetify.breakpoint.smAndUp" app padless>
      <v-bottom-navigation shift color="primary">
        <v-btn
          v-for="item in items"
          :key="item.label"
          :to="{ path: item.path }"
        >
          <span>{{ item.label }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
const startPath = '/admin';
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    items: [
      {
        icon: 'mdi-finance',
        label: 'Balance',
        path: startPath + '/dashboard',
      },
      {
        icon: 'mdi-silverware',
        label: 'Menú',
        path: startPath + '/menu',
      },
      {
        icon: 'mdi-fridge',
        label: 'Inventario',
        path: startPath + '/inventario',
      },
      {
        icon: 'mdi-nutrition',
        label: 'Órdenes',
        path: startPath + '/ordenes',
      },
      {
        icon: 'mdi-sale',
        label: 'Descuentos',
        path: startPath + '/descuentos',
      },
    ],
    footer: {
      inset: false,
    },
  }),
  methods: mapMutations(['Logout']),
};
</script>
