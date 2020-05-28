<template>
  <v-col cols="10" xs="10">
    <v-data-table
      :headers="headers"
      :items="discounts"
      sort-by="state"
      calculate-widths
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
                <span class="headline">Agregar descuento</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="createdItem.dct"
                        label="Descuento (%)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="createdItem.date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="createdItem.date"
                            label="Fecha de fin"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="createdItem.date"
                          no-title
                          scrollable
                          type="month"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="red darken-1" @click="menu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(createdItem.date)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
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
          <span>Eliminar descuento</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import api from '@/services/api';
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'id',
        sortable: false,
      },
      { text: 'Código', value: 'code', sortable: false },
      { text: 'Descuento', value: 'dct' },
      { text: 'Mes', value: 'mes' },
      { text: 'Año', value: 'year' },
      { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
    ],
    discounts: [],
    editedIndex: -1,
    createdItem: {
      dct: '',
      date: '',
    },
    defaultItem: {
      id: '',
      dct: '',
      year: '',
      mes: '',
      code: '',
    },
    menu: false,
    menu2: false,
  }),

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
      api.getDescuentos().then((discounts) => {
        const dis = Object.entries(discounts);
        console.log(discounts);
        for (let i = 0; i < dis.length; i++) {
          let disc = dis[i][1];
          let map = new Map(Object.entries(disc));
          let newDisc = {
            id: dis[i][0],
            dct: map.get('dct'),
            code: map.get('code'),
            year: map.get('year'),
            mes: map.get('mes'),
          };
          this.discounts.push(newDisc);
        }
        this.setDiscounts({ discounts: this.orders });
        this.toggleLoading();
      });
    },

    restartLoading() {
      this.$store.commit('restartLoading');
    },

    toggleLoading() {
      this.$store.commit('toggleLoading');
    },

    setDiscounts(payload) {
      this.$store.commit('setDiscounts', payload);
    },

    editItem(item) {
      this.editedIndex = this.discounts.indexOf(item);
      this.createdItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      api.deleteDescuento(item.id, item.year, item.mes).then(() => {
        const index = this.discounts.indexOf(item);
        this.setDiscounts({ discounts: this.discounts.splice(index, 1) });
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.createdItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      api
        .createDescuento(
          this.createdItem.dct,
          this.createdItem.date.split('-')[1],
          this.createdItem.date.split('-')[0]
        )
        .then((res) => {
          if (res.status == 200) {
            this.discounts = [];
            this.create();
          }
          this.close();
        });
    },
  },
};
</script>
