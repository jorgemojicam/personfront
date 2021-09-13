<template>
  <div>
    <v-form @submit.prevent="submit" ref="form" v-model="valid">
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <v-card-title>Registro firmas</v-card-title>
          <v-row>
            <v-col cols="12" md="4">
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
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="municipio"
                :items="listmun"
                item-text="nombre_mun"
                item-value="id_mun"
                label="Municipio"
                required
                :rules="[(mun) => !!mun || 'Municipio requerido']"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="coordinador"
                :items="listcoor"
                :item-text="getItemText"
                item-value="id_use"
                label="Coordinador"
                :rules="[(va) => !!va || 'Coordinador requerido']"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="folio"
                type="number"
                label="Folio"
                :rules="[(va) => !!va || 'Numero requerido']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="validas"
                type="number"
                label="Numero Validas"
                :rules="[(va) => !!va || 'Numero requerido']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="novalidas"
                type="number"
                label="Numero no Validas"
                :rules="[(va) => !!va || 'Numero requerido']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="total"
                label="Total"
                readonly
                required
              ></v-text-field>
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
      municipio: "",
      listmun: [],
      listdeptos: [],
      coordinador: "",
      folio: "",
      listcoor: [],
      validas: "",
      novalidas: "",
      headers: [
        { text: "Folio", value: "folio_reg" },
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
    get(iduser) {
      return new Promise((resolve) => {
        srvregistro.getbyuser(iduser).then(
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
    create(data) {
      return new Promise((resolve) => {
        srvregistro.insert(data).then(
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
    async submit() {
      if (this.$refs.form.validate()) {
        let data = {
          numerovalidas: parseInt(this.validas),
          numeroinvalidas: parseInt(this.novalidas),
          total: parseInt(this.total),
          idmunicipio: this.municipio.id_mun,
          fecha: "2021-09-09",
          idcuentaacceso: this.$store.state.user.id_use,
          iduser: this.coordinador.id_use,
          folio: parseInt(this.folio)
        };

        let rescrea = await this.create(data);
        if (rescrea.insertId > 0) {
          await this.load();
        }
        console.log(rescrea);
      }
    },
    async changemun(iddepto) {
      let resmun = await this.getMun(iddepto.id_dep);
      this.listmun = resmun;
    },
    getItemText(item) {
      return `${item.nombre_use} ${item.apellido_use}`;
    },
    async load() {
      let iduser = this.$store.state.user.id_use
      console.log("entro")
      let res = await this.get(iduser);
      this.registrofirmas = res.data;
      
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
    this.load()
    
    let resdepto = await this.getDepto();
    this.listdeptos = resdepto;

    let rescoor = await this.getcoordinador();
    this.listcoor = rescoor;
  },
};
</script>