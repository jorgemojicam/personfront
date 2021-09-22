<template>
  <div>
    <v-select
      :items="listroles"
      label="Roles"
      v-model="rol"
      item-text="nombre_rol"
      item-value="id_rol"
      return-object
      @change="changerol($event)"
      outlined
    ></v-select>
    <v-data-table :headers="headers" :items="listmodulos" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>MODULOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" fab dark color="primary">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.editar`]="{ item }">
        <v-checkbox
          v-model="item.editar"
          :false-value="0"
          :true-value="1"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.ver`]="{ item }">
        <v-checkbox
          v-model="item.ver"
          :false-value="0"
          :true-value="1"
        ></v-checkbox>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import srvmodulos from "../services/modulos.service";
import srvroles from "../services/roles.service";
export default {
  name: "permisos",
  props: {},
  data() {
    return {
      rol: "",
      headers: [
        { text: "Nombre", value: "nombre_mod" },
        { text: "Crear", value: "crear" },
        { text: "Ver", value: "ver" },
        { text: "Editar", value: "editar" },
        { text: "Eliminar", value: "eliminar" },
      ],
      listmodulos: [],
      listroles: [],
    };
  },
  methods: {
    getbyrol(idrol) {
      return new Promise((resolve) => {
        srvmodulos.getbyrol(idrol).then(
          (suss) => {
            if (suss && suss.data) {
              resolve(suss.data);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    getroles() {
      return new Promise((resolve) => {
        srvroles.get().then(
          (sus) => {
            if (sus && sus.data) {
              resolve(sus.data);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    isTrue(item) {
      return item == "1" ? true : false;
    },
    async changerol(e) {
      let idrol = e.id_rol;
      let resmodulo = await this.getbyrol(idrol);
      this.listmodulos = resmodulo;
    },
  },
  async mounted() {
    let resrol = await this.getroles();
    this.listroles = resrol;
    this.rol = this.listroles[0];
    this.changerol(this.rol);
  },
};
</script>