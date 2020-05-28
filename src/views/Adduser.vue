<template>
  <v-container>
    <v-row justify="center">
      <v-card max-width="500">
        <v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12" xs="12">
                <v-text-field v-model="user.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  v-model="user.password"
                  type="password"
                  label="Contraseña"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  v-model="user.iddoc"
                  label="Núm. Cédula"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  v-model="user.address"
                  label="Dirección"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  v-model="user.phoneNumber"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  v-model="user.type"
                  :items="items"
                  label="Standard"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text to="/admin">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-snackbar v-model="snackbar.toggle">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.toggle = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from '@/services/api';

export default {
  data: () => ({
    items: ['ADMINISTRADOR', 'MESERO'],
    user: {
      email: '',
      password: '',
      displayName: '',
      iddoc: '',
      address: '',
      phoneNumber: '',
      type: '',
    },
    snackbar: {
      toggle: false,
      text: '',
    },
  }),
  methods: {
    save() {
      if (this.user.type === 'ADMINISTRADOR') {
        api.createAdmin(this.user).then((res) => {
          if (res.status == 200) {
            this.snackbar.text = 'Creado con éxito';
            this.snackbar.toggle = true;
            this.user = {
              email: '',
              password: '',
              displayName: '',
              iddoc: '',
              address: '',
              phoneNumber: '',
              type: '',
            };
          } else {
            this.snackbar.text = 'Se produjo un error, intente de nuevo';
            this.snackbar.toggle = true;
          }
        });
      } else if (this.user.type === 'MESERO') {
        api.createMesero(this.user).then((res) => {
          if (res.status == 200) {
            this.snackbar.text = 'Creado con éxito';
            this.snackbar.toggle = true;
            this.user = {
              email: '',
              password: '',
              displayName: '',
              iddoc: '',
              address: '',
              phoneNumber: '',
              type: '',
            };
          } else {
            this.snackbar.text = 'Se produjo un error, intente de nuevo';
            this.snackbar.toggle = true;
          }
        });
      }
    },
  },
};
</script>
