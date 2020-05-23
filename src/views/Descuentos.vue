<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12">
      <div class="container--gradient"></div>
      <v-row justify="center" class="margin-neg">
        <v-col cols="10" xs="10">
          <v-data-table
            :headers="headers"
            :items="discounts"
            sort-by="state"
            sort-desc
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="text-capitalize">Descuentos</v-toolbar-title>
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
                            <v-text-field v-model="editedItem.code" label="Código"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.startDate" label="Fecha de inicio"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.finishDate" label="Fecha de fin"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.discount" label="Descuento (%)"></v-text-field>
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
                    v-if="item.state != 'FINALIZADO'"
                    class="mr-1"
                    @click="editItem(item)"
                    v-on="on"
                  >mdi-pencil</v-icon>
                </template>
                <span>Generar orden</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="red darken-1"
                    small
                    v-if="item.state == 'SIN INICIAR'"
                    @click="deleteItem(item)"
                    v-on="on"
                  >mdi-delete</v-icon>
                </template>
                <span>Eliminar orden</span>
              </v-tooltip>
            </template>
            <template v-slot:item.state="{ item }">
              <v-chip
                :color="getColor(item.state)"
                :outlined="item.state != 'VIGENTE'"
                dark
                small
              >{{ item.state }}</v-chip>
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
        text: "Código",
        align: "start",
        value: "code"
      },
      { text: "Descripción", value: "description" },
      { text: "Fecha de inicio", value: "startDate" },
      { text: "Fecha de fin", value: "finishDate" },
      { text: "Descuento", value: "discount" },
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    discounts: [],
    editedIndex: -1,
    editedItem: {
      code: "",
      description: "",
      startDate: "",
      finishDate: "",
      discount: 0,
      state: ""
    },
    defaultItem: {
      code: "",
      description: "",
      startDate: "",
      finishDate: "",
      discount: 0,
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
      this.discounts = [
        {
          code: "SOPA2020",
          description: "Descuento del 20% por el día del niño",
          startDate: "25/04/2020",
          finishDate: "27/04/2020",
          discount: 20,
          state: "FINALIZADO"
        },
        {
          code: "MADRE3001",
          description: "Descuento del 30% por el día de la madre",
          startDate: "09/05/2020",
          finishDate: "16/05/2020",
          discount: 30,
          state: "FINALIZADO"
        },
        {
          code: "SABROSO1025",
          description:
            "En junio disfruta las vacaciones con el 10% de descuento",
          startDate: "01/06/2020",
          finishDate: "30/06/2020",
          discount: 10,
          state: "SIN INICIAR"
        },
        {
          code: "MEQUEDOCASA02",
          description: "5% de descuento en compras durante la cuarentena",
          startDate: "10/05/2020",
          finishDate: "01/06/2020",
          discount: 5,
          state: "VIGENTE"
        },
        {
          code: "ENAMORADOS2334",
          description: "Descuento del 15% para parejas",
          startDate: "19/05/2020",
          finishDate: "19/05/2020",
          discount: 15,
          state: "SIN INICIAR"
        },
        {
          code: "HEROESCOL20",
          description:
            "Presenta un documento que demuestre que laboras como profesional de la salud y obten 20% de descuento",
          startDate: "01/05/2020",
          finishDate: "31/05/2020",
          discount: 20,
          state: "VIGENTE"
        },
        {
          code: "CARNAVAL88",
          description: "Descuento del 8% en las compras realizadas en carnaval",
          startDate: "22/02/2020",
          finishDate: "25/02/2020",
          discount: 8,
          state: "FINALIZADO"
        },
        {
          code: "SEMANASANTA33",
          description: "Descuento por semana santa del 30%",
          startDate: "05/04/2020",
          finishDate: "11/04/2020",
          discount: 30,
          state: "FINALIZADO"
        },
        {
          code: "AGOSTO8034",
          description: "Descuentos del 8% en compras realizadas en agosto",
          startDate: "01/08/2020",
          finishDate: "31/08/2020",
          discount: 8,
          state: "SIN INICIAR"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.discounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.discounts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.discounts.splice(index, 1);
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
        Object.assign(this.discounts[this.editedIndex], this.editedItem);
      } else {
        this.discounts.push(this.editedItem);
      }
      this.close();
    },
    getColor(state) {
      if (state === "VIGENTE") return "green";
      else if (state === "SIN INICIAR") return "primary";
      else return "accent";
    }
  }
};
</script>
