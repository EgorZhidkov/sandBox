<template>
  <div style="width: 650px; height: 650px">
    <BarChart :chart-data="datacollection" ref="chart" />
    <BarChart :chart-data="datacollection_test" ref="chart" />
    <!-- <test-line></test-line> -->
    <button @click="addData()">Randomize</button>
    <!-- <apexchart
      width="800"
      type="line"
      :options="options"
      :series="series"
    ></apexchart> -->
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import x_axes from "./x-axes.js";
import x_axes_copy from "./x-axes copy";
import y_axes_copy from "./y-axes copy";
import y_axes from "./y-axes.js";
import MTIA_data from "./MTIA/MTIA_data";
import MTIA_data_copy from "./MTIA/MTIA_data copy";
import MDIA_data_copy from "./MDIA/MDIA_data copy";
import MDIA_data from "./MDIA/MDIA_data";

import TestLine from "./TestLine.vue";
export default {
  name: "Chart",
  components: {
    BarChart,
    TestLine,
  },
  computed: {
    opt() {
      return this.options;
    },
    chart() {
      return this.chartData;
    },
  },
  data() {
    return {
      datacollection: {},
      datacollection_test: {},
      backcolor: "red",
      // options: {
      //   chart: {
      //     id: "vuechart-example",
      //   },
      //   xaxis: {
      //     categories: x_axes,
      //     labels: {
      //       datetimeFormatter: {
      //         month: "MMM 'yy",
      //         day: "dd MMM",
      //         hour: "HH:mm",
      //       },
      //     },
      //   },
      //   yaxis: [
      //     {
      //       // decimalsInFloat: 0,
      //       labels: {
      //         show: true,
      //         align: "left",
      //         style: {
      //           colors: "red",
      //         },
      //         // offsetY: 100,
      //       },
      //       axisBorder: {
      //         show: true,
      //       },
      //       axisTicks: {
      //         show: true,
      //         borderType: "dotted",
      //       },
      //       forceNiceScale: true,
      //       title: {
      //         offsetX: 2,
      //         text: "MTIA",
      //       },
      //     },
      //     {
      //       // decimalsInFloat: 0,
      //       forceNiceScale: true,
      //       title: {
      //         text: "MTOA",
      //       },
      //     },
      //     {
      //       // decimalsInFloat: 0,
      //       forceNiceScale: true,
      //       title: {
      //         text: "MDIA",
      //       },
      //     },
      //   ],
      // },
      series: [
        {
          name: "MTIA",
          data: MTIA_data,
        },
        {
          name: "MTOA",
          data: y_axes,
        },
        {
          name: "MDIA",
          data: MDIA_data,
        },
      ],
    };
  },
  mounted() {
    this.datacollection = {
      labels: x_axes,
      // labels: ["January", "Feb", "seb", "kek", "dev"],
      datasets: [
        {
          label: "MDIA",
          backgroundColor: "#f87979",
          data: MDIA_data,
          // data: [40, 39, 10, 40, 39, 80, 40],
          fill: false,
          borderColor: "red",
          yAxisID: "MDIA",
        },
        {
          label: "MTIA",
          backgroundColor: "#0000ff",
          data: MTIA_data,
          fill: false,
          borderColor: "#0000ff",
          yAxisID: "MTIA",
        },
        {
          label: "MTOA",
          backgroundColor: "#8B4513",
          data: y_axes,
          fill: false,
          borderColor: "#8B4513",
          yAxisID: "MTOA",
        },
        // {
        //   label: "Data One",
        //   backgroundColor: "#f87979",
        //   data: MTIA_data,
        //   fill: false,
        // },
      ],
    };
    this.datacollection_test = {
      labels: x_axes_copy,
      // labels: ["January", "Feb", "seb", "kek", "dev"],
      datasets: [
        {
          label: "MDIA",
          backgroundColor: "#f87979",
          data: MDIA_data_copy,
          // data: [40, 39, 10, 40, 39, 80, 40],
          fill: false,
          borderColor: "red",
          yAxisID: "MDIA",
        },
        {
          label: "MTIA",
          backgroundColor: "#0000ff",
          data: MTIA_data_copy,
          fill: false,
          borderColor: "#0000ff",
          yAxisID: "MTIA",
        },
        {
          label: "MTOA",
          backgroundColor: "#8B4513",
          data: y_axes_copy,
          fill: false,
          borderColor: "#8B4513",
          yAxisID: "MTOA",
        },
        // {
        //   label: "Data One",
        //   backgroundColor: "#f87979",
        //   data: MTIA_data,
        //   fill: false,
        // },
      ],
    };
    this.fillData();
  },
  methods: {
    addData() {
      x_axes.push(8);
      this.fillData(this.backcolor);
      this.datacollection.datasets[0].data.push();
    },
    fillData(border_color) {},
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },

  // data() {
  //   return {
  //     chartData: {
  //       labels: x_axes,
  //       datasets: [
  //         {
  //           fill: false,
  //           label: "MTOA",
  //           data: y_axes,
  //           borderColor: "#77b7cd",
  //         },
  //         {
  //           label: "MTIA",
  //           data: MTIA_data,
  //           borderColor: "red",
  //           fill: false,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         yAxes: [
  //           {
  //             // display: true,
  //             position: "bottom",
  //             ticks: {
  //               // precision: 2, // точность округления значений по оси y
  //               // maxTicksLimit: 4, // максимальное количество значений (и рёбер сетки) по оси y
  //               maxTicksLimit: 10,
  //             },
  //           },
  //         ],
  //         xAxes: [
  //           {
  //             position: "right",
  //             type: "time",
  //             // display: true,
  //             ticks: {
  //               maxTicksLimit: 2, // максимальное количество значений (и рёбер сетки) по оси x
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   };
  // },
};
</script>

<style></style>
