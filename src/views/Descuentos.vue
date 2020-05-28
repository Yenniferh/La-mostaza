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
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.code"
                        label="Código"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Descripción"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.startDate"
                            label="Fecha de inicio"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.startDate"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu2 = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(editedItem.startDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                      <!-- <v-text-field v-model="editedItem.startDate" label="Fecha de inicio"></v-text-field> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.finishDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.finishDate"
                            label="Fecha de fin"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.finishDate"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editedItem.finishDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.discount"
                        label="Descuento (%)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.state"
                        label="Estado"
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
        <v-tooltip v-if="item.state != 'FINALIZADO'" top>
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
          <span>Editar descuento</span>
        </v-tooltip>
        <v-tooltip v-if="item.state == 'SIN INICIAR'" top>
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
      <!-- Row chips -->
      <template v-slot:item.state="{ item }">
        <v-chip
          :color="getColor(item.state)"
          :outlined="item.state != 'VIGENTE'"
          dark
          small
          >{{ item.state }}</v-chip
        >
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
      { text: 'Código', value: 'code' },
      { text: 'Descuento', value: 'dct' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    discounts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      dct: '',
      code: '',
    },
    defaultItem: {
      id: '',
      dct: '',
      code: '',
    },
    menu: false,
    menu2: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar' : 'Editar';
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
    async create() {
      this.toggleLoading();
      api.getDescuentos().then((discounts) => {
        const dis = Object.entries(discounts);
        for (let i = 0; i < dis.length; i++) {
          let disc = dis[i][1];
          let map = new Map(Object.entries(disc));
          let newDisc = {
            id: dis[i][0],
            dct: map.get('dct'),
            code: map.get('code'),
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
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.discounts.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
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
      if (state === 'VIGENTE') return 'green';
      else if (state === 'SIN INICIAR') return 'primary';
      else return 'accent';
    },
  },
};
</script>
