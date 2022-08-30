 /* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ;

/* LOAD DATA */
d3.csv('[PATH_TO_YOUR_DATA]', d => {
  return {
    // year: new Date(+d.Year, 0, 1),
    // country: d.Entity,
    // population: +d.Population
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

});