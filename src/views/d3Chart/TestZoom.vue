<template>
  <svg class="test" width="960" height="500"></svg>
</template>

<script>
import DateAxes from "../ChartJs/x-axes";
import MDIA from "../ChartJs/MDIA/MDIA_data";
import MDIA_data from "../ChartJs/MDIA/MDIA_data";
import * as d3 from "d3";
import MTIA_data from "../ChartJs/MTIA/MTIA_data";
import x_axes from "../ChartJs/x-axes";
import dataJSON from "./data.json";

export default {
  name: "TestZoom",
  data() {
    return {
      width: null,
      height: null,
      margin: { top: 20, right: 20, bottom: 0, left: 110 },
    };
  },
  methods: {
    init() {
      let svg = d3.select(".test"),
        margin = { top: 20, right: 20, bottom: 110, left: 40 },
        margin2 = { top: 430, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;

      var parseDate = d3.timeParse("%b %Y");
      let data = [
        { date: "Jan 2000", price: 1394.46 },
        { date: "Feb 2000", price: 1366.42 },
        { date: "Mar 2000", price: 1498.58 },
        { date: "Apr 2000", price: 1452.43 },
        { date: "May 2000", price: 1420.6 },
        { date: "Jun 2000", price: 1454.6 },
        { date: "Jul 2000", price: 1430.83 },
        { date: "Aug 2000", price: 1517.68 },
        { date: "Sep 2000", price: 1436.51 },
        { date: "Oct 2000", price: 1429.4 },
        { date: "Nov 2000", price: 1314.95 },
        { date: "Dec 2000", price: 1320.28 },
        { date: "Jan 2001", price: 1366.01 },
        { date: "Feb 2001", price: 1239.94 },
        { date: "Mar 2001", price: 1160.33 },
        { date: "Apr 2001", price: 1249.46 },
        { date: "May 2001", price: 1255.82 },
        { date: "Jun 2001", price: 1224.38 },
        { date: "Jul 2001", price: 1211.23 },
        { date: "Aug 2001", price: 1133.58 },
        { date: "Sep 2001", price: 1040.94 },
        { date: "Oct 2001", price: 1059.78 },
        { date: "Nov 2001", price: 1139.45 },
        { date: "Dec 2001", price: 1148.08 },
        { date: "Jan 2002", price: 1130.2 },
        { date: "Feb 2002", price: 1106.73 },
        { date: "Mar 2002", price: 1147.39 },
        { date: "Apr 2002", price: 1076.92 },
        { date: "May 2002", price: 1067.14 },
        { date: "Jun 2002", price: 989.82 },
        { date: "Jul 2002", price: 911.62 },
        { date: "Aug 2002", price: 916.07 },
        { date: "Sep 2002", price: 815.28 },
        { date: "Oct 2002", price: 885.76 },
        { date: "Nov 2002", price: 936.31 },
        { date: "Dec 2002", price: 879.82 },
        { date: "Jan 2003", price: 855.7 },
        { date: "Feb 2003", price: 841.15 },
        { date: "Mar 2003", price: 848.18 },
        { date: "Apr 2003", price: 916.92 },
        { date: "May 2003", price: 963.59 },
        { date: "Jun 2003", price: 974.5 },
        { date: "Jul 2003", price: 990.31 },
        { date: "Aug 2003", price: 1008.01 },
        { date: "Sep 2003", price: 995.97 },
        { date: "Oct 2003", price: 1050.71 },
        { date: "Nov 2003", price: 1058.2 },
        { date: "Dec 2003", price: 1111.92 },
        { date: "Jan 2004", price: 1131.13 },
        { date: "Feb 2004", price: 1144.94 },
        { date: "Mar 2004", price: 1126.21 },
        { date: "Apr 2004", price: 1107.3 },
        { date: "May 2004", price: 1120.68 },
        { date: "Jun 2004", price: 1140.84 },
        { date: "Jul 2004", price: 1101.72 },
        { date: "Aug 2004", price: 1104.24 },
        { date: "Sep 2004", price: 1114.58 },
        { date: "Oct 2004", price: 1130.2 },
        { date: "Nov 2004", price: 1173.82 },
        { date: "Dec 2004", price: 1211.92 },
        { date: "Jan 2005", price: 1181.27 },
        { date: "Feb 2005", price: 1203.6 },
        { date: "Mar 2005", price: 1180.59 },
        { date: "Apr 2005", price: 1156.85 },
        { date: "May 2005", price: 1191.5 },
        { date: "Jun 2005", price: 1191.33 },
        { date: "Jul 2005", price: 1234.18 },
        { date: "Aug 2005", price: 1220.33 },
        { date: "Sep 2005", price: 1228.81 },
        { date: "Oct 2005", price: 1207.01 },
        { date: "Nov 2005", price: 1249.48 },
        { date: "Dec 2005", price: 1248.29 },
        { date: "Jan 2006", price: 1280.08 },
        { date: "Feb 2006", price: 1280.66 },
        { date: "Mar 2006", price: 1294.87 },
        { date: "Apr 2006", price: 1310.61 },
        { date: "May 2006", price: 1270.09 },
        { date: "Jun 2006", price: 1270.2 },
        { date: "Jul 2006", price: 1276.66 },
        { date: "Aug 2006", price: 1303.82 },
        { date: "Sep 2006", price: 1335.85 },
        { date: "Oct 2006", price: 1377.94 },
        { date: "Nov 2006", price: 1400.63 },
        { date: "Dec 2006", price: 1418.3 },
        { date: "Jan 2007", price: 1438.24 },
        { date: "Feb 2007", price: 1406.82 },
        { date: "Mar 2007", price: 1420.86 },
        { date: "Apr 2007", price: 1482.37 },
        { date: "May 2007", price: 1530.62 },
        { date: "Jun 2007", price: 1503.35 },
        { date: "Jul 2007", price: 1455.27 },
        { date: "Aug 2007", price: 1473.99 },
        { date: "Sep 2007", price: 1526.75 },
        { date: "Oct 2007", price: 1549.38 },
        { date: "Nov 2007", price: 1481.14 },
        { date: "Dec 2007", price: 1468.36 },
        { date: "Jan 2008", price: 1378.55 },
        { date: "Feb 2008", price: 1330.63 },
        { date: "Mar 2008", price: 1322.7 },
        { date: "Apr 2008", price: 1385.59 },
        { date: "May 2008", price: 1400.38 },
        { date: "Jun 2008", price: 1280 },
        { date: "Jul 2008", price: 1267.38 },
        { date: "Aug 2008", price: 1282.83 },
        { date: "Sep 2008", price: 1166.36 },
        { date: "Oct 2008", price: 968.75 },
        { date: "Nov 2008", price: 896.24 },
        { date: "Dec 2008", price: 903.25 },
        { date: "Jan 2009", price: 825.88 },
        { date: "Feb 2009", price: 735.09 },
        { date: "Mar 2009", price: 797.87 },
        { date: "Apr 2009", price: 872.81 },
        { date: "May 2009", price: 919.14 },
        { date: "Jun 2009", price: 919.32 },
        { date: "Jul 2009", price: 987.48 },
        { date: "Aug 2009", price: 1020.62 },
        { date: "Sep 2009", price: 1057.08 },
        { date: "Oct 2009", price: 1036.19 },
        { date: "Nov 2009", price: 1095.63 },
        { date: "Dec 2009", price: 1115.1 },
        { date: "Jan 2010", price: 1073.87 },
        { date: "Feb 2010", price: 1104.49 },
        { date: "Mar 2010", price: 1140.45 },
      ];

      data = data.map((item) => {
        item.date = parseDate(item.date);
        item.price = +item.price;
        return item;
      });
      var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

      var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

      // var brush = d3
      //   .brushX()
      //   .extent([
      //     [0, 0],
      //     [width, height2],
      //   ])
      //   .on("brush end", brushed);

      var zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", zoomed);

      var area = d3
        .area()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
          return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
          return y(d.price);
        });

      var area2 = d3
        .area()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
          return x2(d.date);
        })
        .y0(height2)
        .y1(function (d) {
          return y2(d.price);
        });

      svg
        .append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      var focus = svg
        .append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var context = svg
        .append("g")
        .attr("class", "context")
        .attr(
          "transform",
          "translate(" + margin2.left + "," + margin2.top + ")"
        );

      x.domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.price;
        }),
      ]);
      // x2.domain(x.domain());
      // y2.domain(y.domain());

      focus.append("path").datum(data).attr("class", "area").attr("d", area);

      focus
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      focus.append("g").attr("class", "axis axis--y").call(yAxis);

      // context.append("path").datum(data).attr("class", "area").attr("d", area2);

      // context
      //   .append("g")
      //   .attr("class", "axis axis--x")
      //   .attr("transform", "translate(0," + height2 + ")")
      //   .call(xAxis2);

      // context
      //   .append("g")
      //   .attr("class", "brush")
      //   .call(brush)
      //   .call(brush.move, x.range());

      svg
        .append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

      // function brushed(event) {
      //   if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      //   var s = event.selection || x2.range();
      //   x.domain(s.map(x2.invert, x2));
      //   focus.select(".area").attr("d", area);
      //   focus.select(".axis--x").call(xAxis);
      //   svg
      //     .select(".zoom")
      //     .call(
      //       zoom.transform,
      //       d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
      //     );
      // }

      function zoomed(event) {
        // if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = event.transform;
        x.domain(t.rescaleX(x).domain());
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        // context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
      }

      function typedr(d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
        return d;
      }
    },
  },
  mounted() {
    // this.width = 300 - this.margin.left - this.margin.right;
    // this.height = 300 - this.margin.top - this.margin.bottom;
    this.init();
  },
};
</script>

<style>
.area {
  fill: steelblue;
  clip-path: url(#clip);
}
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
