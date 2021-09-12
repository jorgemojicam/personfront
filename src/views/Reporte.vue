<template>
  <v-container bg fill-height grid-list-md text-xs-center>
  
  </v-container>
</template>

<script>

export default {
  name: "reporte",
  props: {},
  data() {
    return {
      valid: true,    
      error: null,
      snackbar: false,
      snacktext: "",
      timeout: 5000,
    };
  },
  components: {},
  methods: {
  
  },
  mounted() {},
};
</script>