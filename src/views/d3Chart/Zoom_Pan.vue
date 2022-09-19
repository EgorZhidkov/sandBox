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
import { tip as d3tip } from "d3-v6-tip";
export default {
  name: "ZoomPan",
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
      let key = [
        {
          name: "MDIA",
          active: false,
          color: "red",
        },
        {
          name: "MTIA",
          active: false,
          color: "blue",
        },
      ];
      const tip = d3tip();

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
      console.log(TestData);
      let TestDataMTIA = [];
      TestDataMTIA = DateAxes.map((item, index) => {
        let object = {};
        object.data = new Date(DateAxes[index]);
        object.value = +MTIA_data[index];
        return object;
      });
      console.log(TestDataMTIA);
      const X = d3.map(TestData, (item) => {
        return item.value;
      });
      const Y = d3.map(TestData, (item) => {
        return item.data;
      });
      const O = d3.map(TestData, (d) => d);
      const I = d3.map(TestData, (_, i) => i);
      let title, yFormat;

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
      let x2Scale = d3.scaleLinear().range([0, this.width]);
      let y2Scale = d3.scaleLinear().range([0, this.height]);
      x2Scale.domain(xScale.domain());
      y2Scale.domain(yScale.domain());

      const xAxis = d3.axisBottom(xScale).ticks(6);

      const xScaleMTIA = d3
        .scaleLinear()
        .domain([minXaxesMTIA, maxXaxesMTIA])
        .range([0, this.width]);
      let x2ScaleMTIA = d3.scaleLinear().range([0, this.width]);
      x2ScaleMTIA.domain(xScaleMTIA.domain());
      const xAxisMTIA = d3.axisBottom(xScaleMTIA).ticks(10);
      const lineMDIA = d3
        .line()
        .x((d) => xScale(d.value))
        .y((d) => yScale(d.data));
      const lineMTIA = d3
        .line()
        .x((d) => xScaleMTIA(d.value))
        .y((d) => yScale(d.data));

      const lines = [lineMDIA(TestData), lineMTIA(TestDataMTIA)];

      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", 400)
        .attr("height", 900)
        .append("g")
        .on("pointerenter pointermove", pointermoved)
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );
      const clip = svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("x", 0)
        .attr("y", 0);

      const focus = svg
        .append("g")
        .attr("class", "focus")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );

      focus
        .append("g")
        .attr("class", "x_axis_MTIA")
        .attr("transform", "translate(0," + (this.height + 30) + ")")
        // .attr("id", "tag" + key[0].replace(/\s+/g, ""))
        .call(xAxisMTIA);
      let svgYaxis = svg
        .append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );
      focus
        .append("g")
        .attr("class", "x_axis_MDIA")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis);

      // focus.append("g").attr("class", "axis axis--y").call(yAxis);
      const lineSvgMTIA = svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );

      var zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
          [0, 0],
          [this.width, this.height],
        ])
        .extent([
          [0, 0],
          [this.width, this.height],
        ])
        .on("zoom", zoomed);
      function compare(a1, a2) {
        return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
      }
      function zoomed(event, d) {
        var t = event.transform;
        console.log(event);
        console.log(t.rescaleX(xScale).domain());
        yScale.domain(t.rescaleX(y2Scale).domain());
        // xScaleMTIA.domain(t.rescaleX(x2ScaleMTIA).domain());
        let newY = t.rescaleY(yScale);
        svgYaxis.call(
          d3.axisLeft(newY).tickFormat(d3.timeFormat("%Y-%m-%d %H:%M:%S"))
        );
        // svgYaxis.selectAll(".axis axis--y").call(newY);
        console.log(yScale.domain());
        console.log(xScale.domain() != x2Scale.domain());
        if (compare(xScale.domain(), x2Scale.domain()) == false) {
          xAxis.ticks(2);
          xAxisMTIA.ticks(2);
        } else {
          xAxis.ticks(6);
          xAxisMTIA.ticks(10);
        }

        svg.select(".MDIA").attr("d", lineMDIA(TestData));
        svg.select(".MTIA").attr("d", lineMTIA(TestDataMTIA));
        svg.select(".x_axis_MDIA").call(xAxis);
        svg.select(".x_axis_MTIA").call(xAxisMTIA);
      }
      svg
        .append("rect")
        .attr("class", "zoom")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        )
        .call(zoom);
      var size = 20;
      key.forEach(function (d, i) {
        lineSvgMTIA
          .append("path")
          .attr("class", key[i].name) // I add the class line to be able to modify this line later on.
          .attr("fill", "none")
          .attr("stroke", key[i].color)
          .attr("stroke-width", 1.5)
          .attr("id", key[i].name)
          .attr("d", lines[i]);

        svg
          .append("text")
          .attr("x", 110 + i * (size + 30)) // space legend
          .attr("y", 0)
          .attr("class", "legend") // style the legend
          .style("fill", key[i].color)
          .on("click", function () {
            var active = d.active ? false : true,
              newOpacity = active ? 0 : 1;
            d3.select(`#${key[i].name}`)
              .transition()
              .duration(100)
              .style("opacity", newOpacity);
            d.active = active;
          })
          .text(d.name);
      });
      if (title === undefined) {
        const formatDate = yScale.tickFormat(null, "%H:%M:%S");
        const formatValue = xScale.tickFormat(100, yFormat);
        title = (i) => `${formatDate(Y[i])}\n${formatValue(X[i])}`;
        console.log("title", title);
      } else {
        const O = d3.map(TestData, (d) => d);
        console.log("O", O);
        const T = title;
        title = (i) => T(O[i], i, TestData);
      }
      const tooltip = svg.append("g").style("pointer-events", "none");

      function pointermoved(event) {
        const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]));
        console.log(event);
        tooltip.style("display", null);
        tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);

        const path = tooltip
          .selectAll("path")
          .data([,])
          .join("path")
          .attr("fill", "white")
          .attr("stroke", "black");

        const text = tooltip
          .selectAll("text")
          .data([,])
          .join("text")
          .call((text) =>
            text
              .selectAll("tspan")
              .data(`${title(i)}`.split(/\n/), () => {
                // console.log(title(i).split(/\n/));
              })
              .join("tspan")
              .attr("x", 0)
              .attr("y", (_, i) => `${i * 1.1}em`)
              .attr("font-weight", (_, i) => (i ? null : "bold"))
              .text((d) => d)
          );

        const { x, y, width: w, height: h } = text.node().getBBox();
        text.attr("transform", `translate(${-w / 2},${15 - y})`);
        path.attr(
          "d",
          `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
        );
      }
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
.zoom {
  cursor: move;
  fill: none;
  pointer-events: all;
}
</style>
