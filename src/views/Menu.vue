<template>
  <v-col cols="10" xs="10">
    <v-data-table :headers="headers" :items="platos" sort-by="name " class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-capitalize">Platos del Menú</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="editedItem.desc" label="Descripción"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-select :items="selectOptions" label="Categoría" v-model="editedItem.cat"></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field v-model="editedItem.tiempo" label="Tiempo de prep."></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="image"
                        accept="image/*"
                        placeholder="Selecciona la foto del plato"
                        label="Imagen plato"
                      ></v-file-input>
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
            <v-icon color="red darken-1" small @click="deleteItem(item)" v-on="on">mdi-delete</v-icon>
          </template>
          <span>Eliminar plato</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Menu",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "name"
      },
      { text: "Descripción", value: "desc", sortable: false },
      { text: "Categoría", value: "cat" },
      { text: "Precio", value: "precio" },
      { text: "Actions", value: "actions", sortable: false, align: "center" }
    ],
    platos: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      desc: "",
      cat: "",
      tiempo: "",
      imageUrl: "",
      precio: "",
      name: ""
    },
    defaultItem: {
      id: "",
      desc: "",
      cat: "",
      tiempo: "",
      imageUrl: "",
      precio: "",
      name: ""
    },
    image: [],
    selectOptions: ["Desayuno", "Almuerzo", "Cena", "Postre", "Otro"]
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.create();
  },

  methods: {
    create() {
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

    restartLoading() {
      this.$store.commit("restartLoading");
    },

    toggleLoading() {
      this.$store.commit("toggleLoading");
    },

    setDishes(payload) {
      this.$store.commit("setDishes", payload);
    },

    deleteItem(item) {
      api.deletePlato(item.id).then(res => {
        if (res.status === 200) {
          const index = this.platos.indexOf(item);
          this.setDishes({ dishes: this.platos.splice(index, 1) });
        }
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
      const { name, desc, cat, precio, tiempo } = this.editedItem;
      api.createPlato(name, desc, cat, precio, tiempo, this.image).then(res => {
        if (res.status == 200) {
          this.platos = [];
          this.create();
          this.image = [];
        }
        this.close();
        this.toggleLoading();
      });
    }
  }
};
</script>
