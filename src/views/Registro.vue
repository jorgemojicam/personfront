/* eslint-disable no-trailing-spaces */
<template>
  <div>
    <v-col cols="12">
      <v-card elevation="12">
        <v-card-title>Nuevo registro</v-card-title>
        <v-card-text>
          <nueva-firma></nueva-firma>
        </v-card-text>
      </v-card>
    </v-col>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>Datos Registro</v-card-title>
      <v-card-text>
        <table-firmas :loadtable="loadTable" @load="load($event)"></table-firmas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import NuevaFirma from './firmas/NuevaFirma.vue'
import TableFirmas from './firmas/TableFirmas.vue'

export default {
  name: 'Registro',
  components: { TableFirmas, NuevaFirma },
  data() {
    return {
      loadTable: false,
      valid: true,
      paramroute: null,
    }
  },
  created() {
    this.paramroute = this.$route.params.id
    console.log(this.paramroute)
  },
  async mounted() {
    this.load()
  },
  methods: {
    load(load) {
      this.loadTable = load
    },
  },
}
</script>
