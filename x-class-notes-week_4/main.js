/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = 50;
//   radius = ;

/* LOAD DATA */
d3.csv("../data/squirrelActivities.csv", d3.autoType)
  .then(data => {
    console.log(data)

    const svg = d3.select("#container")
      .append('svg')
      .attr("width", width)
      .attr("height", height)

    /* SCALES */
    // x scale
    const xScale = d3.scaleBand()
      .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])   // data values
      .range([margin, width - margin])
      .padding(0.1)

    const mapped = [...data.map((d => d.count))]
    console.log('mapped', mapped)
    
    // y scale 
    const yScale = d3.scaleLinear()
      // when working with bar charts, min should be zero
      .domain([0, Math.max(...data.map(d => d.count))])
      .range([height- margin, margin])

    /* HTML ELEMENTS */
    svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
    // make these bars visible
    .attr("x", d => xScale(d.activity))
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())  // helps when resizing the window
    .attr("height", d => (height - margin) - yScale(d.count))

    // create axes 
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
      .call(xAxis)
      .style("transform", `translate(0px, ${height - margin}px`)
    svg.append("g")
      .call(yAxis)
      .style("transform", `translate(${margin}px, 0px)`)
  });