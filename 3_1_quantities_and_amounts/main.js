/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
  radius = 10;

// // since we use our scales in multiple functions, they need global scope
let xScale, yScale;

/* APPLICATION STATE */
let state = {
  data: [],
};

/* LOAD DATA */
d3.csv("../data/squirrelActivities.csv", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  console.log(state.data.map(d => d.activity))
  /* SCALES */
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.activity))
    .range([margin.left, width - margin.right])
    .paddingInner(0.2)

  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.count)])
    .range([height - margin.bottom, margin.top])


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  /* HTML ELEMENTS */
    // define svg
    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    const rect = svg
      .selectAll("rect.bar")
      .data(state.data)
      .join("rect")
      .attr("class", "bar") // remember the fourth brother!
      .attr("width", xScale.bandwidth())
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("height", d => height - yScale(d.count))
 
}