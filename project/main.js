/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40}

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
  d3.csv('../data/migration_flows_from_2010_to_2019.csv', d3.autoType)
    .then(raw_data => {
      console.log('loaded data:', raw_data)
      state.data = raw_data
      console.log('state_data', state.data)
    //   init();
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