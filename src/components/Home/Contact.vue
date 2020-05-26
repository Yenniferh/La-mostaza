<template>
  <v-container id="contact" class="my-12">
    <v-row justify="space-around" align="center" no-gutters>
      <v-col cols="12" xs="12" sm="6">
        <v-img
          :src="require('../../assets/images/open.jpg')"
          :lazy-src="require('../../assets/images/open-min.jpg')"
          width="95%"
          height="95%"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="6" :class="this.$vuetify.breakpoint.xsOnly && 'mt-3'">
        <h2 class="display-2 primary--text text-capitalize text-justify">¡Contáctanos!</h2>

        <h3 class="title mt-3">
          <v-icon class="mr-2">mdi-clock</v-icon>Horario de atención:
        </h3>
        <p>
          Lunes a Jueves de 8am a 9pm
          <br />Sábados, Domingos y festivos de 8:30am a 11pm
        </p>
        <h3 class="title mt-1">
          <v-icon class="mr-2">mdi-phone</v-icon>Teléfonos:
        </h3>
        <p>
          <v-icon class="mr-2" color="green">mdi-whatsapp</v-icon>
          <span class="font-weight-bold">Whatsapp:</span> 320-258-0328
          <br />
          <v-icon class="mr-2">mdi-truck-fast</v-icon>
          <span class="font-weight-bold">Domicilios al:</span> 358-2238
        </p>
        <h3 class="title primary--text text-capitalize">Síguenos en nuestras redes sociales</h3>
        <p>
          <v-btn icon color="blue" large>
            <v-icon class="mr-2" large>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon color="pink" large>
            <v-icon class="mr-2" large>mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon color="blue" large>
            <v-icon class="mr-2" large>mdi-twitter</v-icon>
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>