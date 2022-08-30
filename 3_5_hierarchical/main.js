/**
 * CONSTANTS AND GLOBALS
 * */


/**
* APPLICATION STATE
* */
let state = {

};

/**
* LOAD DATA
* */
d3.json("../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

  draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
  
}