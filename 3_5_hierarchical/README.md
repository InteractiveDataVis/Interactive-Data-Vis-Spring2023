# Tutorial 6

The goals for this tutorial are:

- to introduce [hierarchical](https://github.com/d3/d3-hierarchy) and nested data.
- to start exploring how d3-layout algorithms can help create complex views.
- to show how seemingly different views are in their nature structured very similarly (circle pack, icicle, treemap, dendrograms)

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own version of the treemap we made in class using the [`flare.json`](../data/flare.json) dataset provided (or if you are up for the challenge create your own dataset — see tip below if you are using your own dataset).

- [ ] Turn this treemap into a [circle pack](https://github.com/d3/d3-hierarchy#pack) layout instead of the treemap (this will take using a different layout function, and mapping different graphical elements to data).

- [ ] Add mouseover behavior to each point, so its data updates state, and is displayed in our tooltip display. Move the tooltip to it's new position.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Do all of this for your own data. This may require data transformations. Take note of how the [`flare.json`](../data/flare.json) data is structured. [This observable notebook](https://observablehq.com/@mbostock/2019-h-1b-employers) includes another example of reformatting your data into the proper format that D3 expects. Specifically, take a look at how the notebook defines the `root` node.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200fall2021.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)



