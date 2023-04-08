/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60}

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg
let xScale
let yScale
let xAxis
let yAxis
let xAxisGroup
let yAxisGroup

/* APPLICATION STATE */
let state = {
    data: [],
    selection: "All", // + YOUR FILTER SELECTION
  }
  
  /* LOAD DATA */
  // + SET YOUR DATA PATH
  d3.csv('../data/migration_flows_from_2010_to_2019.csv', d => {
    return {
        year: new Date(+d.year, 0, 1),
        number_of_people: d.number_of_people
    }
  })
    .then(raw_data => {
      console.log('loaded data:', raw_data)
      state.data = raw_data
      console.log('state_data', state.data)
      init()
    })
  
  /* INITIALIZING FUNCTION */
  // this will be run *one time* when the data finishes loading in
  function init() {
    // + SCALES
    xScale = d3.scaleTime()
        .domain(d3.extent(state.data, d => d.year))
        .range([margin.right, width - margin.left])    // TODO
    
    yScale = d3.scaleLinear()
        .domain([0, d3.max(state.data, d => d.number_of_people)])
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
  
  
    draw() // calls the draw function
  }
  
  /* DRAW FUNCTION */
  // we call this every time there is an update to the data/state
  function draw() {
    // + FILTER DATA BASED ON STATE
    const filteredData = state.data
      .filter(d => d.current_state === 'Utah')
  
    // + UPDATE SCALE(S), if needed
    
  
    // + UPDATE AXIS/AXES, if needed
  
  
    // UPDATE LINE GENERATOR FUNCTION
  
  
    // + DRAW LINE AND/OR AREA
    
  
  }