<template>
  <v-col cols="10" xs="10">
    <v-data-table
      :headers="headers"
      :items="platos"
      sort-by="name "
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-capitalize"
            >Platos del Menú</v-toolbar-title
          >
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
                <span class="headline">Agregar plato</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Descripción"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="selectOptions"
                        label="Categoría"
                        v-model="editedItem.category"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Precio"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>-->
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
              color="accent"
              small
              class="mr-1"
              @click="editItem(item)"
              v-on="on"
              >mdi-pencil</v-icon
            >
          </template>
          <span>Editar plato</span>
        </v-tooltip>
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
          <span>Eliminar plato</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Menu',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Descripción', value: 'desc', sortable: false },
      { text: 'Categoría', value: 'cat' },
      { text: 'Precio', value: 'precio' },
      { text: 'Imagen', value: 'imageUrl' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    platos: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      desc: '',
      cat: '',
      tiempo: '',
      imageUrl: '',
      precio: '',
      name: '',
    },
    defaultItem: {
      id: '',
      desc: '',
      cat: '',
      tiempo: '',
      imageUrl: '',
      precio: '',
      name: '',
    },
    selectOptions: ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Otro'],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
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
    create() {
      this.toggleLoading();
      api.getPlatos().then((platos) => {
        const pl = Object.entries(platos);
        console.log(pl);
        for (let i = 0; i < pl.length; i++) {
          let plato = pl[i][1];
          let map = new Map(Object.entries(plato));
          let newPlato = {
            id: pl[i][0],
            desc: map.get('desc'),
            cat: map.get('cat'),
            tiempo: map.get('tiempo'),
            imageUrl: map.get('imageUrl'),
            precio: map.get('precio'),
            name: map.get('name'),
          };
          this.platos.push(newPlato);
        }
        this.setDishes({ dishes: this.platos });
        this.toggleLoading();
      });
    },

    restartLoading() {
      this.$store.commit('restartLoading');
    },

    toggleLoading() {
      this.$store.commit('toggleLoading');
    },

    setDishes(payload) {
      this.$store.commit('setDishes', payload);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  beforeDestroy() {
    this.restartLoading();
  },
};
</script>
