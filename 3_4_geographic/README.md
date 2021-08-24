# Section 3 | Tutorial 4 | Geographic

The goals for this tutorial are:

- to revisit GeoJSON data, and how geographical features on our earth translate to projected shapes on an svg.
- to reinforce [projections](https://github.com/d3/d3-geo#projections), in conjunction with [d3.geo-path](https://github.com/d3/d3-geo#geoPath), transforms latitude and longitude space into pixel space.
- to be exposed to the concept of something updating with every mouse movement -- the early stages of what will later become a tooltip.

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own version of the map, using the us state geojson data provided in the [data folder](../data/), or another geojson of your choice (feel free to pull in data of the world or of another country if you like).

- [ ] Using your own lat/long dataset, add points to your map. This can be the same dataset you chose for the section 2 version of this tutorial, as long as its **not** the dataset leveraged in the section 2 **demo** ([`usHeatExtremes.csv`](../data/usHeatExtremes.csv))

- [ ] Add mouseover behavior **to each point**, so its data updates state, and is displayed in our tooltip display.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Use the dropdown to change the [type of projection](https://observablehq.com/@d3/projection-transitions), and update your points accordingly.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200fall2021.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)


