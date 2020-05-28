<template>
  <v-col cols="10" xs="10">
    <v-row v-if="this.isLoading" justify="center">
      <v-progress-circular
        indeterminate
        color="primary"
        class="my-5"
        size="60"
      ></v-progress-circular>
    </v-row>
    <v-data-table
      v-else
      :headers="headers"
      :items="this.products"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-capitalize">Inventario</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                Agregar
                <v-icon class="ml-1">mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Agregar</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.cantidad"
                        label="Cantidad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.medida"
                        label="Unidad"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              color="red darken-1"
              small
              @click="deleteItem(item)"
              v-on="on"
              >mdi-delete</v-icon
            >
          </template>
          <span>Eliminar producto</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import api from '@/services/api';
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        value: 'nombre',
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Unidad', value: 'medida' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nombre: '',
      cantidad: 0,
      medida: '',
    },
    defaultItem: {
      id: '',
      nombre: '',
      cantidad: 0,
      medida: '',
    },
  }),

  computed: {
    ...mapState(['isLoading']),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.create();
  },

  methods: {
    async create() {
      this.toggleLoading();
      api.getStock().then((products) => {
        const pr = Object.entries(products);
        for (let i = 0; i < pr.length; i++) {
          let prod = pr[i][1];
          let map = new Map(Object.entries(prod));
          let newProd = {
            id: pr[i][0],
            nombre: map.get('nombre'),
            cantidad: map.get('cantidad'),
            medida: map.get('medida'),
          };
          this.products.push(newProd);
        }
        this.setProducts({ products: this.products });
        this.toggleLoading();
      });
    },

    restartLoading() {
      this.$store.commit('restartLoading');
    },

    toggleLoading() {
      this.$store.commit('toggleLoading');
    },

    setProducts(payload) {
      this.$store.commit('setProducts', payload);
    },

    deleteItem(item) {
      api.deleteStock(item.id).then(() => {
        const index = this.products.indexOf(item);
        this.setProducts({ products: this.products.splice(index, 1) });
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.toggleLoading();
      const { nombre, cantidad, medida } = this.editedItem;
      api.createStock(nombre, cantidad, medida).then((res) => {
        if (res.status == 200) {
          this.setProducts({ products: this.products.push(this.editedItem) });
        }
        this.close();
        this.toggleLoading();
      });
    },
  },

  beforeDestroy() {
    this.restartLoading();
  },
};
</script>
