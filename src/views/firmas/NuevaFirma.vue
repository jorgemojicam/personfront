<template>
  <v-form ref="form" v-model="valid" class="multi-col-validation" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="depto"
          clearable
          filled
          rounded
          solo
          dense
          :items="listdeptos"
          item-text="nombre_dep"
          item-value="id_dep"
          label="Departamento"
          required
          :rules="[v => !!v || 'Departamento requerido']"
          return-object
          @change="changemun($event)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="municipio"
          clearable
          filled
          rounded
          solo
          dense
          :items="listmun"
          item-text="nombre_mun"
          item-value="id_mun"
          label="Municipio"
          required
          :rules="[mun => !!mun || 'Municipio requerido']"
          return-object
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="coordinador"
          clearable
          filled
          rounded
          solo
          dense
          :items="listcoor"
          :item-text="getItemText"
          item-value="id_use"
          label="Coordinador"
          :rules="[va => !!va || 'Coordinador requerido']"
          return-object
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="folio"
          label="Folio"
          type="number"
          outlined
          rounded
          dense
          placeholder="Folio"
          hide-details
          :rules="[va => !!va || 'Numero requerido']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="validas"
          label="Numero Validas"
          type="number"
          outlined
          rounded
          dense
          placeholder="Folio"
          hide-details
          :rules="[va => !!va || 'Numero requerido']"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="novalidas"
          label="Numero no Validas"
          type="number"
          outlined
          rounded
          dense
          placeholder="Folio"
          hide-details
          :rules="[va => !!va || 'Numero requerido']"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="total" outlined rounded dense label="Total" readonly required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn class="primary mr-4" type="submit"> Guardar </v-btn>
        <v-btn type="reset" outlined class="mx-2"> Limpiar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import srvregistro from '../../services/registro'
import srvdepto from '../../services/departamento.service'
import srvmun from '../../services/municpios.service'
import srvusuarios from '../../services/users.service'

export default {
  name: 'NuevaFirma',
  components: {},
  data() {
    return {
      depto: '',
      municipio: '',
      listmun: [],
      listdeptos: [],
      coordinador: '',
      folio: '',
      listcoor: [],
      validas: '',
      novalidas: '',
      registrofirmas: [],
      valid: true,
      paramroute: null,
    }
  },

  computed: {
    total() {
      return (
        // eslint-disable-next-line operator-linebreak
        (this.validas === '' ? 0 : parseInt(this.validas, 10)) +
        (this.novalidas === '' ? 0 : parseInt(this.novalidas, 10))
      )
    },
  },
  created() {
    this.paramroute = this.$route.params.id
    console.log(this.paramroute)
  },
  async mounted() {
    const resdepto = await this.getDepto()
    this.listdeptos = resdepto
    const rescoor = await this.getcoordinador()
    this.listcoor = rescoor
  },
  methods: {
    get(iduser) {
      return new Promise(resolve => {
        srvregistro.getbyuser(iduser).then(
          sus => {
            resolve(sus)
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    create(data) {
      return new Promise(resolve => {
        srvregistro.insert(data).then(
          sus => {
            if (sus && sus.data) {
              resolve(sus.data)
            } else {
              console.log('error ', sus)
              resolve(null)
            }
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    getDepto() {
      return new Promise(resolve => {
        srvdepto.get().then(
          sus => {
            if (sus && sus.data) {
              resolve(sus.data)
            } else {
              console.log('error ', sus)
              resolve(null)
            }
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    getMun(iddep) {
      return new Promise(resolve => {
        srvmun.getbydep(iddep).then(
          sus => {
            if (sus && sus.data) {
              resolve(sus.data)
            } else {
              console.log('error ', sus)
              resolve(null)
            }
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    getcoordinador() {
      return new Promise(resolve => {
        srvusuarios.getcoordinadores().then(
          sus => {
            if (sus && sus.data) {
              resolve(sus.data)
            } else {
              console.log('error ', sus)
              resolve(null)
            }
          },
          err => {
            console.log(err)
            resolve(null)
          },
        )
      })
    },
    getColor(calories) {
      if (calories > 400) return 'red'
      if (calories > 200) return 'orange'

      return 'green'
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const data = {
          numerovalidas: parseInt(this.validas, 10),
          numeroinvalidas: parseInt(this.novalidas, 10),
          total: parseInt(this.total, 10),
          idmunicipio: this.municipio.id_mun,
          fecha: '2021-09-09',
          idcuentaacceso: this.$store.state.user.id_use,
          iduser: this.coordinador.id_use,
          folio: parseInt(this.folio, 10),
        }

        const rescrea = await this.create(data)
        if (rescrea.insertId > 0) {
          // await this.load()
          this.$emit('load', true)
        }
        console.log(rescrea)
      }
    },
    async changemun(iddepto) {
      const resmun = await this.getMun(iddepto.id_dep)
      this.listmun = resmun
    },
    getItemText(item) {
      return `${item.nombre_use} ${item.apellido_use}`
    },
  },
}
</script>
