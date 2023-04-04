/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.6;
const height = window.innerHeight * 0.6;
margin = 50;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    /* VERTICAL BAR CHART */
    const svg = d3.select('#vchart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // test out how to access domain from array of objects
    activity = [...data.map((d => d.activity))]
    console.log('activity', activity)
    // sweet! nice and easy

    /* SCALES */
    // x scale
    const xScale = d3.scaleBand()
      .domain([...data.map(d => d.activity)])
      .range([margin, width - margin])
      .padding(0.15) // as a bit of spaces between the rect bars
    
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
      // rect of class bar are available in the DOM; now draw them with data
      .attr('x', d => xScale(d.activity))
      .attr('y', d => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', d => (height - margin) - yScale(d.count)) 

    // Draw the axes 
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    svg.append('g')
      .call(xAxis)
      .style('transform', `translate(0px, ${height - margin}px)`)
    svg.append('g')
      .call(yAxis)
      .style('transform', `translate(${margin}px, 0px)`)
    
    /* HORIZONTAL BARCHART */
    const svgH = d3.select('#hchart-container')
      .append('svg')
      .attr('width', width)  // IS THIS RIGHT?
      .attr('height', height)  // OR THIS?

    const xScaleH = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.count))])
      .range([margin, width - margin])
    
    const yScaleH = d3.scaleBand()
      .domain([...data.map((d => d.activity))])
      .range([height - margin, margin])
      .padding(0.15)
    
    svgH.selectAll('rect.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      // we've appended to the DOM, let's draw!
      .attr('x', d => xScaleH(d.count))
      .attr('y', d => yScaleH(d.activity))
      .attr('width', d => xScaleH(d.count))
      .attr('height', yScaleH.bandwidth())
      .attr('fill', '#9400D3')

    const xAxisH = d3.axisBottom(xScaleH)
    const yAxisH = d3.axisLeft(yScaleH)

    svgH.append('g')
      .call(xAxisH)
      .style('transform', `translate(0px, ${width - margin}px)`)

    svgH.append('g')
      .call(yAxisH)
      .style('transform', `translate(${margin}px, 0px)`)

  })
