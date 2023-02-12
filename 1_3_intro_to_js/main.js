console.log('hello world');

let numClicks = 0;

const incrementClicks = () => {
    numClicks += 1;
    document.getElementById('click-count').innerHTML = numClicks;
}

const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

const svg = d3.select("#bar-chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
d3.csv("us-presidential-popular-vote-1904.csv").then( function(data) {
        // set x-axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.Party))
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .attr("letter-spacing", (d,i) => i*.04-.1 + "em") //experiment
            .style("text-anchor", "end");
        // set y-axis
        const y = d3.scaleLinear()
            .domain([0, 9000000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        // draw bars
        svg.selectAll("bars")
            .data(data)
            .join("rect")
                .attr("x", d => x(d.Party))
            .attr("y", d => y(d.Votes))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.Votes))
            .attr("fill", "#ff9999")
        
})