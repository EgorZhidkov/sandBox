<template>
  <div>
    <div v-for="item in array1" :key="item.id">
      {{ item }}
    </div>
    <br />
    <div v-for="item in array2" :key="item.id">
      {{ item }}
    </div>
    <b-button @click="compare(array1, array2)">{{ json === json2 }}</b-button>
  </div>
</template>

<script>
import DpCheckBox from "../DpCheckBox.vue";
export default {
  name: "CheckBoxTest",
  data() {
    return {
      array1: [{ id: 1 }, { id: 2 }],
      array2: [{ id: 2 }, { id: 1 }],
      bool: null,
      json: [1, 2, 3],
      json2: [1, 2, 3],
      finalArray: [],
    };
  },
  components: {
    DpCheckBox,
  },
  methods: {
    submit() {
      let testArray = this.finalArray;
      testArray = testArray.map((items) => {
        delete items.name;
        return items;
      });
      console.log("json", this.json);
      console.log("test", testArray);
    },
    compare(a, b) {
      let status = true;
      b.sort(this.sort);
      console.log(b);
      a.map((item, index) => {
        if (item.id !== b[index].id) {
          status = false;
        }
      });
      this.bool = status;
      return this.bool;
    },
    sort(a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    },
    toggleAll(checked) {
      this.finalArray = checked ? this.json.slice() : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.listbox {
  display: flex;

  justify-content: center;
  align-items: center;
  & > div {
    margin-right: 20px;
  }
}
</style>
