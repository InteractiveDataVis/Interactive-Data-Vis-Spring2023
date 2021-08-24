/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;
// since we use our scales in multiple functions, they need global scope
let xScale, yScale;

/* APPLICATION STATE */
let state = {
  data: [],
};

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  // xscale - categorical, activity
  xScale = d3.scaleBand()
    .domain(state.data.map(d=> d.activity))
    .range([0, width]) // visual variable
    .paddingInner(.2)

    // yscale - linear,count
  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d=> d.count)])
    .range([height, 0])

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // bars
  svg.selectAll("rect")
    .data(state.data)
    .join("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", d=> height - yScale(d.count))
    .attr("x", d=>xScale(d.activity))
    .attr("y", d=> yScale(d.count))
}