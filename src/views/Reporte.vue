<template>
  <div>
    <v-card>
      <v-card-title>
        INFORME FIRMAS
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar Registro"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="registrofirmas"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import srvregistro from "../services/registro";
export default {
  name: "reporte",
  props: {},
  data() {
    return {
      headers: [
        { text: "CODIGO", value: "id_reg" },     
        { text: "FIRMAS RECOLECTADAS", value: "total_reg" },
        { text: "FIRMAS VALIDAS", value: "numerovalidas_reg" },
        { text: "TOTAL FIRMAS NO VALIDAS", value: "numeroinvalidas_reg" },
      ],
      registrofirmas:[],
      valid: true,
      error: null,
      snackbar: false,
      snacktext: "",
      timeout: 5000,
      search: '',
    };
  },
  components: {},
  methods: {
    get() {
      return new Promise((resolve) => {
        srvregistro.get().then(
          (sus) => {
            resolve(sus);
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
  },
  async mounted() {
    let res = await this.get();
    this.registrofirmas = res.data;
  },
};
</script>