<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12">
      <div class="container--gradient"></div>
      <v-row justify="center" class="margin-neg">
        <v-col cols="10" xs="10">
          <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-1">
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
                      <span class="headline">{{formTitle}}</span>
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
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.quantity" label="Cantidad"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.unit" label="Unidad"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.valuePerUnit" label="Precio unitario"></v-text-field>
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
                    color="accent"
                    small
                    class="mr-1"
                    @click="editItem(item)"
                    v-on="on"
                  >mdi-pencil</v-icon>
                </template>
                <span>Editar producto</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="red darken-1" small @click="deleteItem(item)" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Eliminar producto</span>
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
        value: "name"
      },
      { text: "Descripción", sortable: false, value: "description" },
      { text: "Cantidad", value: "quantity" },
      { text: "Unidad", value: "unit" },
      { text: "Precio unitario", value: "valuePerUnit" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      valuePerUnit: 0
    },
    defaultItem: {
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      valuePerUnit: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar" : "Editar";
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
          name: "Yogurt",
          description: "Ninguna",
          quantity: 6,
          unit: "L",
          valuePerUnit: 7800
        },
        {
          name: "Mantequilla",
          description: "Frescampo",
          quantity: 9,
          unit: "gr",
          valuePerUnit: 2300
        },
        {
          name: "Jugo de durazno",
          description: "Ninguna",
          quantity: 16,
          unit: "L",
          valuePerUnit: 4600
        },
        {
          name: "Harina de trigo",
          description: "Ninguna",
          quantity: 3,
          unit: "lb",
          valuePerUnit: 1800
        },
        {
          name: "Lenteja",
          description: "Ninguna",
          quantity: 16,
          unit: "lb",
          valuePerUnit: 1300
        },
        {
          name: "Arroz",
          description: "Esta vez arroz diana",
          quantity: 70,
          unit: "lb",
          valuePerUnit: 1700
        },
        {
          name: "Pollo",
          description: "Ninguna",
          quantity: 3,
          unit: "lb",
          valuePerUnit: 3000
        },
        {
          name: "Yuca",
          description: "Ninguna",
          quantity: 3,
          unit: "lb",
          valuePerUnit: 900
        },
        {
          name: "Papa",
          description: "Ninguna",
          quantity: 25,
          unit: "lb",
          valuePerUnit: 750
        },
        {
          name: "Helado",
          description: "Ninguna",
          quantity: 26,
          unit: "L",
          valuePerUnit: 12000
        }
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
