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

   // Filter data so it's not a mess
   const filteredData = data.filter(d => d.state === 'Delaware' && d.month === 'January')
   console.log('filtered', filteredData)
   filteredData.forEach(d => {console.log('rate', d.county + d.year + d.rate)})

   // Grouping data
   const groupedData = d3.groups(filteredData, d => d.county)
   console.log('grouped', groupedData)

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.right, width - margin.left])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d.rate) * 1.1])
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
    .style('transform', `translate(${margin.left}px,0px)`)
    .call(yAxis)

  // Color scheme
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

  // LINE GENERATOR FUNCTION

  const lineGenerated = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.rate))

  groupedData.forEach(([county, countyData]) => {
    // I need to sort the data by year, otherwise, I get loopy lines?
    countyData.sort((w, z) => w.year - z.year )
    // DRAW LINE
    svg.append('path')
      .datum(countyData)
      .join('path')
      .attr('class', 'line')
      .attr('stroke', () => colorScale(county))
      .attr('fill', 'none')
      .attr('d', lineGenerated)
  })
});