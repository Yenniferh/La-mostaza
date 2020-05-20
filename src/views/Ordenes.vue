<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12">
      <div class="container--gradient"></div>
      <v-row justify="center" class="margin-neg">
        <v-col cols="10" xs="10">
          <v-data-table :headers="headers" :items="orders" sort-by="client" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="text-capitalize">Órdenes</v-toolbar-title>
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
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.client" label="Cliente"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.table" label="Mesa"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.waiter" label="Atendió"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.date" label="Fecha"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.state" label="Estado"></v-text-field>
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
                  >mdi-eye</v-icon>
                </template>
                <span>Ver orden</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    small
                    class="mr-1"
                    @click="editItem(item)"
                    v-on="on"
                  >mdi-file-document</v-icon>
                </template>
                <span>Generar orden</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="red darken-1"
                    small
                    v-if="item.state != 'FINALIZADO'"
                    @click="deleteItem(item)"
                    v-on="on"
                  >mdi-delete</v-icon>
                </template>
                <span>Eliminar orden</span>
              </v-tooltip>
            </template>
            <template v-slot:item.state="{ item }">
              <v-chip :color="getColor(item.state)" dark small>{{ item.state }}</v-chip>
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
        text: "Cliente",
        align: "start",
        value: "client"
      },
      { text: "Mesa", value: "table" },
      { text: "Atendió", value: "waiter" },
      { text: "Fecha", value: "date" },
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    orders: [],
    editedIndex: -1,
    editedItem: {
      client: "",
      table: -1,
      waiter: "",
      date: "",
      state: ""
    },
    defaultItem: {
      client: "",
      table: -1,
      waiter: "",
      date: "",
      state: ""
    }
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
      this.orders = [
        {
          client: "Andrea",
          table: 12,
          waiter: "Berta",
          date: "12/05/2020",
          state: "FINALIZADO"
        },
        {
          client: "Melisa",
          table: 6,
          waiter: "Berta",
          date: "10/05/2020",
          state: "PROCESANDO"
        },
        {
          client: "Juan",
          table: 3,
          waiter: "Pedro",
          date: "14/05/2020",
          state: "FINALIZADO"
        },
        {
          client: "Humberto",
          table: 3,
          waiter: "Berta",
          date: "08/05/2020",
          state: "PROCESANDO"
        },
        {
          client: "Leandro",
          table: 5,
          waiter: "Luis",
          date: "23/04/2020",
          state: "PROCESANDO"
        },
        {
          client: "Arturo",
          table: 4,
          waiter: "Pablo",
          date: "12/05/2020",
          state: "FINALIZADO"
        },
        {
          client: "Patricia",
          table: 10,
          waiter: "Pedro",
          date: "12/05/2020",
          state: "PROCESANDO"
        },
        {
          client: "Yamile",
          table: 12,
          waiter: "Luis",
          date: "02/05/2020",
          state: "FINALIZADO"
        },
        {
          client: "Paula",
          table: 1,
          waiter: "Pablo",
          date: "01/05/2020",
          state: "PROCESANDO"
        },
        {
          client: "Hortencia",
          table: 2,
          waiter: "Ana",
          date: "12/04/2020",
          state: "PROCESANDO"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.orders.splice(index, 1);
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
        Object.assign(this.orders[this.editedIndex], this.editedItem);
      } else {
        this.orders.push(this.editedItem);
      }
      this.close();
    },
    getColor(state) {
      if (state === "FINALIZADO") return "green";
      else return "primary";
    }
  }
};
</script>
