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
        current_state: d.current_state,
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
        .range([margin.right, width - margin.left])
    
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
    const filteredUtah = state.data
      .filter(d => d.current_state === 'Utah')
    console.log('filteredData', filteredUtah)

    const groupedByYear = d3.rollup(filteredUtah, i => {
      const firstInstance = i[0]
      return {
        from_different_state_total: firstInstance.from_different_state_total,
        abroad_total: firstInstance.abroad_total,
        utah_total: firstInstance.population

      }
    }, d => d.year)
  
    // THIS LOOKS GOOFY
    const aggData = Array.from(groupedByYear, ([year, values]) => ({ year: new Date(year), ...values }))


    // + UPDATE SCALE(S), if needed
    
  
    // + UPDATE AXIS/AXES, if needed
  
  
    // UPDATE LINE GENERATOR FUNCTION
   
    const lineInternal = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.from_different_state_total))
    
    const lineAbroad = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.abroad_total))

    const lineUtah = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.population))

    const lineLocal = d3.line()
  
  
    // + DRAW LINE AND/OR AREA
    
    svg.append('path')
      .datum(aggData)
      .attr('stroke', '#008000')
      .attr('fill', 'none')
      .attr('d', lineInternal)
    
    svg.append('path')
      .datum(aggData)
      .attr('stroke', '#FFC0CB')
      .attr('fill', 'none')
      .attr('d', lineAbroad)
  }