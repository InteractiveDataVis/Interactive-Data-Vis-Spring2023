 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 50;

/* LOAD DATA */
d3.csv('../data/unemployment_results_1990-2016.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    month: d.Month,
    state: d.State,
    county: d.County,
    rate: d.Rate
  }

}).then(data => {
  console.log('data :>> ', data);

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin, width - margin])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rate))
    .range([height - margin, margin])

  // CREATE SVG ELEMENT
  const svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  svg.append('g')
      .style('transform', `translate(0px, ${height}px)`)
      .call(xAxis)
  
  svg.append('g')
    .style('transform', `translate(${margin}px,0px)`)
    .call(yAxis)

  // LINE GENERATOR FUNCTION


  // DRAW LINE

  console.log(d => d)

});