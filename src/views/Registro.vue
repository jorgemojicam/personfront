<template>
<h1>Registro</h1>
</template>

<script>
import srvregistro from '../services/registro'
export default {

  name: "Registro",
  components: {},
  methods:{
      get(){
        return new Promise(resolve=>{
            srvregistro.get().then((sus)=>{
                resolve(sus)
            },(err)=>{
                console.log(err)
                resolve(null)
            })
        })    
      }
  },
  async mounted(){
      let res = await this.get()
      console.log(res)
  }
  
};
</script>