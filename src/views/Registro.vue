<template>
  <v-data-table :headers="headers" :items="desserts" class="elevation-1">
    <template v-slot:[`item.actions`]="{ item }">
      <v-chip :color="getColor(item.calories)" dark>
        {{ item.calories }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import srvregistro from "../services/registro";
export default {
  name: "Registro",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
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
    console.log(res);
  },
};
</script>