import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { useStore } from "./store/store";

const Heading = styled.div`
  padding: 1rem 0 1rem 3rem;
`;

const HeatMap = () => {
  const { state } = useStore();
  const usersData = state.userData;
  var heatMapData = [];
  usersData.map((userData) =>
    userData.attendanceData.map((data) => heatMapData.push(data))
  );
  var time = [];
  usersData[0].attendanceData.map((t) => time.push(t.time));
  var name = [];
  usersData.map((user) => name.push(`${user.first_name} ${user.last_name}`));

  const draw = () => {
    var margin = { top: 10, right: 30, bottom: 30, left: 100 },
      width = 1450 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().range([0, width]).domain(time).padding(0.05);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var y = d3.scaleBand().range([height, 0]).domain(name).padding(0.05);
    svg.append("g").call(d3.axisLeft(y));

    const myColor = d3
      .scaleLinear()
      .range(["white", "#006600"])
      .domain([0, 100]);
    // console.log(myColor(50));
    svg
      .selectAll()
      .data(heatMapData, function (d) {
        return d.time + ":" + d.name;
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.time);
      })
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return myColor(d.value);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8);
  };

  React.useEffect(() => {
    d3.selectAll("svg", "#my_dataviz").remove().exit();
    draw();
  }, [heatMapData]);
  return (
    <>
      <Heading>Cammera Analysis</Heading>
      <div className="App">
        <div id="my_dataviz" />
      </div>
    </>
  );
};

export default HeatMap;
