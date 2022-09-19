<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    // this.gradient = this.$refs.canvas
    //   .getContext("2d")
    //   .createLinearGradient(0, 0, 0, 450);

    // this.gradient.addColorStop(0.2, "rgba(2, 194, 189, 0.4)");
    // this.gradient.addColorStop(1, "rgba(229, 250, 249, 0)");

    // this.addPlugin({
    //   id: "my-plugin",
    //   afterDraw: (chart) => {
    //     var ctx = chart.ctx;
    //     ctx.save();
    //     ctx.fillText("CO2", 5, 2);
    //     ctx.fillText("°C", 46, 2);
    //     ctx.restore();
    //   },
    // });

    // Chart.plugins.register({
    //   afterDraw: (chart) => {
    //     var ctx = chart.ctx;
    //     ctx.save();
    //     ctx.fillText('CO2', 5, 2);
    //     ctx.fillText('°C', 46, 5);
    //     ctx.restore();
    //   },
    // });

    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            // CONFIG
            label: "Orders",
            yAxisID: "Orders",
            data: [40, 39, 20, 40, 39, 80, 40],
            // STYLES
            borderColor: "#F5C006",
            pointBackgroundColor: "#F5C006",
            pointRadius: 6,
            pointBorderWidth: 4,
            pointBorderColor: "white",
            borderWidth: 2,
            backgroundColor: "transparent",
          },
          {
            // CONFIG
            label: "GMV",
            yAxisID: "GMV",
            data: [60, 55, 32, 20, 20, 12, 53],
            // STYLES
            borderColor: "#02C2BD",
            pointBackgroundColor: "#02C2BD",
            pointRadius: 6,
            pointBorderWidth: 4,
            pointBorderColor: "white",
            borderWidth: 2,
            backgroundColor: this.gradient,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        stacked: false,
        legend: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
          xPadding: 20,
          ypadding: 15,
          yAlign: "bottom",
          // caretSize: 0,
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 6,
              },
            },
          ],
          yAxes: [
            {
              id: "Orders",
              type: "linear",
              position: "left",
              // offset: true,
              // scaleLabel: {
              //   display: true,
              //   labelString: "Orders",
              //   fontColor: "#F5C006",
              //   fontStyle: "bold",
              // },
              gridLines: {
                drawBorder: false,
                display: false,
              },
              // grid : {
              //   offset: true,
              // }
              ticks: {
                beginAtZero: true,
                // max: 1,
                // min: 0,
              },
            },
            {
              id: "GMV",
              type: "linear",
              position: "left",
              // offset: true,
              // scaleLabel: {
              //   display: true,
              //   labelString: "GMV",
              //   fontColor: "#02C2BD",
              //   fontStyle: "bold",
              // },
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
          ],
        },
      }
    );
  },
};
</script>
