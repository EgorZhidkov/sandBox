<template>
  <div id="chart" />
</template>

<script>
import DateAxes from "../ChartJs/x-axes";
import MDIA from "../ChartJs/MDIA/MDIA_data";
import MDIA_data from "../ChartJs/MDIA/MDIA_data";
import * as d3 from "d3";
import MTIA_data from "../ChartJs/MTIA/MTIA_data";
import x_axes from "../ChartJs/x-axes";
import realTime from "./realTime";
export default {
  name: "LineChartD3",
  data() {
    return {
      width: null,
      height: null,
      margin: { top: 20, right: 20, bottom: 0, left: 110 },
    };
  },
  methods: {
    init() {
      const minDate = d3.min(DateAxes, function (d) {
        return new Date(d);
      });
      const maxDate = d3.max(DateAxes, function (d) {
        return new Date(d);
      });
      const legend = ["MDIA", "MTIA"];
      const minXaxesMDIA = d3.min(MDIA_data);
      const maxXaxesMDIA = d3.max(MDIA_data);
      const minXaxesMTIA = d3.min(MTIA_data);
      const maxXaxesMTIA = d3.max(MTIA_data);
      let TestData = [];
      TestData = DateAxes.map((item, index) => {
        let object = {};
        object.data = new Date(DateAxes[index]);
        object.value = +MDIA_data[index];
        return object;
      });
      let TestDataMTIA = [];
      TestDataMTIA = DateAxes.map((item, index) => {
        let object = {};
        object.data = new Date(DateAxes[index]);
        object.value = +MTIA_data[index];
        return object;
      });
      let yScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, this.height]);
      const yAxis = d3
        .axisLeft(yScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d %H:%M:%S"))
        .ticks(10);
      const xScale = d3
        .scaleLinear()
        .domain([minXaxesMDIA, maxXaxesMDIA])
        .range([0, this.width]);
      const xAxis = d3.axisBottom(xScale).ticks(6);

      const xScaleMTIA = d3
        .scaleLinear()
        .domain([minXaxesMTIA, maxXaxesMTIA])
        .range([0, this.width]);
      const xAxisMTIA = d3.axisBottom(xScaleMTIA).ticks(10);
      const lineMDIA = d3
        .line()
        .x((d) => xScale(d.value))
        .y((d) => yScale(d.data));
      const lineMTIA = d3
        .line()
        .x((d) => xScaleMTIA(d.value))
        .y((d) => yScale(d.data));
      const brush = d3
        .brushX() // Add the brush feature using the d3.brush function
        .extent([
          [0, 0],
          [this.width, this.height],
        ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart);

      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", 400)
        .attr("height", 900)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );

      // svg
      //   .append("path")
      //   .data(TestDataMTIA)
      //   .attr("stroke", "red")
      //   .style("fill", "transparent")
      //   .attr("class", "line")
      //   .attr("d", lineMTIA(TestDataMTIA));

      svg
        .append("g")
        .attr("class", "y_axis")
        .attr("transform", "translate(0,0)") // This controls the vertical position of the Axis
        .call(yAxis);

      svg
        .append("g")
        .attr("class", "x_axis_MDIA")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 7)
        .attr("x", 0)
        .attr("transform", "rotate(0)");
      // svg
      //   .append("g")
      //   .attr("class", "x_axis_MTIA")
      //   .attr("transform", "translate(0," + (this.height + 30) + ")")
      //   .call(xAxisMTIA)
      //   .selectAll("text")
      //   .attr("y", 7)
      //   .attr("x", 0)
      //   .attr("transform", "rotate(0)");

      const clip = svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("x", 0)
        .attr("y", 0);

      // const lineSvgMDIA = svg.append("g").attr("clip-path", "url(#clip)");
      var lineSvgMDIA = svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(TestData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", lineMDIA);
      const lineSvgMTIA = svg.append("g").attr("clip-path", "url(#clip)");
      // lineSvgMDIA
      //   .append("path")
      //   .datum(TestData)
      //   .attr("class", "line") // I add the class line to be able to modify this line later on.
      //   .attr("fill", "none")
      //   .attr("stroke", "black")
      //   .attr("stroke-width", 1.5)
      //   .attr("d", lineMDIA);

      lineSvgMDIA.append("g").attr("class", "brush").call(brush);

      var idleTimeout;
      function idled() {
        idleTimeout = null;
      }

      function updateChart(event, d) {
        let extent = event.selection;
        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
          xScale.domain([4, 8]);
        } else {
          xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])]);
          xScaleMTIA.domain([
            xScaleMTIA.invert(extent[0]),
            xScaleMTIA.invert(extent[1]),
          ]);
          lineSvgMDIA.select(".brush").call(brush.move, null);
          lineSvgMTIA.select(".brush").call(brush.move, null);
        }
        svg
          .select(".x_axis_MDIA")
          .transition()
          .duration(1000)
          .call(xAxis.ticks(2));
        svg
          .select(".x_axis_MTIA")
          .transition()
          .duration(1000)
          .call(xAxisMTIA.ticks(2));
        lineSvgMDIA
          .select(".line")
          .transition()
          .duration(1000)
          .attr("d", lineMDIA);
        lineSvgMTIA
          .select(".line")
          .transition()
          .duration(1000)
          .attr("d", lineMTIA);
      }
      svg.on("dblclick", function () {
        xScale.domain([minXaxesMDIA, maxXaxesMDIA]);
        xScaleMTIA.domain([minXaxesMTIA, maxXaxesMTIA]);
        svg.select(".x_axis_MDIA").transition().call(xAxis.ticks(6));
        svg.select(".x_axis_MTIA").transition().call(xAxisMTIA.ticks(10));
        lineSvgMDIA.select(".line").transition().attr("d", lineMDIA);
        lineSvgMTIA.select(".line").transition().attr("d", lineMTIA);
      });

      const legendSVG = svg
        .selectAll(".legend")
        .data(legend.map((d) => d))
        .enter()
        .append("font")
        .attr("class", "legend") // style the legend
        .attr("width", 100)
        .attr("height", 0)
        .html((d) => d);

      setInterval(() => {
        tick();
      }, 100);

      function tick() {
        if (realTime.length == 0) {
          return;
        } else {
          realTime[0].data = new Date(realTime[0].data);
          realTime[0].value = +realTime[0].value;
          // console.log(realTime[0], TestData[0]);
          let newMinData = d3.min(TestData, (item) => {
            return item.data;
          });
          let newMaxData = d3.max(TestData, (item) => {
            return item.data;
          });

          svg
            .selectAll(".y_axis")
            .attr("transform", "translate(0,0)") // This controls the vertical position of the Axis
            .call(yAxis);
          yScale.domain([newMinData, newMaxData]);
          // console.log(newMinData, newMaxData);
          // console.log(TestData.length);
          TestData.push(realTime[0]);
          TestData.shift();
          // console.log(TestData.length);

          // redraw the line, and slide it to the left
          lineSvgMDIA.attr("d", lineMDIA).attr("transform", null);
          // .transition(d3.easeLinear)
          // .duration(500)
          // .attr("transform", "translate(" + xScale(-1) + ",0)");
          // .each("end", tick());

          // pop the old data point off the front

          realTime.shift();
          // TestData.shift();
          // console.log("realTime", realTime);
          // console.log(
          //   "TestData",
          //   TestData[TestData.length - 2],
          //   "td",
          //   TestData[TestData.length - 1]
          // );
        }
      }
      // let focus = svg
      //   .append("g")
      //   .attr("class", "focus")
      //   .style("display", "none");
      // focus.append("circle").attr("r", 5);

      // focus
      //   .append("rect")
      //   .attr("class", "tooltip")
      //   .attr("width", 100)
      //   .attr("height", 50)
      //   .attr("x", 10)
      //   .attr("y", -22)
      //   .attr("rx", 4)
      //   .attr("ry", 4);

      // focus
      //   .append("text")
      //   .attr("class", "tooltip-date")
      //   .attr("x", 18)
      //   .attr("y", -2);

      // focus.append("text").attr("x", 18).attr("y", 18).text("Likes:");

      // focus
      //   .append("text")
      //   .attr("class", "tooltip-likes")
      //   .attr("x", 60)
      //   .attr("y", 18);

      // svg
      //   .append("rect")
      //   .attr(
      //     "transform",
      //     "translate(" + this.margin.left + "," + this.margin.top + ")"
      //   )
      //   .attr("class", "overlay")
      //   .attr("width", this.width)
      //   .attr("height", this.height)
      //   .on("mouseover", function () {
      //     focus.style("display", null);
      //   })
      //   .on("mouseout", function () {
      //     focus.style("display", "none");
      //   })
      //   .on("mousemove", mousemove);

      // function mousemove(event) {
      //   let x0 = xScale.invert(d3.pointer(event, svg));
      //   let i = bisectDate(TestData, x0, 1);
      //   let d0 = TestData[i - 1];
      //   console.log(x0);
      //   let d1 = TestData[i];
      //   let d = x0 - d0.data > d1.data - x0 ? d1 : d0;

      //   focus.attr(
      //     "transform",
      //     "translate(" + x(d.data) + "," + y(d.value) + ")"
      //   );
      //   focus.select("text").text(function () {
      //     return d.value;
      //   });
      //   focus.select(".x-hover-line").attr("y2", this.height - y(d.value));
      //   focus.select(".y-hover-line").attr("x2", this.width + this.width);
      // }
    },
  },
  mounted() {
    this.width = 300 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
    this.init();
  },
};
</script>

<style>
body {
  background-color: #f1f3f3;
}
.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;

  /* stroke-width: 2px; */
  shape-rendering: crispEdges;
}

.overlay {
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: #f1f3f3;
  stroke: #6f257f;
  stroke-width: 5px;
}
</style>
