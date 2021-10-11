<template>
  <v-data-table :headers="headers" :items="registrofirmas" class="elevation-1">
    <template v-slot:[`item.actions`]="{ item }">
      <v-chip :color="getColor(item.calories)" dark>
        {{ item.calories }}
      </v-chip>
    </template>
  </v-data-table>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { ref } from '@vue/composition-api'
import srvregistro from '../../services/registro'

export default {
  name: 'TableFirmas',
  components: {},
  props: { loadtable: Boolean },
  data() {
    return {
      headers: [
        { text: 'Folio', value: 'folio_reg' },
        { text: 'Municipio', value: 'nombre_mun' },
        { text: 'Usuario Registro', value: 'full_name' },
        { text: 'Validas', value: 'numeroinvalidas_reg' },
        { text: 'No Validas', value: 'numerovalidas_reg' },
        { text: 'Total', value: 'total_reg' },
      ],
      registrofirmas: [],
      valid: true,
      paramroute: null,
    }
  },
  async mounted() {
    this.load()
  },

  methods: {
    getColor(calories) {
      if (calories > 400) return 'red'
      if (calories > 200) return 'orange'

      return 'green'
    },
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
      const iduser = this.$store.state.user.id_use
      console.log(`Id user ${iduser}`)
      const res = await this.get(iduser)
      this.registrofirmas = res.data
    },
  },
  setup() {},
}
</script>
