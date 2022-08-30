/* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ,
//   radius = ;

// // since we use our scales in multiple functions, they need global scope
// let xScale, yScale;

/* APPLICATION STATE */
let state = {
  // data: [],
};

/* LOAD DATA */
d3.csv('[PATH_TO_YOUR_DATA]', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */



  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  /* HTML ELEMENTS */
 


}