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
      solo
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
      <template v-slot:[`item.ver`]="{ item }">
        <v-checkbox
          v-model="item.ver"
          :false-value="0"
          :true-value="1"
          @click="gestion(item)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.editar`]="{ item }">
        <v-checkbox
          v-model="item.editar"
          :false-value="0"
          :true-value="1"
          @click="gestion(item)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.crear`]="{ item }">
        <v-checkbox
          v-model="item.crear"
          :false-value="0"
          :true-value="1"
          @click="gestion(item)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.eliminar`]="{ item }">
        <v-checkbox
          v-model="item.eliminar"
          :false-value="0"
          :true-value="1"
          @click="gestion(item)"
        ></v-checkbox>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import srvmodulos from "../services/modulos.service";
import srvroles from "../services/roles.service";
import srvpermisos from "../services/permisos.service";
export default {
  name: "permisos",
  props: {},
  data() {
    return {
      rol: "",
      headers: [
        { text: "Nombre", value: "nombre_mod" },
        { text: "Ver", value: "ver" },
        { text: "Crear", value: "crear" },
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
    update(data) {
      return new Promise((resolve) => {
        srvpermisos.update(data).then(
          (suss) => {
            if (suss) {
              resolve(suss);
            }
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        );
      });
    },
    insert(data) {
      return new Promise((resolve) => {
        srvpermisos.insert(data).then(
          (suss) => {
            if (suss) {
              resolve(suss);
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
    async changerol(e) {
      let idrol = e.id_rol;
      let resmodulo = await this.getbyrol(idrol);
      this.listmodulos = resmodulo;
    },
    async gestion(item) {
      console.log(item);
      let data = {
        idrol: this.rol.id_rol,
        idmodulo: item.id_mod,
        ver: item.ver,
        crear: item.crear,
        editar: item.editar,
        eliminar: item.eliminar,
      };
      if (item.id) {
        data.id = item.id;
        let resup = await this.update(data);
        console.log("insert -> ", resup);
        this.load();
      } else {
        let resin = await this.insert(data);
        console.log("update -> ", resin);
        this.load();
      }
    },
    load() {
      this.rol = this.listroles[0];
      this.changerol(this.rol);
    },
  },
  async mounted() {
    let resrol = await this.getroles();
    this.listroles = resrol;
    this.load();
  },
};
</script>