<script>
import { Bar, Line, mixins } from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";

export default {
  name: "BarChart",
  extends: Line,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      // options: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   pan: {
      //     enabled: true,
      //     mode: "xy",
      //   },
      //   zoom: {
      //     enabled: true,
      //     mode: "xy",
      //   },
      //   plugins: [
      //     {
      //       id: "kwhWeek",
      //       beforeDraw(chart) {
      //         console.log(chart);
      //         const width = chart.chart.width;
      //         const height = chart.chart.height;
      //         const ctx = chart.chart.ctx;
      //         ctx.restore();
      //         const fontSize = (height / 114).toFixed(2);
      //         ctx.font = `${fontSize}em sans-serif`;
      //         ctx.textBaseline = "middle";
      //         const text = "4511kWh";
      //         const textX = Math.round(
      //           (width - ctx.measureText(text).width) / 2
      //         );
      //         const textY = height / 2;
      //         ctx.fillText(text, textX, textY);
      //         ctx.save();
      //       },
      //     },
      //   ],
      // },
      options: {
        responsive: true,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              enabled: true,
              mode: "xy",
              speed: 0.2,
            },
          },
        },
        scales: {
          // xAxes: [
          //   {
          //     ticks: {
          //       maxTicksLimit: 6,
          //     },
          //   },
          // ],
          yAxes: [
            {
              id: "MDIA",
              type: "linear",
              position: "left",
              // offset: true,
              scaleLabel: {
                display: true,
                labelString: "MDIA",
                fontColor: "#F5C006",
                fontStyle: "bold",
              },
              gridLines: {
                drawBorder: false,
                display: false,
              },
              // grid : {
              //   offset: true,
              // }
              // ticks: {
              //   beginAtZero: true,
              //   // max: 1,
              //   // min: 0,
              // },
            },
            {
              id: "MTIA",
              type: "linear",
              position: "left",
              // offset: true,
              scaleLabel: {
                display: true,
                labelString: "MTIA",
                fontColor: "#02C2BD",
                fontStyle: "bold",
              },
              title: {
                display: true,
                align: "top",
              },
              // grid : {
              //   offset: true
              // },
              ticks: {
                // max: 1,
                // min: 0,
                //   callback: function(value, index, values) {
                //       // write a logic here to format GMV units
                //      // https://www.chartjs.org/docs/latest/axes/labelling.html#creating-custom-tick-formats
                //   }
              },
            },
            {
              id: "MTOA",
              type: "linear",
              position: "left",
              // offset: true,
              scaleLabel: {
                display: true,
                labelString: "MTOA",
                fontColor: "#02C2BD",
                fontStyle: "bold",
              },
              title: {
                display: true,
                align: "top",
              },
              // grid : {
              //   offset: true
              // },
              ticks: {
                max: 6,
                min: 5,
                //   callback: function(value, index, values) {
                //       // write a logic here to format GMV units
                //      // https://www.chartjs.org/docs/latest/axes/labelling.html#creating-custom-tick-formats
                //   }
              },
            },
          ],
        },
      },
    };
  },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    // options: {
    //   type: Object,
    //   default: null,
    // },
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart(this.chartData, this.options);
        console.log("change");
      },
    },
  },
  mounted() {
    this.addPlugin(zoom);
    this.renderChart(this.chartData, this.options);
    console.log(this.chartData);
  },
};
</script>
