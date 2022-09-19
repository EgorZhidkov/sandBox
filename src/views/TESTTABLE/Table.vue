<template>
  <div>
    <table style="margin-left: 20px">
      <tr>
        <th class="header">First</th>
        <th class="header">Second</th>
        <th class="header">Third</th>
        <th class="header">Fourth</th>
        <th class="header">Fifth</th>
      </tr>
      <tr v-for="item in card" :key="item.state">
        <td class="cell">
          {{ item.state }}
        </td>
        <td v-for="kust in item.state_info" :key="kust.kust" rowspan="2">
          {{ kust.kust }}
        </td>
      </tr>
    </table>
    {{ card }}
  </div>
</template>

<script>
import cards from "../card";
export default {
  name: "Table",
  data() {
    return {
      card: null,
    };
  },
  mounted() {
    this.card = cards;
  },
};
</script>

<style lang="scss" scoped>
.cell {
  padding: 14px 16px;
  border: 1px solid grey;
}
.header {
  padding: 10px;
  border: 1px solid grey;
}
</style>
