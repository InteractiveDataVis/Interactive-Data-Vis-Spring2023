/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerWidth * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40}
/**
* APPLICATION STATE
* */

let svg;
let state = {
    geojson: [],
    hover: {
        latitude: null,
        longitude: null,
        state: null,
    }
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json('../data/usState.json')
]).then(([geojson]) => {
    state.geojson = geojson;
    console.log('state: ', state);
    init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
    function init() {
    svg = d3.select('#container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'aqua')

    // create projection
    const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson)

    // create geopath
    const geoPath = d3.geoPath(projection)

    // draw map
    svg.selectAll('.state')
        .data(state.geojson.features)
        .join('path')
        .attr('class', 'state') // remember 4th jonas brother
        .attr('d', d => geoPath(d))
        .attr('fill', 'transparent')
        .on('mouseover', (event, d) => {
            console.log('event', event)
            // hover: {
            //     latitude: null,
            //     longittude: null,
            //     state: null,
            // }
            // add the name
            state.hover.state = d.properties.NAME

        })
        .on('mousemove', (event) => {
            console.log('event', event)
            // const mx = d3.pointer(event)[0]
            // const my = d3.pointer(event)[1]
            const [mx, my] = d3.pointer(event)  // decomposition
            // use projection invert method to get latitude and longitude
            const [projX, projY] = projection.invert([mx, my])
            state.hover.latitude = projY
            state.hover.longitude = projX
            draw()
        })
    
    draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
    const hoverBox = d3.select('#hover-content')
    console.log(state.hover)
    hoverData = Object.entries(state.hover)
    console.log(hoverData)
    hoverBox.selectAll('div.row')
        .data(hoverData)
        .join('div')
        .attr('class', 'row')
        .html(d => d)

}