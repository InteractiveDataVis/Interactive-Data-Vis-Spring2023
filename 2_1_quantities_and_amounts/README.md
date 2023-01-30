# Section 2 | Tutorial 1 | Quantities and Amounts

The goals for this tutorial are:

- to introduce the basic mechanics of how d3 allows you to [select](https://github.com/d3/d3-selection) HTML/SVG elements and map them to data elements.
- to introduce [HTML svg](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) coordinate system.
- to learn how [d3-scales](https://github.com/d3/d3-scale) can map abstract data elements to visual variables.
- to learn the tools to make your own bar chart.

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own version of the bar chart from the demo branch using the files present in the root of this directory (`2_2_quantities_and_amounts/` [index.html](index.html), [style.css](style.css), [main.js](main.js)), just like we did in the tutorials in section 1. You may use the existing dataset, or a new one.
- [ ] Turn this **vertical bar chart** into a **horizontal bar chart**. This will require adjusting both scales to consider how the data should map back to the svg coordinate plane. (_Tip_: start by getting your bars to show, even if they are not yet positioned/sized correctly -- sometimes it is easier to understand where something should go by seeing where it currently is).

**BONUS:**

- [ ] Add labels to each bar, either by appending `text` to each bar or using [d3-axis](https://github.com/d3/d3-axis) (already included in d3 library).
- [ ] Add a [color scale](https://github.com/d3/d3-scale-chromatic) to your bar chart. This is another type of scale where your range is going to be color values instead of screen dimensions. Feel free to use `ordinal` or `sequential` colorscales (this will depend on what type of field you want to map to color).
- [ ] **Super bonus**: make a horizontal bar chart with divs (still appending them to the page with d3).

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. **NOTE**: It can take up to 10 minutes for pushed up code to appear in a deployed site. Post the following as a comment to the appropriate post on the [commons site](https://data73200Spring2023.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)