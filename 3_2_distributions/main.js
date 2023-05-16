/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerWidth * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40},
  radius = 5
  bigger_radius = 6.5

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg
let xScale
let yScale
let colorScale
let tooltip
let legend

/* LEGENDS */
const legendItems = [
  { color: 'grey', text: 'Smoker' },
  { color: 'maroon', text: 'Non-Smoker' }
]

/* APPLICATION STATE */
let state = {
  data: [],
  selectedSmoking: 'All' // + YOUR INITIAL FILTER SELECTION
}

/* LOAD DATA */
d3.csv('../data/babies.csv', d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log('data', raw_data)
  const prep_data = raw_data.filter(d => !isNaN(d.age))
  // save our data to application state
  state.data = prep_data
  init()
})

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain([d3.min(state.data, d => d.age), d3.max(state.data, d => d.age)])
    .range([0, width - margin.right])
    .nice()

  yScale = d3.scaleLinear()
    .domain([0, (d3.max(state.data, d => d.bwt) + 10)])
    .range([height - margin.bottom, margin.top])
  
  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const dropDownElement = d3.select('#dropdown')
  .on('change', (event) => {
    state.selectedSmoking = event.target.value
    draw()
  })

  // + CREATE SVG ELEMENT
  svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // + CALL AXES

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis)

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)

  // + AXIS LABELS
  svg.append('text')
    .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
    .style('text-anchor', 'middle')
    .text('Age')

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', margin.left - 50)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Birth Weight (ounces)')

  tooltip = d3.select('#container')
    .append('div')
    .style('opacity', 0) // opacity to 0 initially
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'absolute')

  legend = svg.append("g")
    .attr("transform", `translate(${width - margin.right - 175}, ${margin.top})`)

  legend.selectAll('circle')
    .data(legendItems)
    .enter()
    .append('circle')
    .attr('cy', (d, i) => i * 20)
    .attr('r', radius)
    .style('fill', d => d.color)
  
  legend.selectAll('text')
    .data(legendItems)
    .enter()
    .append('text')
    .attr('x', radius * 2)
    .attr('y', (d, i) => i * 20)
    .style('dominant-baseline', 'middle')
    .text(d => d.text)

  draw() // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedSmoking === 'All' || state.selectedSmoking == d.smoke)

  const dot = svg
    .selectAll('circle.dot')
    .data(filteredData, d => d.case)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.age))
        .attr('cy', d => yScale(d.bwt))
        .style('fill', d => (d.smoke === 1) ? 'grey' : 'maroon')
        .style('stroke', d => (d.smoke === 1) ? 'darkgrey' : 'darkred')
        .attr('opacity', 0.6)
        .attr('r', 0)
        .on('mouseover', (event, d) => {
          tooltip.transition()
            .duration(100)
            .style('opacity', 1)
          tooltip.html('Case: ' + d.case + '<br>Age: ' + d.age + '<br>Birth Weight: ' + d.bwt)
            .style('left', (event.pageX) + 'px')
            .style('top', (event.pageY - 28) + 'px')
          d3.select(event.currentTarget)
            .style('fill', d => (d.smoke === 1) ? 'darkgrey' : 'darkred')
            .style('stroke', 'black')
        })
        .on('mousemove', (event) => {
          tooltip.style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 30) + 'px')
          d3.select(event.currentTarget)
            .style('fill', d => (d.smoke === 1) ? 'darkgrey' : 'darkred')
            .style('stroke', 'black')
            .style('stroke-width', 1.5)
        })
        .on('mouseout', (d) => {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0)
          d3.select(event.currentTarget)
            .style('fill', d => (d.smoke === 1) ? 'grey' : 'maroon')
            .style('stroke', d => (d.smoke === 1) ? 'darkgrey' : 'darkred')
        })
        .call(sel => sel
          .transition()
          .duration(750)
          .attr('r', bigger_radius)
          .transition()
          .duration(800)
          .attr('r', radius)
          )
        ,

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
      .call(sel => sel
        .transition()
        .duration(500)
        .attr('r', bigger_radius)
        .transition()
        .duration(200)
        .attr('r', 0)
        .remove()
      )
      
    )
}