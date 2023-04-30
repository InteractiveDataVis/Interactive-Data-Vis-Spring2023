// Set up navigation bar
document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('navbar')

  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      navContainer.innerHTML = html
    })
  .catch(err => {
    console.warn("Navbar not loaded:", err)
  })
})

// constants and global variables
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 30, bottom: 50, left: 90, right: 60}

// colors
const maroon = '#800000',
  teal = '#008080',
  dusty_rose = '#C0737A'

// create area for legend
const legend = {
    width: 180,
    height: 60,
    x: width - 210,
    y: 30,
  }

/*
these variables allow us to access anything we manipulate in init() 
but need access to in draw(); all these variables are empty before we assign 
something to them.
*/

let colorScale
let svg
let xScale
let yScale
let xAxis
let yAxis

// TODO: create legend again? Or should this happen in draw()

let state = {
  data: [],
  selection: "All", // TODO: do I need a filter?
}

// load data
d3.csv('../data/migration_flows_from_2010_to_2019.csv', d => {
  return {
    current_state: d.current_state,
    current_region: d.region,
    current_division: d.division,
    year: new Date(+d.year, 0, 1),
    population: +d.population,
    same_house: +d.same_house,
    same_state: +d.same_state,
    from_different_state_total: +d.from_different_state_Total,
    abroad_total: +d.abroad_Total,
    from: d.from,
    from_region: d.from_region,
    from_division: d.from_division,
    number_of_people: +d.number_of_people,
  }
})
  .then(raw_data => {
    state.data = raw_data
    console.log('state data >>', state.data)  // diagnostic
    
    init()
  })

function init() {
    
    // filter top five fastest growing states in 2020 census
  const fastestGrowingData = state.data.filter(d=>
    d.current_state === 'Utah' ||
    d.current_state === 'Idaho' ||
    d.current_state === 'Texas' ||
    d.current_state === 'North Dakota' || 
    d.current_state === 'Nevada'
    )
    console.log('Growing States Data >>', fastestGrowingData) //diagnostic
  
  // grow data by year; created a Map datatype that'll need conversion
  // several false states on learning how rollup() and sum() work in d3
  const groupedByYear = d3.rollup(fastestGrowingData, i => {
    return {
      from_different_state_total: d3.sum(i, d => d.from_different_state_total),
      abroad_total: d3.sum(i, d => d.abroad_total),
      state_total: d3.sum(i, d => d.population),
    }
  }, 
    d => d.year,
    d => d.current_state,
  )

  console.log('grouped by year >>', groupedByYear)

  // convert Map to array of objects; destructuring ftw
  const aggByYear = Array.from(groupedByYear, ([year, stateValues]) => {
    return Array.from(stateValues, ([state, values]) => ({
      year: new Date(year),
      current_state: state,
      ...values,
    }));
  }).flat()
  
  console.log("agg by year >>", aggByYear)

  // calculate growth not attributable to migration
  aggByYear.forEach(d => {
    d.internal_growth = d.state_total - d.from_different_state_total - d.abroad_total
  })

  // group data by state
  const dataByState = d3.group(aggByYear, d => d.current_state)
  const joinData = Array.from(dataByState, ([state, values]) => ({
    state,
    data: values
  }))
  console.log('data by state >>', dataByState)  // diagnostic
  console.log('joinData >>', joinData)
  
  // create scales
  xScale = d3
    .scaleBand()
    .domain(joinData.map(d => d.state))
    .range([0, width - margin.right])
    .padding(0.1)
    .paddingInner(0.2)
  
  yScale = d3
    .scaleLinear()
    // nice() function: https://www.d3indepth.com/scales/
    .domain([0, d3.max(aggByYear, d => d.state_total)]).nice()
    .range([height - margin.bottom, margin.top])
  // set the color scale
  colorScale = d3.scaleOrdinal()
    .domain(['from_different_state', 'abroad', 'internal_growth'])
    .range([maroon, teal, dusty_rose])
  // create keys
  
  const stack = d3.stack()
    .keys(['from_different_state_total', 'abroad_total', 'internal_growth'])
    .value((d, key) => d.data[key])


  // create the array to graph
  const stackedData = stack(joinData)
  console.log('stackedData >>', stackedData)  // diagnostic

  svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  
  // assign axes to scales
  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)
  
  // draw axes
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis)
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
  // draw title
  svg
    .append('text')
    .attr('x', (width + margin.left) / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'chart-title')
    .text('Source of Migration from Top 5 Fastest Growing States (2010-2020)');
  // draw axis labels
  svg
    .append('text')
    .attr(
      'transform', 
      `translate(${width  / 2 + margin.right}, ${height - margin.bottom + 45})`)
    .style('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('State Name')
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', - (height/2))
    .attr('y', margin.left / 2 - 30)
    .style('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('Growth in Each State')
  
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
  
  const states = svg.selectAll('.state')
    .data(stackedData)
    .join('g')
    .attr('class', 'state')
    .attr('fill', (d, i) => colorScale(stack.keys()[i]));

  states.selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', d => xScale(d.data.state))
    .attr('y', d => yScale(d[1]))
    .attr('height', d => yScale(d[0]) - yScale(d[1])) 
    .attr('width', xScale.bandwidth())
  
  // draw()
}
/*
function draw() {
  // draw bars
   
}
*/
