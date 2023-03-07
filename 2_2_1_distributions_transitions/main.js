/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, left: 60, bottom: 60, right: 20},
  radius = 5;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType)
  .then(data => {
    console.log(data)
   

    /* SCALES */
    // x scale
    const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right])
 

    // y scale
    const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

    // color scale
    const colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

    
    /* HTML ELEMENTS */

    // append svg
    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)


    // append circles
    const dots = svg.selectAll(".dot")
      .data(data)
      .join(
        enter => enter
        .append("circle")
        .attr("r", 0)
        .call(selection => 
          selection
          .transition()
          .duration(1000)
          .delay((d, i) => i * 20)
          .attr("r", radius)),
        update => update,
        exit => exit.remove()
      )
      .attr("class", "dot")
      .attr("cx", d => xScale(d.ideologyScore2020))
      .attr("cy", d => yScale(d.envScore2020))
      .attr("fill", d => colorScale(d.Party))
    
  });


