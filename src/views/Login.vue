<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-row align="center" justify="center">
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

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Login
        </v-btn>
        <v-btn color="warning"> Recuperar Contraseña </v-btn>
      </v-form>
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
    async login() {
      if (this.$refs.form.validate()) {
        let cuenta = {
          username: this.username,
          password: this.password,
        };

        this.authorization(cuenta).then(
          (suss) => {
            if (suss) {
              console.log(suss)
              if (suss.data && suss.data.datauser) {
                
                this.$store.state.isAuthenticated = true;
                srvlocalStorage.setState(true)
                srvlocalStorage.setUser(suss.data.datauser)
                console.log("entro login")                
                this.$router.push("/");
              }
            }
          },
          (err) => {
            console.log("->", err);
          }
        );
      } else {
        alert("err");
      }
    },
    authorization(user) {
      return new Promise((resolve) => {
        srvCuentaacceso.auth(user).then(
          (res) => {
            if (res.data) {
              resolve(res);
            } else {
              console.log("error");
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
    /*
    async onSuccess(googleUser) {
      if (googleUser) {
        if (datosPerfil.data) {
          sessionStorage.setItem("user", JSON.stringify("userGoo"));
          sessionStorage.setItem("isAuthenticated", true);
          sessionStorage.setItem("perfil", JSON.stringify("datosPerfil.data"));

          this.$store.state.isAuthenticated = true;
          this.$store.state.user = "userGoo";
          this.$store.state.perfil = datosPerfil;
          this.$router.push("/admin");
        } else {
          this.snackbar = true;
          this.snacktext = datosPerfil.error;
        }
      }
    },
    */
  },
  mounted() {},
};
</script>