 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, left: 60, bottom: 60, right: 20};

/* LOAD DATA */
d3.csv("../data/populationOverTime.csv", d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Entity,
    population: +d.Population
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES
  // X Scale
  const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left, width - margin.right])

  // Y Scale
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.population))
    .range([height - margin.bottom, margin.top])

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // BUILD AND CALL AXES

  // filter data
  const filteredData = data.filter(d => d.country === "United States")
  console.log('filtered', filteredData)
  // LINE GENERATOR FUNCTION

  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population))

  // group data
  const groupedData = d3.groups(data, d => d.country)
  console.log('grouped', groupedData)
  // DRAW LINE
  const line = svg.selectAll(".line")
    .data(groupedData)
    .join("path")
    .attr("class", "line")
    .attr("d", ([country, d]) => lineGen(d))
    .attr("stroke", "black")
    .attr("fill", "none")

});