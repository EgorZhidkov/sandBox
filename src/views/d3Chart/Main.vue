<template>
  <div>
    <LineChartD3 />
    <ZoomPan />
    <div>
      <TestZoom />
    </div>
  </div>
</template>

<script>
import LineChartD3 from "./LineChartD3.vue";
import ZoomPan from "./Zoom_Pan.vue";
import TestZoom from "./TestZoom.vue";
export default {
  name: "Main",
  components: {
    LineChartD3,
    ZoomPan,
    TestZoom,
  },
  data() {
    return {
      width: 750,
      height: 400,
      margin: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50,
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style></style>
