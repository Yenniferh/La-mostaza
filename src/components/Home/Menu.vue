<template>
  <v-item-group multiple id="menu" class="grey lighten-5">
    <v-container>
      <v-row>
        <h2 class="display-2 primary--text text-capitalize my-4">Nuestra oferta gastronómica</h2>
      </v-row>
      <v-item-group>
        <v-container fluid>
          <v-col cols="12">
            <!-- <v-row v-if="this.$store.state.isLoading" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
                class="my-5"
                size="60"
              ></v-progress-circular>
            </v-row>-->
            <v-row :justify="this.$vuetify.breakpoint.xsOnly ? 'center' : 'start'">
              <v-item v-for="dish in platos" :key="dish.id">
                <v-card
                  class="d-flex align-center justify-center ma-2"
                  dark
                  elevation="3"
                  height="280"
                  width="240"
                >
                  <v-img
                    :src="dish.imageUrl"
                    height="100%"
                    width="100%"
                    gradient="to top left, rgba(0,0,0,.4), rgba(0,0,0,.5)"
                  >
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" xs="12">
                          <v-icon color="white">mdi-silverware-fork-knife</v-icon>
                          <span class="body-1 white--text ml-2 text-capitalize">{{ dish.cat }}</span>
                        </v-col>
                      </v-row>
                      <v-spacer />
                      <v-row>
                        <v-col cols="12" xs="12" class="mt-10">
                          <h3 class="title white--text text-capitalize">{{ dish.name }}</h3>
                          <p class="white--text font-weight-thin">{{ dish.desc }}</p>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-chip color="primary mr-2 font-weight-bold" small>${{ dish.precio }}</v-chip>
                      </v-row>
                    </v-container>
                  </v-img>
                </v-card>
              </v-item>
            </v-row>
          </v-col>
        </v-container>
      </v-item-group>
    </v-container>
  </v-item-group>
</template>

<script>
import api from "@/services/api";
import { mapState } from "vuex";

export default {
  data: () => ({
    platos: []
  }),
  created() {
    this.toggleLoading();
    api.getPlatos().then(platos => {
      const pl = Object.entries(platos);
      console.log(pl);
      for (let i = 0; i < pl.length; i++) {
        let plato = pl[i][1];
        let map = new Map(Object.entries(plato));
        let newPlato = {
          id: pl[i][0],
          desc: map.get("desc"),
          cat: map.get("cat"),
          tiempo: map.get("tiempo"),
          imageUrl: map.get("imageUrl"),
          precio: map.get("precio"),
          name: map.get("name")
        };
        this.platos.push(newPlato);
      }
      this.setDishes({ dishes: this.platos });
      this.toggleLoading();
    });
  },
  computed: mapState(["isLoading"]),
  methods: {
    restartLoading() {
      this.$store.commit("restartLoading");
    },

    toggleLoading() {
      this.$store.commit("toggleLoading");
    },

    setDishes(payload) {
      this.$store.commit("setDishes", payload);
    }
  },
  beforeDestroy() {
    this.restartLoading();
  }
};
</script>
