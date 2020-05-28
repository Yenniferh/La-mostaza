<template>
  <v-col cols="12" xs="12">
    <v-data-table
      :headers="headers"
      :items="orders"
      sort-by="state"
      sort-desc
      class="elevation-1 px-2"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-capitalize">Órdenes</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip v-if="item.state != 'FINALIZADO'" top>
          <template v-slot:activator="{ on }">
            <v-icon
              color="red darken-1"
              small
              @click="deleteItem(item)"
              v-on="on"
              >mdi-delete</v-icon
            >
          </template>
          <span>Eliminar orden</span>
        </v-tooltip>
      </template>
      <template v-slot:item.estado="{ item }">
        <v-chip :color="getColor(item.estado)" dark small>{{
          item.estado.toUpperCase()
        }}</v-chip>
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
        text: 'IDCliente',
        align: 'start',
        value: 'idcliente',
      },
      { text: 'Mesa', value: 'nmesa' },
      { text: 'IDMesero', value: 'idmesero' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Hora', value: 'hora' },
      { text: 'N° Factura', value: 'nfactura' },
      { text: 'Total', value: 'total' },
      { text: 'Estado', value: 'estado' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    orders: [],
    defaultItem: {
      id: '',
      idcliente: '',
      nmesa: '',
      idmesero: '',
      fecha: '',
      year: '',
      mes: '',
      dia: '',
      hora: '',
      nfactura: '',
      total: '',
      estado: '',
    },
  }),

  created() {
    this.create();
  },

  methods: {
    async create() {
      this.toggleLoading();
      api.getOrders().then((orders) => {
        const or = Object.entries(orders);
        for (let i = 0; i < or.length; i++) {
          let prod = or[i][1];
          let map = new Map(Object.entries(prod));
          let newOrder = {
            id: or[i][0],
            idcliente: map.get('idcliente'),
            nmesa: map.get('nmesa'),
            idmesero: map.get('idmesero'),
            fecha: `${map.get('year')}-${map.get('mes')}-${map.get('dia')}`,
            year: map.get('year'),
            mes: map.get('mes'),
            dia: map.get('dia'),
            hora: map.get('hora'),
            nfactura: map.get('nfactura'),
            total: map.get('total'),
            estado: map.get('estado'),
          };
          this.orders.push(newOrder);
        }
        this.setOrders({ orders: this.orders });
        this.toggleLoading();
      });
    },

    restartLoading() {
      this.$store.commit('restartLoading');
    },

    toggleLoading() {
      this.$store.commit('toggleLoading');
    },

    setOrders(payload) {
      this.$store.commit('setOrders', payload);
    },

    deleteItem(item) {
      api.deleteOrder(item.id, item.year, item.mes).then(() => {
        const index = this.orders.indexOf(item);
        this.setOrders({ orders: this.orders.splice(index, 1) });
      });
    },

    getColor(state) {
      if (state === 'finalizado') return 'green';
      else return 'primary';
    },
  },
  beforeDestroy() {
    this.restartLoading();
  },
};
</script>
