/* eslint-disable no-trailing-spaces */
<template>
  <div>
    <v-col cols="12">
      <v-card elevation="12">
        <v-card-title>Nuevo registro</v-card-title>
        <v-card-text>
          <nueva-firma @load="load($event)"></nueva-firma>
        </v-card-text>
      </v-card>
    </v-col>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>Datos Registro</v-card-title>
      <v-card-text>
        <table-firmas :listfirmas="registrofirmas"></table-firmas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import NuevaFirma from './firmas/NuevaFirma.vue'
import TableFirmas from './firmas/TableFirmas.vue'
import srvregistro from '../services/registro'

export default {
  name: 'Registro',
  components: { TableFirmas, NuevaFirma },
  data() {
    return {
      loadTable: false,
      valid: true,
      paramroute: null,
      registrofirmas: [],
    }
  },
  created() {
    this.paramroute = this.$route.params.id
    console.log(this.paramroute)
  },
  async mounted() {
    this.load()
    console.log('entro')
  },
  methods: {
    get(iduser) {
      return new Promise(resolve => {
        srvregistro.getbyuser(iduser).then(
          sus => {
            resolve(sus)
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    async load() {
      this.loadTable = true
      const iduser = this.$store.state.user.id_use
      const res = await this.get(iduser)
      this.registrofirmas = res.data
    },
  },
}
</script>
