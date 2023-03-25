/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40}
//   radius = ; we don't need a radius with a barchart

// // since we use our scales in multiple functions, they need global scope
let xScale, yScale, colorScale;

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
    .paddingInner(0.1)

  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.vote_count) + 8750]) // is there a better way to do this?
    .range([height - margin.bottom, margin.top])

  // Set the color scale
  colorScale = d3.scaleOrdinal()
    // .domain('maroon_1', 'maroon_2', 'maroon_3', 'maroon_4')
    .range(['#562424', '#6d3636', '#a94c4c','#924444', ])
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
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
    
    // xAxis label
    svg
      .append('text')
      .attr('transform', 'translate(' + (width/2) + ' ,' + (height) + ')')
      .style('text-anchor', 'middle')
      .text('Candidate');
  
    // yAxis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', - (height/2))
      .attr('y', 15)
      .style('text-anchor', 'middle')
      .text('Popular Vote');

      const rect = svg
      .selectAll('rect.bar')
      .data(state.data)
      // .join('rect')
      .join(
        enter => enter
          .append('rect')
          .attr('class', 'bar')
          .attr('width', xScale.bandwidth())
          .attr('height', 0)
          .attr('x', d => xScale(d.candidate) + margin.left)
          .attr('y', height - margin.bottom)
          .attr('fill', (d, i) =>  colorScale(i))
          .call(sel => sel
            .transition()
            .duration(2500)
            .attr('height', d => height - margin.bottom - yScale(d.vote_count))
            .attr('y', d => yScale(d.vote_count))
          )
      )
      
    const dataLabels = svg
      .selectAll('text.data-label')
      .data(state.data)
      // .join('text')
      .join(
        enter => enter
          .append('text')
          .attr('class', 'data-label')
          .attr('x', d => xScale(d.candidate) + xScale.bandwidth() / 2 + margin.left)
          .attr('y', height - margin.bottom)  // Again, start at the bottom
          .attr('text-anchor', 'middle')
          .text(d => d.vote_count)
          .call(sel => sel
            .transition()
            .duration(2500)
            .attr('y', d => yScale(d.vote_count) - 10)
            // this was a serious pain in the butt with lots of trial and error
            // however, glad I knew a little javascript before this class
            .tween('text', function (d) {
              const selfSelector = d3.select(this)
              const interpolator = d3.interpolateNumber(0, d.vote_count)
              return (t) => {
                selfSelector.text(Math.round(interpolator(t)))
              }
            })
            )
      )
}