<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12">
      <div class="container--gradient"></div>
      <v-row justify="center" class="margin-neg">
        <v-col cols="10" xs="10">
          <v-data-table :headers="headers" :items="desserts" sort-by="name " class="elevation-1">
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
                            <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="selectOptions"
                              label="Categoría"
                              v-model="editedItem.category"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.price" label="Precio"></v-text-field>
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
                  >mdi-pencil</v-icon>
                </template>
                <span>Editar plato</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="red darken-1" small @click="deleteItem(item)" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Eliminar plato</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Descripción", value: "description" },
      { text: "Categoría", value: "category" },
      { text: "Precio", value: "price" },
      // { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      category: "",
      price: 0
      // protein: 0
    },
    defaultItem: {
      name: "",
      description: "",
      category: "",
      price: 0
      // protein: 0
    },
    selectOptions: ["Desayuno", "Almuerzo", "Cena", "Postre", "Otro"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Yogurt Suizo",
          description: "Delicioso yogurt exportado",
          category: "Desayuno",
          price: 3800
          // protein: 4.0
        },
        {
          name: "Filete de salmón marinado",
          description: "Jugoso filete de salmón bañado en salsa de naranja",
          category: "Almuerzo",
          price: 37000
          // protein: 4.3
        },
        {
          name: "Eclair",
          description: "Delicioso postre de leche con mermelada de melocotón",
          category: "Postre",
          price: 8900
          // protein: 6.0
        },
        {
          name: "Cupcake",
          description: "Disfruta esta tentación",
          category: "Postre",
          price: 2500
          // protein: 4.3
        }
        // {
        //   name: "Gingerbread",
        //   description: 356,
        //   category: 16.0,
        //   price: 49
        //   // protein: 3.9
        // },
        // {
        //   name: "Jelly bean",
        //   description: 375,
        //   category: 0.0,
        //   price: 94
        //   // protein: 0.0
        // },
        // {
        //   name: "Lollipop",
        //   description: 392,
        //   category: 0.2,
        //   price: 98
        //   // protein: 0
        // },
        // {
        //   name: "Honeycomb",
        //   description: 408,
        //   category: 3.2,
        //   price: 87
        //   // protein: 6.5
        // },
        // {
        //   name: "Donut",
        //   description: 452,
        //   category: 25.0,
        //   price: 51
        //   // protein: 4.9
        // },
        // {
        //   name: "KitKat",
        //   description: 518,
        //   category: 26.0,
        //   price: 65
        //   // protein: 7
        // }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
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
    }
  }
};
</script>
