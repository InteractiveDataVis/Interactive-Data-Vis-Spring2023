/* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ,
//   radius = ;


// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
// let svg;
// let xScale;
// let yScale; ...

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/populationOverTime.csv', d => {
  // use custom initializer to reformat the data the way we want it
  // ref: https://github.com/d3/d3-fetch#dsv
  return {
    // year: new Date(+d.Year, 0, 1),
    // country: d.Entity,
    // population: +d.Population
  }
})
  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES


  // + AXES


  // + UI ELEMENT SETUP


  // + CREATE SVG ELEMENT
  

  // + CALL AXES


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    // .filter(d => d.country === state.selection)

  // + UPDATE SCALE(S), if needed
  

  // + UPDATE AXIS/AXES, if needed


  // UPDATE LINE GENERATOR FUNCTION


  // + DRAW LINE AND/OR AREA
  

}