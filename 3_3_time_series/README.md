# Section 3 | Tutorial 3 | Time Series

The goals for this tutorial are:

- reinforce the boilerplate logic, with some slight updates, to further understand the data lifecycle (both for javascript and d3.js enter, update, and exit).
- reinforce [d3 line](https://github.com/d3/d3-shape#lines) generators, and solidify how a function generator works differently than the appending and manipulating elements we've done so far.
- practice [transitions](https://github.com/d3/d3-transition) on elements we know already, but also introduce new types of transitions on scales.

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own line chart _with a different dataset_ than the one used in our demo. It can be the same dataset that you leveraged in the time series tutorial of section 2.

- [ ] Add dots (`<circle>`) at each data point on your line. These dots should have an enter and update transition, similar to how we implemented transitions in the previous tutorial ([section 3 tutorial 2](../3_2_distributions/README.md)).

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Add hover activity to your path line or circles. Try doing this only with javascript `.on("mouseover", ...)`, before resorting to the css method, `:hover`. Consider adding text annotations on hover, a moving tooltip/info box, or maybe to highlight key events.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200fall2021.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2021/[TUTORIAL_PATH]/`)


