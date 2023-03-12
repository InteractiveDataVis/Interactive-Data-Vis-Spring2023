/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 50,
  radius = 4;

/* LOAD DATA */
d3.csv('../data/babies.csv', d3.autoType)
  .then(data => {
    console.log(data)
    /* SCALES */
    // x-scale will be linear, age of mother
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.age)])
      .range([margin, width - margin])

    // y-scale will be linear, weight of baby in oz
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.bwt)])
      .range([height - margin, margin])
    
      /* HTML ELEMENTS */

    // append svg so I have something to reference in the container
    const svg = d3.select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    
    // define axes by our scales
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    // append xAxis
    svg
      .append('g')
      .style('transform', `translate(0px, ${height - margin}px)`)
      .call(xAxis)
    
    // append yAxis
    svg.append('g')
      .style('transform', `translate(${margin}px,0px)`)
      .call(yAxis)

    // let's draw circles
    const dot = svg
      .selectAll('circle')
      .data(data, d => d.case)    // case is the unique id
      .join('circle')
      .attr('cx', d => xScale(d.age))
      .attr('cy', d => yScale(d.bwt))
      .attr('r', radius)
      .attr('fill', 'maroon')
      .attr('opacity', 0.6)
  });