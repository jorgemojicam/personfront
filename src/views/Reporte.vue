<template>
  <div>
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
    console.log(res);

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "REGISTRO DE FIRMAS",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["BARRANQUILLA", "CANDELARIA", "BOGOTA", "GIRON", "FLORIDA"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["BARRANQUILLA", "CANDELARIA", "BOGOTA", "GIRON", "FLORIDA"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "BARRANQUILLA",
          type: "line",
          stack: "",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "CANDELARIA",
          type: "line",
          stack: "",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "BOGOTA",
          type: "line",
          stack: "",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "GIRON",
          type: "line",
          stack: "",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "FLORIDA",
          type: "line",
          stack: "",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>