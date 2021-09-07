<template>
  <div>
    <form>
      <v-text-field
        v-model="name"    
        :counter="10"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email" 
        label="E-mail"
        required  
      ></v-text-field>

      <v-btn class="mr-4"> submit </v-btn>
    </form>

    <v-data-table
      :headers="headers"
      :items="registrofirmas"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-chip :color="getColor(item.calories)" dark>
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import srvregistro from "../services/registro";
export default {
  name: "Registro",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      headers: [
        { text: "id", value: "id" },
        { text: "numeroinvalidas", value: "numeroinvalidas" },
      ],
      registrofirmas: [],
    };
  },
  methods: {
    get() {
      return new Promise((resolve) => {
        srvregistro.get().then(
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
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
  },
  async mounted() {
    let res = await this.get();
    this.registrofirmas = res.data;
    console.log(res.data);
  },
};
</script>