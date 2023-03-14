 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60 }

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
    .range([margin.right, width - margin.left])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rate))
    .range([height - margin.bottom, margin.top])

  // CREATE SVG ELEMENT
  const svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  svg.append('g')
      .style('transform', `translate(0px, ${height - margin.bottom}px)`)
      .call(xAxis)
  
  svg.append('g')
    .style('transform', `translate(${margin.right}px,0px)`)
    .call(yAxis)

  // LINE GENERATOR FUNCTION

  const lineGenerated = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.rate))

  // DRAW LINE
  svg.append('.line')
    .data([data])    // reminder that we're passing in an array
    .join("path")
    .attr('class', 'line')
    .attr('stroke', 'maroon')
    .attr('fill', 'none')
  console.log(d => d)

});