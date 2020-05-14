<template>
  <v-container id="who">
    <v-col cols="12" xs="12">
      <v-row justify="center" align="center">
        <v-col cols="12" xs="12" md="6" class="my-12">
          <v-img :src="require('../../assets/images/Waiter.jpg')" />
        </v-col>
        <v-col cols="12" xs="12" md="6">
          <span class="text-uppercase font-weight-bold">Redescubriendo sabores</span>
          <h2 class="display-2 primary--text text-capitalize text-justify">Quiénes somos</h2>
          <p class="my-2">
            Somos una empresa tradicional, nos hemos dedicado durante más de 20 años a
            deleitar a nuestros clientes con recetas caseras y los sabores autóctonos de la
            cocina colombiana.
            <br />
            <br />Con el tiempo, hemos ido incorporando a nuestro menú las preparaciones
            internacionales que nos han cautivado, a las que le aportamos sazón colombiana.
            Estamos convencidos de que también te gustarán.
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Who"
};
</script>