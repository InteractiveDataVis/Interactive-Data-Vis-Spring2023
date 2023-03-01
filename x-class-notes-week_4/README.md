# Section 2 | Tutorial 2 | Distributions

The goals for this tutorial are:

- to reinforce the basic mechanics of how d3 allows you to [select](https://github.com/d3/d3-selection) HTML/SVG elements and map them to data elements.
- to reinforce [HTML svg](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) coordinate system.
- to reinforce how [d3-scales](https://github.com/d3/d3-scale) can map abstract data elements to visual variables.
- to learn the tools to make your own scatter plot.
- to add axes to an svg using [d3-axis](https://github.com/d3/d3-axis).

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own scatter plot with a *different dataset* than the one used in our demo.
- [ ] Size the dots by something data related. This requires creating a new scale. Carefully consider the domain and range of this new scale, and do your best to make the domain of the scale *dynamic* (i.e. would the scale still work if the data changed?). 
- [ ] Make intentional design decisions -- colors, sizes, axes, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Add a label to each dot using the same method in which we appended them. **HINT:** you can either append one group that is positioned that includes both the circle and the label, or you can append all circles, then all labels.
- [ ] Play with your understanding of the SVG coordinate system by using `transform: translate(x, y)` to position your dots instead of `cx` and `cy`. Can you think of any benefits of this method?

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200Spring2023.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)


