# Tutorial 3

The goals for this tutorial are:

- to introduce the data join lifecycle through [enter, update, and exit selections](https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_join).
- to reinforce the boilerplate logic, with some slight updates, to further understand the data lifecycle (both for javascript and d3.js enter, update, and exit).
- to learn basic [d3-transitions](https://github.com/d3/d3-transition), and leverage them to enhance understanding of the data.
- to learn to work with HTML UI elements, like [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) or [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), and basic [event listeners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events).

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Spring2023/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own scatter plot with a *different dataset* than the one used in our demo. This means your dropdowns will have different values, which correspond to your data.

- [ ] Implement a different transition than the one used in the demo (i.e., your dots should not move from left to center to right on transitions). Consider other visible properties that could change as an object is entering, exiting, etc. and what that change suggests about the state of that data point.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Add another UI element to your page. Some ideas include another dropdown for another value, radio buttons, checkbox, an input field with a threshold value, swapping out metrics, etc.
This means would entail:
   - (1) updating `state` just as the dropdown does, so that you can keep track of your new application state (though you will probably be updating a *new* state property).
   - (2) calling `draw()` on `change` to update your visualization with the new application state, and
   - (3) altering the data visualization appropriately.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200Spring2023.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Spring2023/[TUTORIAL_PATH]/`)



