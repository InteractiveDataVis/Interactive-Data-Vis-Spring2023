/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60}

const internalColor = '#008000'
const abroadColor = '#D3D3D3'
const totalColor = '#008080'

const legend = {
  width: 180,
  height: 60,
  x: width - 210,
  y: 30,
}

// These variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg
let xScale
let yScale
let xAxis
let yAxis
let xAxisGroup
let yAxisGroup


// + CREATE LEGEND
function createLegend() {
  const legendGroup = svg.append('g')
    .attr('transform', `translate(${legend.x}, ${legend.y})`)

  const legendColors = [
    { text: 'Internal migration', color: internalColor },
    { text: 'Migration from aboard', color: abroadColor },
  ]

legendColors.forEach((color, item) => {
  const legendItem = legendGroup.append('g')
    .attr('transform', `translate(0, ${item * 20})`)

  legendItem.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', color.color)

  legendItem.append('text')
    .attr('x', 15)
    .attr('y', 10)
    .text(color.text)
    .style('font-size', '14px')

  })
}

/* APPLICATION STATE */
let state = {
    data: [],
    selection: "All", // + YOUR FILTER SELECTION
  }
  
  /* LOAD DATA */
  // + SET YOUR DATA PATH
  d3.csv('../data/migration_flows_from_2010_to_2019.csv', d => {
    return {
        current_state: d.current_state,
        region: d.region,
        division: d.division,
        year: new Date(+d.year, 0, 1),
        population: +d.population,
        same_house: +d.same_house,
        same_state: +d.same_state,
        from_different_state_total: +d.from_different_state_Total,
        abroad_total: +d.abroad_Total,
        from: d.from,
        number_of_people: +d.number_of_people,
    }
  })
    .then(raw_data => {
      state.data = raw_data
      init()
    })
  
  /* INITIALIZING FUNCTION */
  // this will be run *one time* when the data finishes loading in
  function init() {
    // + SCALES
    xScale = d3.scaleTime()
        .domain(d3.extent(state.data, d => d.year))
        .range([margin.right, width - margin.left])
    
    yScale = d3.scaleLinear()
        .domain([0, d3.max(state.data, d => d.from_different_state_total)])
        .range([height - margin.bottom, margin.top])
  
    // + AXES
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
  
    // + UI ELEMENT SETUP
  
  
    // + CREATE SVG ELEMENT
    svg = d3.select('#container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
  
    // + CALL AXES
    xAxisGroup = svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)    

    yAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)

    xAxisGroup
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 4)
      .attr('text-anchor', 'middle')
      .text('Year')
  
    yAxisGroup
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', - height / 2)
      .attr('y', margin.left / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '1em')
      .text('# new Utahns')
    
    createLegend()
    draw() // calls the draw function

  }
  
  /* DRAW FUNCTION */
  // we call this every time there is an update to the data/state
  function draw() {
    // + FILTER DATA BASED ON STATE
    const filteredUtah = state.data
      .filter(d => d.current_state === 'Utah')  // Utah only

    // Group data by year
    // Creates an option with years as keys
    const groupedByYear = d3.rollup(filteredUtah, i => {
      const firstInstance = i[0]
      return {
        from_different_state_total: firstInstance.from_different_state_total,
        abroad_total: firstInstance.abroad_total,
        utah_total: firstInstance.population
      }
    }, d => d.year)
  
    // Convert Map obj to array of objects, destruction year/values into variables in the objs
    const aggData = Array.from(groupedByYear, ([year, values]) => 
      ({ year: new Date(year), ...values }))

    // + UPDATE SCALE(S), if needed
    
  
    // + UPDATE AXIS/AXES, if needed
  
  
    // UPDATE LINE GENERATOR FUNCTION
   
    const lineInternal = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.from_different_state_total))
    
    const lineAbroad = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.abroad_total))

    const lineTotal = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.utah_total))
  
    // + DRAW LINE AND/OR AREA
    
    const internalPath = svg.append('path')
      .datum(aggData)
      .attr('stroke', internalColor)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('d', lineInternal)
    
    const abroadPath = svg.append('path')
      .datum(aggData)
      .attr('stroke', abroadColor)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', lineAbroad)

    const totalPath = svg.append('path')
      .datum(aggData)
      .attr('stroke', totalColor)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('d', lineTotal)

    // + This part is experimental animation fun

    /* + Get the length of the paths above
    https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength
    */
    const totalLengthInternalPath = internalPath.node().getTotalLength()
    const totalLengthAbroadPath = abroadPath.node().getTotalLength()

    /* + Set the start of each path at the beginning
     https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
     https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
    */
    internalPath
      .attr('stroke-dasharray', `${totalLengthInternalPath} ${totalLengthAbroadPath}`)
      .attr('stroke-dashoffset', totalLengthInternalPath)
    
    abroadPath
      .attr('stroke-dasharray', `${totalLengthAbroadPath} ${totalLengthInternalPath}`)
      .attr('stroke-dashoffset', totalLengthAbroadPath)
        
    internalPath.transition()
      .duration(4000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0)

    abroadPath.transition()
      .duration(6000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0)
  }