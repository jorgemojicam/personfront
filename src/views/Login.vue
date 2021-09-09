<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-row align="center" justify="center">
      <v-card  max-width="400" outlined>
        <v-img
          class="white--text align-end"          
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-img>
        <v-card-title> Inicio de sesion </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              label="Cedula"
              :rules="[(v) => !!v || 'Ingrese cedula']"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              :rules="[(v) => !!v || 'Ingrese contraseña']"
              label="Contrasena"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="login"
            >
              Login
            </v-btn>
            <v-btn color="warning"> Recuperar Contraseña </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snacktext }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import srvCuentaacceso from "../services/cuentaacceso.service";
import srvlocalStorage from "../services/localstorage.service";
export default {
  name: "login",
  props: {},
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      error: null,
      snackbar: false,
      snacktext: "",
      timeout: 5000,
    };
  },
  components: {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let cuenta = {
          username: this.username,
          password: this.password,
        };

        srvCuentaacceso.auth(cuenta).then(
          (suss) => {
            if (suss.data) {
              if (suss.data && suss.data.dataUser) {
                this.$store.state.isAuthenticated = true;
                this.$store.state.user = suss.data.dataUser;
                srvlocalStorage.setState(true);
                srvlocalStorage.setToken(suss.data.accesToken);
                srvlocalStorage.setUser(suss.data.dataUser);
                console.log("entro login");
                this.$router.push("/");
              }
            } else {
              console.log("error");
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        alert("err");
      }
    },
  },
  mounted() {},
};
</script>