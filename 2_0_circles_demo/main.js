// generate arary of random data
const data = d3.range(10) // d3 function that makes an array
  .map((d) => (
    [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100) ]
  ));

// created dummy data that looks like [x,y] coordinates
console.log('data', data)

// select container and append an svg
const svg = d3.select("#container").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("overflow", "show")

// break the chain for legibility
svg.selectAll("circle.dot")
// second part - connect data to the DOM
    .data(data)
// third part
    .join("circle")
// fourth step
    .attr("class", "dot")
// what are the three attributes to make circles visible?
    .attr("cx", ([x, y]) => x * 5)
    .attr("cy", ([x, y]) => y * 5)
    .attr("r", 5)



















// // only selector the first, because we only have one container
// const svg = d3.select("#container")
// // append svg
//     .append("svg")
// // set width and height 500 * 500 (default is 300 x 150)
//     .attr("width", 500)
//     .attr("height", 500)
//     .style("overflow", "visible"); // circles visible even when not within svg

// // break chain for readability
// // first part of binding
// svg.selectAll("circle.dot")
//     // second part - connect __ to DOM
//     .data(data)
//     // third part
//     .join("circle")
//     // be specific in selectAll, and make sure element matches
//     .attr("class", "dot")
//     // inspect circles show they are in DOM, but not visible
//     // add attributes that make circle visible
//     // (cx, cy, r)
//     // how do you figure out where the x value is?
//     // hint => will be a function
//     // how to expose x, access first this in the array of data element
//     .attr("cd", d => {
//         console.log('d', d)
//     })
//     // to display data - its run 10 times
//     // for each element in the array we see it
//     // how would we get the first element?
//     .attr("cx", d => d[0] * 5)
//     // you can use js shorthand to tell d3 what is will look like
//     // called destructuring 
//     .attr("cy", ([x, y]) => y * 5)
//     .attr("r", 10)

//     // they've moved into their [x,y] position based on their data
//     // SVG coordinates start at top left
//     // we didn't use any scales

//     /* Scales */
//     // last class we intro'd scales
//     // they can help us take something that is 
//     // relevant to data and make it relevant to our browser
//     // mapping data domain to browser domain
//     // Data vis is trying to explain abstract things to
//     // someone by giving them a metaphor
//     // Scales are really important for visual metaphors
//     // data into pixels
//     // A ton of different scales
//     // Most helpful for us in d3

//     // scale band - discrete input -> discrete output
//     // e.g. days of the week

//     // scaleQuantize (histogram) -> give continuous inputs 
//     // and expect d3 to divide it into discrete outputs for you

//     // Scale linear
//     // taking continuous input of number, 
//     // and apply to pixel value
//     // mental math scale for circles - multiple by 5
//     // d3 does the math for us!
//     // but this is what a scale does

//     // Scale band
//     // apples, oranges, bananas
//     // in our head - 500px, divide by 3,
//     // padding on each side (100)
//     // 100 pixels each

//     // Axes
//     // always come back to d3 for axes
//     // takes a scale and just creates an axis
//     // appends a group to your svg with a line
//     // and ticks
//     // and a value
//     // super helpful to use axes but complicated to think about

//     // example
//     // x scale (linear) 0 -> 1, 0 -> width
//     // y scale (linear) 0 -> 1, height -> 0
//     // can feel backwards because in svgs the coordinates
//     // start at the top left
//     // data domain should always follow [min, max]
//     // domain - data world, chart range world
//     // we want the chart to work with the data we have
//     // not the data to be manipulated to the chart

//     // appending axes complicated
//     // thing called 'called'
//     // call is a specific d3 method
//     // it says "run this function one time"
//     // creating a 'g' to append this axis
//     // then appending onto svg
//     // if we didn't use call, we may append
//     // the axis a bunch of times

//     // they do almost everything for us,
//     // except position themselves
//     // we need to position them

//     // y axis doesn't need to be positioned (axis-left),
//     // but if it were axis right we would have to translate
//     // it knows which side to flip the ticks
//     // but we still have to position it ourselves

//     /* Data, Chart Types */
//     // focus more on how to make these things, 
//     // not the theories of which charts to use
//     // but quickly want to cover

//     /* Bar Chart */
//     // one of the most complicated things to understand
//     // starting with complicated stuff and then will get easier
//     // You can use the same data -> just going to turn this into
//     // a horizontal bar chart
    