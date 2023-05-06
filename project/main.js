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
  greenGrey = '#BDD9BF',
  green = '#6FDE6E',
  yellow = '#E8F086',
  red = '#FF4242',
  lightBlue = '#235FA4',
  darkBlue = '#0A284B'

const comparisonColorScale = d3.scaleOrdinal()
  .domain(['fastest', 'slowest', 'shrinking'])
  .range([green, yellow, red])

const abroadStateColorScale = d3.scaleOrdinal()
  .domain(['abroad_total', 'from_different_state_total'])
  .range([lightBlue, darkBlue])

// create area for legend
const legend = {
    width: 180,
    height: 60,
    x: width - 210,
    y: 30,
  }

  const stackedLegend = legend


/*
these variables allow us to access anything we manipulate in init() 
but need access to in draw(); all these variables are empty before we assign 
something to them.
*/

let colorScale
let svg
let xScale
let yScale
let xScaleAbroadState
let yScaleAboardState
let xAxis // TODO remove
let yAxis 
let xAxisAbroadState
let yAxisAbroadState

let state = {
  data: [],
  selection: "all", // TODO: do I need a filter?
}

const statesData = [
  { state: 'Utah', abbr: 'UT', percentChange: 18.4, popChange: 507731, changeCat: 'fastest' },
  { state: 'Idaho', abbr: 'ID', percentChange: 17.3, popChange: 271524, changeCat: 'fastest' },
  { state: 'Texas', abbr: 'TX', percentChange: 15.9, popChange: 3999444, changeCat: 'fastest' },
  { state: 'North Dakota', abbr: 'ND', percentChange: 15.8, popChange: 106503, changeCat: 'fastest' },
  { state: 'Neveda', abbr: 'NV', percentChange: 15,  popChange: 404063, changeCat: 'fastest' },
  { state: 'Pennsylvania', abbr: 'PA', percentChange: 2.4, popChange: 300321, changeCat: 'slowest' },
  { state: 'Illinois', abbr: 'IL', percentChange: -0.1, popChange: -19041, changeCat: 'shrinking' },
  { state: 'Mississippi', abbr: 'MS', percentChange: -0.2, popChange: -1816, changeCat: 'shrinking' },
  { state: 'West Virginia', abbr: 'WV', percentChange: -3.2, popChange: -68207, changeCat: 'shrinking' },

]

console.log('states >> ', statesData) //diag


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
  
  // Create scales for statesData
  xScale = d3.scaleBand()
    .domain(statesData.map(d => d.state))
    .range([0, width - margin.left + 2])
    .padding(0.2)

  yScale = d3.scaleLinear()
    .domain([d3.min(statesData, d => d.percentChange) - 0.5, d3.max(statesData, d => d.percentChange) + 1])
    .range([height - margin.bottom, margin.top])
  // create axes
  // xAxis = d3.axisBottom(xScale) // TODO remove
  yAxis = d3.axisLeft(yScale)

  // append svg
  svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  // append axes
  // TODO remove
  // svg.append('g')
  // .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
  // .call(xAxis)
  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
  // append title
  svg.append('text')
    .attr('x', (width + margin.left) / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'chart-title')
    .text('Fastest v. Slowest Growing/Shrinking States')
  // append axis labels
  // TODO remove
  // svg.append('text')
  //   .attr(
  //     'transform', 
  //     `translate(${width  / 2 + margin.right}, ${height - margin.bottom + 45})`)
  //   .style('text-anchor', 'middle')
  //   .attr('class', 'axis-label')
  //   .text('State')
    
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', - (height/2))
    .attr('y', margin.left / 2 - 30)
    .style('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('% of Population Change')
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
      
  
  // append rect.bars
  svg.selectAll('rect.bar')
    .data(statesData)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => margin.left + xScale(d.state))
    .attr('y', d => yScale(Math.max(0, d.percentChange)))
    .attr('width', xScale.bandwidth())
    .attr('height', d => Math.abs(yScale(d.percentChange) - yScale(0)))
    .attr('fill', d => comparisonColorScale(d.changeCat))
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
    .on('mouseover', (event, d) => {
      tooltip.style('opacity', 1)
        .html(
          `
          <p>State: ${d.state}</p>
          <p>Percent Change: ${d.percentChange}%</p>
          <p>Population Change: ${d.popChange}</p>
          `
        )
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 30) + 'px');
    })
    // clean up after myself
    .on('mouseout', () => {
      tooltip.style('opacity', 0);
    })
  // add state abbr labels to top of each rect.bar
  svg.selectAll('text.abbr-label')
    .data(statesData)
    .join('text')
    .attr('class', 'abbr-label')
    .attr('x', d => margin.left + xScale(d.state) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(Math.max(0, d.percentChange)) - 8)
    .attr('text-anchor', 'middle')
    .text(d => d.abbr)
  // create legend
  
  const legendBox = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${legend.x}, ${legend.y})`)
  
  const categories = ['Fastest Growth', 'Slowest Growth', 'Shrinking']
  
  legendBox.selectAll('rect')
    .data(categories)
    .join('rect')
    .attr('class', 'legend.rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 25)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => comparisonColorScale(d))
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
  legendBox.selectAll('text')
    .data(categories)
    .join('text')
    .attr('class', 'legend-label')
    .attr('x', 20)
    .attr('y', (d, i) => i * 25 + 15)
    .style('text-anchor', 'start')
    .text(d => d.charAt(0).toUpperCase() + d.slice(1))
  
  // create a line at zero
  svg.append('line')
    .attr('x1', margin.left)
    .attr('x2', width - margin.right + '2em')
    .attr('y1', yScale(0))
    .attr('y2', yScale(0))
    .attr('stroke', maroon)
    .attr('stroke-width', 1)
    .attr('opacity', 0.5)

  const statesOfInterest = statesData.map(d => d.state)

  console.log('states of interest >>', statesOfInterest) //diag

  const filterStatesData = state.data.filter(d => 
    statesOfInterest.includes(d.current_state))
  
  console.log('filtered states data >>', filterStatesData)  //diag
  
  const filterOnePerYear = filterStatesData.filter(d => d.from === 'Alabama')

  console.log('filter one per year >>', filterOnePerYear)
  
  // this was a bear...maybe there are more idiomatic ways of doing it in D3?
  // I am convinced that I don't exactly understand reduce() if asked to explain on the spot
  function sumAbroadAndDiffStates (data) {
    return data.reduce((accumulator, item) => {
      const existingState = accumulator.find(
        (state) => state.current_state === item.current_state
      )
      if (existingState) {
        existingState.abroad_total += item.abroad_total
        existingState.from_different_state_total += item.from_different_state_total
      } else {
        accumulator.push({
          current_state: item.current_state,
          abroad_total: item.abroad_total,
          from_different_state_total: item.from_different_state_total,
        })
      }
      return accumulator
    }, [])
  }
  
  const sumMigrantsByState = sumAbroadAndDiffStates(filterOnePerYear);
  console.log(sumMigrantsByState)

  // build scales
  xScaleAbroadState = d3.scaleBand()
    .domain(sumMigrantsByState.map(d => d.current_state))
    .range([0, width - margin.left])
    .padding(0.2)

  yScaleAboardState = d3.scaleLinear()
    .domain([0, d3.max(sumMigrantsByState, d => 
      d.abroad_total + d.from_different_state_total)]).nice()
    .range([height - margin.bottom, margin.top])

  // create axes
  xAxisAbroadState = d3.axisBottom(xScaleAbroadState)
  yAxisAbroadState = d3.axisLeft(yScaleAboardState)

  svg = d3.select('#stacked-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
  
  // draw axes
  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxisAbroadState)
  
  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxisAbroadState)

  const stack = d3.stack()
      .keys(['abroad_total', 'from_different_state_total'])
      .order(d3.stackOrderDescending)

  const stackedData = stack(sumMigrantsByState)
  
  const grouped = svg.selectAll('g.stacked-bar')
      .data(stackedData)
      .join('g')
      .attr('class', 'stacked-bar')
      .attr('fill', d => abroadStateColorScale(d.key))

  grouped.selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', (d, i) => margin.left + xScaleAbroadState(sumMigrantsByState[i].current_state))
      .attr('y', d => yScaleAboardState(d[1]))
      .attr('width', xScaleAbroadState.bandwidth())
      .attr('height', d => yScaleAboardState(d[0]) - yScaleAboardState(d[1]))
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5)
  
  const stackedCategories = ['From Abroad', 'From Different State']

  // create legend for stacked barchart
  const stackedLegendBox = svg.append('g')
      .attr('class', 'stacked-legend')
      .attr('transform', `translate(${stackedLegend.x}, ${stackedLegend.y})`)
  
  stackedLegendBox.selectAll('rect')
    .data(stackedCategories)
    .join('rect')
    .attr('class', 'stacked-legend.rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 25)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => abroadStateColorScale(d))
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)

  stackedLegendBox.selectAll('text')
    .data(stackedCategories)
    .join('text')
    .attr('class', 'stacked-legend-label')
    .attr('x', 20)
    .attr('y', (d, i) => i * 25 + 15)
    .style('text-anchor', 'start')
    .text(d => d.charAt(0).toUpperCase() + d.slice(1))

  draw()
}

function draw() {

}


// function init() {
    
//     // filter top five fastest growing states in 2020 census
//   const fastestGrowingData = state.data.filter(d=>
//     d.current_state === 'Utah' ||
//     d.current_state === 'Idaho' ||
//     d.current_state === 'Texas' ||
//     d.current_state === 'North Dakota' || 
//     d.current_state === 'Nevada'
//     )
//     console.log('Stacked States Data >>', fastestGrowingData) //diagnostic
  
//   // grow data by year; created a Map datatype that'll need conversion
//   // several false states on learning how rollup() and sum() work in d3
//   const groupedByYear = d3.rollup(fastestGrowingData, i => {
//     return {
//       from_different_state_total: d3.sum(i, d => d.from_different_state_total),
//       abroad_total: d3.sum(i, d => d.abroad_total),
//       state_total: d3.sum(i, d => d.population),
//     }
//   }, 
//     d => d.year,
//     d => d.current_state,
//   )

//   console.log('grouped by year >>', groupedByYear)

//   // convert Map to array of objects; destructuring ftw
//   const aggByYear = Array.from(groupedByYear, ([year, stateValues]) => {
//     return Array.from(stateValues, ([state, values]) => ({
//       year: new Date(year),
//       current_state: state,
//       ...values,
//     }));
//   }).flat()
  
//   console.log("agg by year >>", aggByYear)

//   // calculate growth not attributable to migration
//   aggByYear.forEach(d => {
//     d.internal_growth = d.state_total - d.from_different_state_total - d.abroad_total
//   })

//   // group data by state
//   const dataByState = d3.group(aggByYear, d => d.current_state)
//   const joinData = Array.from(dataByState, ([state, values]) => ({
//     state,
//     data: values
//   }))
//   console.log('data by state >>', dataByState)  // diagnostic
//   console.log('joinData >>', joinData)
  
//   // create scales
//   xScale = d3
//     .scaleBand()
//     .domain(joinData.map(d => d.state))
//     .range([0, width - margin.right])
//     .padding(0.1)
//     .paddingInner(0.2)
  
//   yScale = d3
//     .scaleLinear()
//     // nice() function: https://www.d3indepth.com/scales/
//     .domain([0, d3.max(aggByYear, d => d.state_total)]).nice()
//     .range([height - margin.bottom, margin.top])
//   // set the color scale
//   colorScale = d3.scaleOrdinal()
//     .domain(['from_different_state', 'abroad', 'internal_growth'])
//     .range([maroon, teal, dusty_rose])
//   // create keys
  
//   const stack = d3.stack()
//     .keys(['from_different_state_total', 'abroad_total', 'internal_growth'])
//     .value((d, key) => d.data[key])


//   // create the array to graph
//   const stackedData = stack(joinData)
//   console.log('stackedData >>', stackedData)  // diagnostic

//   svg = d3.select('#container')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height)
  
//   // assign axes to scales
//   xAxis = d3.axisBottom(xScale)
//   yAxis = d3.axisLeft(yScale)
  
//   // draw axes
//   svg
//     .append('g')
//     .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
//     .call(xAxis)
//   svg
//     .append('g')
//     .attr('transform', `translate(${margin.left}, 0)`)
//     .call(yAxis)
//   // draw title
//   svg
//     .append('text')
//     .attr('x', (width + margin.left) / 2)
//     .attr('y', margin.top / 2)
//     .attr('text-anchor', 'middle')
//     .attr('class', 'chart-title')
//     .text('Source of Migration from Top 5 Fastest Growing States (2010-2020)');
//   // draw axis labels
//   svg
//     .append('text')
//     .attr(
//       'transform', 
//       `translate(${width  / 2 + margin.right}, ${height - margin.bottom + 45})`)
//     .style('text-anchor', 'middle')
//     .attr('class', 'axis-label')
//     .text('State Name')
//   svg
//     .append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('x', - (height/2))
//     .attr('y', margin.left / 2 - 30)
//     .style('text-anchor', 'middle')
//     .attr('class', 'axis-label')
//     .text('Growth in Each State')
  
//   const tooltip = d3.select('body')
//     .append('div')
//     .attr('class', 'tooltip')
//     .style('opacity', 0)
  
//   const states = svg.selectAll('.state')
//     .data(stackedData)
//     .join('g')
//     .attr('class', 'state')
//     .attr('fill', (d, i) => colorScale(stack.keys()[i]));

//   states.selectAll('rect')
//     .data(d => d)
//     .join('rect')
//     .attr('x', d => xScale(d.data.state))
//     .attr('y', d => yScale(d[1]))
//     .attr('height', d => yScale(d[0]) - yScale(d[1])) 
//     .attr('width', xScale.bandwidth())
  
//   // draw()
// }
/*
function draw() {
  // draw bars
   
}
*/
