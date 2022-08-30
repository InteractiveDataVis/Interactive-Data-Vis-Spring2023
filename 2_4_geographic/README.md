# Section 2 | Tutorial 4 | Geographic

The goals for this tutorial are:

- to reinforce the basic mechanics of how d3 allows you to [select](https://github.com/d3/d3-selection) HTML/SVG elements and map them to data elements.
- to learn the tools to make your own line chart.
- to explore GeoJSON data, and how geographical features on our earth translate to projected shapes on an svg.
- to understand [projections](https://github.com/d3/d3-geo#projections), in conjunction with [d3.geo-path](https://github.com/d3/d3-geo#geoPath), transforms lattitude and longitude space into pixel space.
- to grasp that d3.js svg maps are as simple as lines and circles, and can be manipulated as such, with stroke, fill, etc.

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2022/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2022/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own version of the map, using the us state geojson data provided in the [data folder](../data/), or another geojson of your choice (feel free to pull in data of the world or of another country if you like).

- [ ] Using your own lat/long dataset _OR_ the provided dataset for this exercise, [`usHeatExtremes.csv`](../data/usHeatExtremes.csv) (also in the [data folder](../data/)), add points to your map. **HINT:** since we're still in svg, we can just add circles to the map, like we've done before, but you'll need to use your `projection` to translate from (long,lat) values to (x,y) values.

- [ ] Make intentional design decisions -- colors, sizes, labels, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Add another data element to your map, such as using color or radius to represent a value, [like this](https://observablehq.com/@d3/bubble-map) or [this](https://observablehq.com/@d3/non-contiguous-cartogram?collection=@d3/d3-geo).

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200fall2022.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Fall2022/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2022/[TUTORIAL_PATH]/`)

