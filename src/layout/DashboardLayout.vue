<template>
  <v-app id="sandbox">
    <v-card>
      <v-navigation-drawer
        v-if="!this.$vuetify.breakpoint.xsOnly"
        expand-on-hover
        mini-variant
        permanent
        app
        overflow
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">La mostaza</v-list-item-title>
            <v-list-item-subtitle>Panel administrativo</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav class="py-3 my-2">
          <v-list-item v-for="item in items" :key="item.label" link>
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

    <v-app-bar app>
      <v-toolbar-title>Vuetify</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer v-if="!this.$vuetify.breakpoint.smAndUp" app padless>
      <v-bottom-navigation shift color="primary">
        <v-btn v-for="item in items" :key="item.label">
          <span>{{item.label}}</span>
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-finance",
        label: "Balance"
      },
      {
        icon: "mdi-silverware",
        label: "Menú"
      },
      {
        icon: "mdi-fridge",
        label: "Inventario"
      },
      {
        icon: "mdi-nutrition",
        label: "Órdenes"
      },
      {
        icon: "mdi-sale",
        label: "Descuentos"
      }
    ],
    footer: {
      inset: false
    }
  })
};
</script>
