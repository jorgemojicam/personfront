<template>
  <v-app id="login" class="secondary">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../assets/logo.svg"
                    alt="Vue Material Admin"
                    width="180"
                    height="180"
                  />
                  <h1 class="flex my-4 primary--text">Iniciar sesion</h1>
                </div>

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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="login" block color="primary"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snacktext }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
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

<style scoped>
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>