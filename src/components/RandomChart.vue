<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12">
      <div class="container--gradient"></div>
      <v-row justify="center" class="margin-neg">
        <v-col cols="10" xs="12">
          <v-row>
            <v-card max-width="500" elevation="2">
              <v-card-text>
                <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
                <button @click="fillData()">Randomize</button>
              </v-card-text>
            </v-card>
          </v-row>
          <v-row>
            <!-- <v-card max-width="500" elevation="2">
            <v-card-text>
              <bar-chart
                :chart-data="datacollection"
                :options="options"
              ></bar-chart>
              <button @click="fillData()">Randomize</button>
            </v-card-text>
            </v-card>-->
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "./BarChart.js";

export default {
  components: {
    BarChart
  },
  data: () => ({
    datacollection: {},
    options: {
      fontFamily: "'Roboto', Helvetica, 'Arial', sans-serif",
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        datasets: [
          {
            label: "Ingresos diarios",
            backgroundColor: "#ffd355",
            hoverBackgroundColor: "#E19D17",
            data: [4.4, 6, 5.2, 5.1, 7.5, 8, 10.2]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
