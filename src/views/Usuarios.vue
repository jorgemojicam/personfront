<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-form @submit.prevent="submit" ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="cedula"
                    label="Cedula"
                    type="number"
                    :rules="[(va) => !!va || 'Cedula requerida']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="nombre"
                    label="Nombres"
                    :rules="[(va) => !!va || 'Numero requerido']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="apellido"
                    label="Apellidos"
                    :rules="[(va) => !!va || 'Apellidos requeridos']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="[(va) => !!va || 'Email requerid']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12"> </v-col>
              </v-row>
              <v-btn class="success mr-4" :disabled="!valid" type="submit">
                Guardar
              </v-btn>
              <v-btn class="mr-4"> Limpiar </v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-data-table
      :headers="encabezado"
      :items="listusuarios"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USUARIOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" fab dark color="primary" @click="dialog = true">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn color="warning" icon @click="onedit(item)" small>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn color="secondary" icon @click="onedit(item)" small>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import srvusuarios from "../services/users.service";

export default {
  name: "Usuarios",
  components: {},
  data() {
    return {
      nombre: "",
      apellido: "",
      email: "",
      cedula: "",
      dialog: false,
      encabezado: [
        { text: "Nombre", value: "nombre_use" },
        { text: "Apellido", value: "apellido_use" },
        { text: "Cedula", value: "cedula_use" },
        { text: "Email", value: "email_use" },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Eliminar", value: "delete", sortable: false },
      ],
      listusuarios: [],
      valid: true,
    };
  },
  methods: {
    get() {
      return new Promise((resolve) => {
        srvusuarios.get().then(
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
        srvusuarios.insert(data).then(
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
    async onedit(e) {
      console.log(e);
      this.$refs.form.reset();
      this.dialog = true;
      this.nombre = e.nombre_use;
      this.apellido = e.apellido_use;
      this.email = e.email_use;
      this.cedula = e.cedula_use;
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const data = {
          nombre: this.nombre,
          apellido: this.apellido,
          email: this.email,
          cedula: this.cedula,
        };

        let rescrea = await this.create(data);
        if (rescrea && rescrea.insertId > 0) {
          this.dialog = false;
          await this.load();
        } else {
          alert("errrorrr");
        }
        console.log(rescrea);
      }
    },
    async load() {
      let res = await this.get();
      this.listusuarios = res.data;
    },
  },

  computed: {},
  async mounted() {
    await this.load();
  },
};
</script>