/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40}
//   radius = ; we don't need a radius with a barchart

// // since we use our scales in multiple functions, they need global scope
let xScale, yScale;

/* APPLICATION STATE */
let state = {
  data: [],
};

/* LOAD DATA */
d3.csv('../data/1824_us_pres_pop_vote.csv', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  console.log('state.data', state.data)
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.candidate))
    .range([margin.left, width - margin.right])
    .paddingInner(0.3)

  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.vote_count)])
    .range([height - margin.bottom, margin.top])

  

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  /* HTML ELEMENTS */
    // define svg
    const svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

    const xAxis = d3.axisBottom(xScale)    // not sure about adding these
    const yAxis = d3.axisLeft(yScale)     // to the draw function

    // draw xAxis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
    
    // draw yAxis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}px, 0px)`)
      .call(yAxis)
    
    // xAxis label
    svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom / 2)
        .attr('text-anchro', 'middle')
        .attr('Candidate')
  
    // yAxis label
    svg
        .append('text')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Vote Count')

    const rect = svg
      .selectAll('rect.bar')
      .data(state.data)
      .join('rect')
      .attr('class', 'bar')   // good review, I typically forget this one
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.vote_count))
      .attr('x', d => xScale(d.candidate) + margin.left)
      .attr('y', d => yScale(d.vote_count))
      // .attr('y', d => height - margin.bottom - yScale(d.vote_count))
      // .attr('y', d => height - yScale(d.vote_count))
    

}