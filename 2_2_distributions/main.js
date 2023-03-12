/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 50,
  radius = 4;

/* LOAD DATA */
d3.csv("../data/babies.csv", d3.autoType)
  .then(data => {
    console.log(data)

    /* SCALES */
    // x-scale will be linear, age of mother
    const xScale = d3.scaleLinear()
      .domain(0, d3.max(data, d => d.age))
      .range([margin.left, width - margin.right])
    console.log(xScale)
    
    // y-scale will be linear, weight of baby in oz
    const yScale = d3.scaleLinear()
      .domain(0, Math.max(...data.map(d => d.bwt)))
      .range([height - margin.bottom, margin.top])
    
      /* HTML ELEMENTS */

    // append svg so I have something to reference in the container
    const svg = d3.select("#container")
      .attr("width", width)
      .attr("height", height)
    
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom}px)`)
      .call(xAxis);
    
      const yAxis = d3.axisLeft(yScale)
    svg.append("g")
      .attr("transform", `translate(${margin.left}px,0)`)
      .call(yAxis);
    
  });