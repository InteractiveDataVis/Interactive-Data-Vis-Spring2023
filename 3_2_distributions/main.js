/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerWidth * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40},
  radius = 5;
  bigger_radius = 7;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/babies.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain([d3.min(state.data, d => d.age), d3.max(state.data, d => d.age)])
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain([0, (d3.max(state.data, d => d.bwt) + 10)])
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

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis)

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    // .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)

  const dot = svg
    .selectAll('circle.dot')
    .data(state.data, d => d.case)
    // .data(filteredData, d => d.BioID)
    // .join('circle')
    // .attr('class', 'dot')
    // .attr('cx', d => xScale(d.age))
    // .attr('cy', d => yScale(d.bwt))
    // .attr('r', radius)
    // .style('fill', d => (d.smoke === 1) ? 'lightgrey' : 'maroon')
    // .style('stroke', d => (d.smoke === 1) ? 'darkgrey' : 'darkred')
    // .attr('opacity', 0.6)
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
    );
}