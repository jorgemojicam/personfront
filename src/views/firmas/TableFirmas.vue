<template>
  <v-data-table :headers="headers" :items="listfirmas" class="elevation-1">
    <template v-slot:[`item.actions`]="{ item }">
      <v-chip :color="getColor(item.calories)" dark>
        {{ item.calories }}
      </v-chip>
    </template>
  </v-data-table>
</template>
<script>
// eslint-disable-next-line no-unused-vars

export default {
  name: 'TableFirmas',
  components: {},
  props: {
    loadtable: Boolean,
    listfirmas: Array,
  },
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

      valid: true,
      paramroute: null,
      registrofirmas: [],
    }
  },
  methods: {
    getColor(calories) {
      if (calories > 400) return 'red'
      if (calories > 200) return 'orange'

      return 'green'
    },
  },
  setup() {},
}
</script>
