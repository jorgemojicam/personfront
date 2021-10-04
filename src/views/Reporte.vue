<template>
  <div>
    <v-select
      :items="items"
      label="Agrupar por: "
      solo
      v-model="filtro"
      item-text="text"
      item-value="value"
      @change="changefiltro"
    ></v-select>

    <div id="main" style="width: 100%; height: 400px"></div>

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
import * as echarts from "echarts";
export default {
  name: "reporte",
  props: {},
  data() {
    return {
      headers: [
        { text: "Codigo", value: "id_reg" },
        { text: "Recaudador", value: "full_name" },
        { text: "Municipio", value: "nombre_mun" },
        { text: "Firmas Recolectadas", value: "total_reg" },
        { text: "Firmas Validas", value: "numerovalidas_reg" },
        { text: "Firmas Invalidas", value: "numeroinvalidas_reg" },
      ],
      registrofirmas: [],
      valid: true,
      search: "",
      items: [
        { text: "Municipio", value: "idmunicipio_reg" },
        { text: "Recaudador", value: "idcuentaacceso_reg" },
      ],
      filtro: "",
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
    getbyfilters(filter) {
      return new Promise((resolve) => {
        srvregistro.getbyfilters(filter).then(
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
    async load(filter) {
      let resfilters = await this.getbyfilters(filter);

      let res = await this.get();
      this.registrofirmas = res.data;

      let arrayLegend = [];
      let arraySerValidas = [];
      let arraySerNoValidas = [];

      resfilters.data.forEach((element) => {
        if (filter == "idmunicipio_reg") {
          arrayLegend.push(element.nombre_mun);
        } else {
          arrayLegend.push(element.full_name);
        }
        arraySerValidas.push(element.validas);
        arraySerNoValidas.push(element.invalidas);
      });

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "Grafico firmas",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Validas", "No Validas"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: arrayLegend,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Validas",
            type: "line",
            data: arraySerValidas,
          },
          {
            name: "No Validas",
            type: "line",
            data: arraySerNoValidas,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    changefiltro() {     
      this.load(this.filtro);
    },
  },
  async mounted() {
    this.filtro = this.items[0];
    this.load(this.filtro.value);
  },
};
</script>

