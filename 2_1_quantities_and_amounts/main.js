/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.6;
const height = window.innerHeight * 0.6;
margin = 50;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    // test out how to access domain from array of objects
    activity = [...data.map((d => d.activity))]
    console.log('activity', activity)
    // nice and easy

    /* SCALES */
    // x scale
    const xScale = d3.scaleBand()
      .domain([...data.map((d => d.activity))])
      .range([margin, width - margin])
    
    // y scale
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.count))])
      .range([height - margin, margin])
    
    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

  })
