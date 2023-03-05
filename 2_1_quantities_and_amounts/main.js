/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.6;
const height = window.innerHeight * 0.6;
margin = 50;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const svg = d3.select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

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
    svg.selectAll('rect.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      // rect of class bar are available in the DOM; make them visible
      .attr('x', d => xScale(d.activity))
      .attr('y', d => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', d => (height - margin) - yScale(d.count)) 

  })
