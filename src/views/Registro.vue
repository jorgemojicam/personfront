<template>
  <div>
    <v-form @submit.prevent="submit" ref="form" v-model="valid">
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="depto"
                :items="listdeptos"
                @change="changemun($event)"
                item-text="nombre_dep"
                item-value="id_dep"
                label="Departamento"
                required
                :rules="[(v) => !!v || 'Departamento requerido']"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="municipio"
                :items="listmun"
                item-text="nombre_mun"
                item-value="id_mun"
                label="Municipio"
                required
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="validas"
                type="number"
                label="Numero Validas"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="novalidas"
                type="number"
                label="Numero no Validas"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="total"
                label="Total"
                readonly
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="coordinador"
                :items="listcoor"
                :item-text="getItemText"
                item-value="id_use"
                label="Coordinador"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn class="success mr-4" type="submit"> Guardar </v-btn>
          <v-btn class="mr-4"> Limpiar </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <br />
    <v-divider></v-divider>
    <h2>Datos Registro</h2>
    <v-data-table
      :headers="headers"
      :items="registrofirmas"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-chip :color="getColor(item.calories)" dark>
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import srvregistro from "../services/registro";
import srvdepto from "../services/departamento.service";
import srvmun from "../services/municpios.service";
import srvusuarios from "../services/users.service";

export default {
  name: "Registro",
  components: {},
  data() {
    return {
      depto: "",
      municipio: [],
      listmun: [],
      listdeptos: [],
      coordinador: "",
      listcoor: [],
      validas: "",
      novalidas: "",
      headers: [
        { text: "Municipio", value: "nombre_mun" },
        { text: "Usuario Registro", value: "full_name" },
        { text: "Validas", value: "numeroinvalidas_reg" },
        { text: "No Validas", value: "numerovalidas_reg" },
        { text: "Total", value: "total_reg" },
      ],
      registrofirmas: [],
      valid: true,
    };
  },
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
    getDepto() {
      return new Promise((resolve) => {
        srvdepto.get().then(
          (sus) => {
            if (sus && sus.data) {
              resolve(sus.data);
            } else {
              console.log("error ", sus);
              resolve(null);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    getMun(iddep) {
      return new Promise((resolve) => {
        srvmun.getbydep(iddep).then(
          (sus) => {
            if (sus && sus.data) {
              resolve(sus.data);
            } else {
              console.log("error ", sus);
              resolve(null);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    getcoordinador() {
      return new Promise((resolve) => {
        srvusuarios.getcoordinadores().then(
          (sus) => {
            if (sus && sus.data) {
              resolve(sus.data);
            } else {
              console.log("error ", sus);
              resolve(null);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
    submit() {
      if (this.$refs.form.validate()) {
        alert("entro");
      }
    },
    async changemun(iddepto) {
      let resmun = await this.getMun(iddepto.id_dep);
      this.listmun = resmun;
    },
    getItemText(item) {
      return `${item.nombre_use} ${item.apellido_use}`;
    },
  },

  computed: {
    total: function () {
      return (
        (this.validas == "" ? 0 : parseInt(this.validas)) +
        (this.novalidas == "" ? 0 : parseInt(this.novalidas))
      );
    },
  },
  async mounted() {
    let res = await this.get();
    this.registrofirmas = res.data;

    console.log("user ", this.$store.state.user);

    let resdepto = await this.getDepto();
    this.listdeptos = resdepto;

    let rescoor = await this.getcoordinador();
    this.listcoor = rescoor;
  },
};
</script>