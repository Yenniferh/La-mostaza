<template>
  <v-container id="inicio" fluid class="hero--container white--text fill-height mt-4 pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-img :src="require('../../assets/images/chef.jpg')" aspect-ratio="1.7">
          <div class="fill-height hero--gradient">
            <v-col xs="6">Hola</v-col>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Hero"
};
</script>