<template>
  <div>
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Registro usuarios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-stepper alt-labels v-model="e1">
          <v-stepper-header>
            <v-stepper-step editable :complete="e1 > 1" step="1">
              Datos usuario
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :editable="iduser > 0" :complete="e1 > 2" step="2">
              Cuenta Acceso
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- datos generales del usuario -->
            <v-stepper-content step="1">
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="cedula"
                        label="Cedula"
                        type="number"
                        :rules="[(va) => !!va || 'Cedula requerida']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="nombre"
                        label="Nombres"
                        :rules="[(va) => !!va || 'Numero requerido']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="apellido"
                        label="Apellidos"
                        :rules="[(va) => !!va || 'Apellidos requeridos']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="[(va) => !!va || 'Email requerid']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-switch
                        v-model="coordinador"
                        :label="`Es Coordinador?`"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="success mr-4"
                    :disabled="!valid"
                    type="button"
                    @click="guardar"
                  >
                    <span v-if="iduser > 0">Editar</span>
                    <span v-if="iduser == 0">Guardar</span>
                  </v-btn>
                  <v-btn
                    color="primary"
                    :disabled="iduser == 0"
                    @click="e1 = 2"
                  >
                    Continuar
                  </v-btn>
                </v-container>
              </v-form>
            </v-stepper-content>
            <!-- cuenta de acceso  -->
            <v-stepper-content step="2">
              <v-container>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      :rules="[(va) => !!va || 'Nombre de usuario requerido']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="passw"
                      label="Contraseña"
                      type="password"
                      :rules="[(va) => !!va || 'Contraseña requerida']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="confirmpassw"
                      label="Confirmar Contraseña"
                      type="password"
                      :rules="[(va) => !!va || 'Contraseña requerida']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="rol"
                      :items="listroles"
                      item-text="nombre_rol"
                      item-value="id_rol"
                      label="Rol"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col cols="12"> </v-col>
                </v-row>
                <v-btn color="primary mr-4" @click="e1 = 1"> Atras </v-btn>
                <v-btn
                  class="success mr-4"
                  :disabled="!valid"
                  type="button"
                  @click="guardaracceso"
                >
                  Guardar
                </v-btn>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>

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
          <v-btn class="mx-2" fab dark color="primary" @click="oncreate">
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

    <v-snackbar :timeout="-1" :color="snackcolor" v-model="snackbar">
      {{ textsnakbar }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import srvusuarios from "../services/users.service";
import srvcuentaacceso from "../services/cuentaacceso.service";
import srvroles from "../services/roles.service";

export default {
  name: "Usuarios",
  components: {},
  data() {
    return {
      iduser: 0,
      idcuentaacceso: 0,
      nombre: "",
      apellido: "",
      email: "",
      cedula: "",
      username: "",
      passw: "",
      confirmpassw: "",
      rol: "",
      dialog: false,
      listroles: [],
      coordinador: false,
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
      e1: 1,
      snackbar: false,
      snackcolor: "success",
      textsnakbar: "Evento realizado",
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
    update(data) {
      return new Promise((resolve) => {
        srvusuarios.update(data).then(
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
    createacceso(data) {
      return new Promise((resolve) => {
        srvcuentaacceso.insert(data).then(
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
    updateacceso(data) {
      return new Promise((resolve) => {
        srvcuentaacceso.update(data).then(
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
    async oncreate() {
      this.dialog = true;
      this.iduser = 0;
      this.idcuentaacceso = 0;
      this.nombre = "";
      this.apellido = "";
      this.email = "";
      this.cedula = "";
    },
    async onedit(e) {
      console.log(e);
      this.dialog = true;
      this.iduser = e.id_use;
      this.nombre = e.nombre_use;
      this.apellido = e.apellido_use;
      this.email = e.email_use;
      this.cedula = e.cedula_use;
      this.username = e.username_cue;
      this.coordinador = e.coordinador_use;
      this.rol = e.idroles_cue;
      this.idcuentaacceso = e.id_cue;
    },
    async guardar() {
      if (this.$refs.form.validate()) {
        const data = {
          nombre: this.nombre,
          apellido: this.apellido,
          email: this.email,
          cedula: this.cedula,
          coordinador: this.coordinador,
        };

        if (parseInt(this.iduser) == 0) {
          let rescrea = await this.create(data);
          if (rescrea && rescrea.insertId > 0) {
            this.iduser = rescrea.insertId;
            await this.load();
            this.textsnakbar = "Se creo el usuario correctamente";
            this.snackbar = true;
          } else {
            this.snackbar = true;
            this.snackcolor = "error";
          }
        } else {
          data.iduser = this.iduser;
          let rescrea = await this.update(data);

          if (rescrea && rescrea.affectedRows > 0) {
            await this.load();
            this.textsnakbar = "Se edito el usuario correctamente";
            this.snackbar = true;
          } else {
            this.textsnakbar = "Error! no se logro editar";
            this.snackcolor = "error";
            this.snackbar = true;
          }
        }
      }
    },
    async guardaracceso() {
      let data = {
        username: this.cedula,
        password: this.passw,
        iduser: this.iduser,
        idrol: this.rol,
      };
      if (this.idcuentaacceso == 0) {
        let rescrea = await this.createacceso(data);
        if (rescrea && rescrea.insertId > 0) {
          this.idcuentaacceso = rescrea.insertId;
          await this.load();
          this.textsnakbar = "Se creo cuenta de acceso correctamente";
          this.snackbar = true;
        } else {
          this.textsnakbar = "Error! no se logro editar";
          this.snackbar = true;
        }
      } else {
        data.id = this.idcuentaacceso;
        console.log("parametros ->", data);
        let res = await this.updateacceso(data);
        if (res && res.affectedRows > 0) {
          console.log("entro aqui");
          this.textsnakbar = "Se edito la cuenta de acceso correctamente";
          this.snackbar = true;
        } else {
          this.snackcolor = "error";
          this.textsnakbar = "Error! no se logro editar";
          this.snackbar = true;
        }
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
    let resrol = await this.getroles();
    this.listroles = resrol;
  },
};
</script>