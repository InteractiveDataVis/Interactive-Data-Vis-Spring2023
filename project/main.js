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
        // filter Utah data
        const utahData = state.data
        .filter(d => d.current_state === 'Utah')
      console.log('Utah data >>', utahData) // diagnostic
  
      // group data by year; create objects with years as keys
      // 
      const groupedByYear = d3.rollup(utahData, i => {
        const firstInstance = i[0]
        return {
          from_different_state_total: firstInstance.from_different_state_total,
          abroad_total: firstInstance.abroad_total,
          utah_total: firstInstance.population,
        }
      }, d => d.year)
  
      console.log('grouped by year >>', groupedByYear) // diagnostic
  
      // Convert Map objects to array of objects; destructuring for the win!
      const aggByYear = Array.from(groupedByYear, ([year, values]) =>
        ({year: new Date(year), ...values}))
  
      console.log('agg by year >>', aggByYear) // diagnostic
  
      let totalGrowthFromDifferentStates = 0
      let totalGrowthFromAbroad = 0
      let totalGrowthInState = 0 
      let previousYearPop = 0
  
      aggByYear.forEach(d => {
        totalGrowthFromDifferentStates += d.from_different_state_total
        totalGrowthFromAbroad += d.abroad_total
  
        if (previousYearPop > 0) {
          totalGrowthInState += d.utah_total - previousYearPop
        }
        previousYearPop = d.utah_total
      })
  
      // prep data for barchart
      const simpleChartData = [
        { typeOfMigration : 'From Different States', value : totalGrowthFromDifferentStates },
        { typeOfMigration : 'From Abroad', value : totalGrowthFromAbroad },
        { typeOfMigration : 'Internal Growth', value : totalGrowthInState },
      ]
      
      console.log('bar chart data >>', simpleChartData)

    // create scales
    xScale = d3.scaleBand()
      .domain(simpleChartData.map(d => d.typeOfMigration))
      .range([0, width - margin.right])
      .padding(0.1)
      .paddingInner(0.3)
    
    yScale = d3.scaleLinear()
      // nice() function: https://www.d3indepth.com/scales/
      .domain([0, d3.max(simpleChartData, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])


    
    // set the color scale
    colorScale = d3.scaleOrdinal()
      .range([maroon, teal, dusty_rose])

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
      .text('Sources of Migration to Utah (2010-2019)');

    // draw axis labels
    svg
      .append('text')
      .attr(
        'transform', 
        `translate(${width  / 2 + margin.right}, ${height - margin.bottom + 45})`)
      .style('text-anchor', 'middle')
      .attr('class', 'axis-label')
      .text('Type of Immigration')

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', - (height/2))
      .attr('y', margin.left / 2 - 30)
      .style('text-anchor', 'middle')
      .attr('class', 'axis-label')
      .text('Migrants to Utah')

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
    

    const rect = svg
      .selectAll('rect.bar')
      .data(simpleChartData)
      .join(
        enter => enter
          .append('rect')
          .attr('class', 'bar')
          .attr('width', xScale.bandwidth())
          .attr('height', 0)
          .attr('x', d => xScale(d.typeOfMigration) + margin.left)
          .attr('y', d => height - margin.bottom)
          .attr('fill', (d, i) => colorScale(i))
          .on('mouseover', (event, d) => {
            const percentOfPopulation = ((d.value / utahData[0].population) * 100).toFixed(2)
            tooltip
              .transition()
              .duration(300)
              .style('opacity', 0.9)
            tooltip
              .html(`${percentOfPopulation}% population growth`)
              .style('left', `${(event.pageX)}px`)
              .style('top', `${event.pageY - 25}px`)
          })
          .on('mouseout', () => {
            tooltip
              .transition()
              .duration(200)
              .style('opacity', 0)
          })
          .call(sel => sel
            .transition()
            .duration(1500)
            .delay((_, i) => i * 1000)
            .attr('height', d => height - margin.bottom - yScale(d.value))
            .attr('y', d => yScale(d.value))
            // learned this one in a previous exercise
            )
      )
    
    // create data labels
    const dataLabels = svg
      .selectAll('text.data-label')
      .data(simpleChartData)
      .join(
        enter => enter
          .append('text')
          .attr('class', 'data-label')
          .attr('x', d => xScale(d.typeOfMigration) + xScale.bandwidth() / 2 + margin.left)
          .attr('y', height - margin.bottom)
          .attr('text-anchor', 'middle')
          .attr('fill', (d, i) => colorScale(i))
          .text(d => 0)
          .call(sel => sel
            .transition(0)
            .duration(1500)
            .delay((_, i) => i * 1000)
            .attr('y', d => yScale(d.value) - 15)
            .tween('text', function (d) {
              const selfSelector = d3.select(this)
              const interpolator = d3.interpolateNumber(0, d.value)
              return (num) => {
                selfSelector.text(Math.round(interpolator(num)))
              }
            })
          )
      )

    draw()
  }

  function draw() {
    // draw bars
   
}
