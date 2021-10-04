<template>
  <v-app>
    <v-app-bar color="deep-purple accent-4" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Validacion de firmas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="logout">mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            this.$store.state.user.nombre_use +
            " " +
            this.$store.state.user.apellido_use
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.nombre_mod"
          link
          :to="{
            name: item.ruta_mod,
            params: { id: { ver: item.ver, crear: 0, editar: 1, eliminar: 0 } },
          }"        
        >
    
            <v-list-item-icon >
              <v-icon>{{ item.icono_mod }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content >
              <v-list-item-title>{{ item.nombre_mod }}</v-list-item-title>
            </v-list-item-content>
    
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container class="mt-14">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>


<script>
import srvlocalStorage from "../services/localstorage.service";
import srvmodulos from "../services/modulos.service";
export default {
  name: "Contenedor",

  data: () => ({
    drawer: false,
    group: null,
    items: [],
  }),
  methods: {
    logout() {
      srvlocalStorage.deleteStorage();
      srvlocalStorage.setState(false);
      this.$store.state.isAuthenticated = false;
      this.$router.push("login");
    },
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
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  async mounted() {
    let rolUser = this.$store.state.user.idroles_cue;

    let modulos = await this.getbyrol(rolUser);
    if (modulos) {
      this.items = modulos;
    }

  },
};
</script>
