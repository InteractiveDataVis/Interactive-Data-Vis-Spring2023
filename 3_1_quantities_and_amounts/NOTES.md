## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------
### Notes while working

- One question I have is where we should declare and draw the axes. 
I started off declaring them and drawing in the `draw()`, but that would mean
that they would be re-drawn everytime the function is called. That could be
helpful if interactivity changed the domains of the x or y scale, but maybe
not in this case? Is there a best practice?

- Again, drawing the axes has placed me in a state of confusion. I've tried
labeling the axis to reason about why they're goofy. In trying to fix the
spacing, I've confused the positioning of the rects again.

- OK, I tried to get too fancy when assiging the `y` attribute. I can't tell you
why, but I got that settled. Next, the rects and yAxis are positioned too far
to the left. Let's address that next.

- Elements are displaying enough to be legible. I'm struggling with reasoning
about why the xAxis and yAxis don't meet. I'm going to leave that for a review,
because most of the ideas I have for changing this seem to make the code more 
convoluted. I want to focus on the rest of the assignment at this point.

- I continue to struggle with when to use `.attr` and `.style` when working with
elements.

### Questions for appointment on Monday (3/27)

- Where should we declare and draw the axes? I declared and drew them in the
`draw()` function, but that would be re-drawing them everytime there's an update
. That could be helpful 

- I wanted to extend the yAxis beyond the maximum such that the next tick shows
up, to give a sense of the maximum value of votes counted for Andrew Jackson.
See how I hacked together the domain for the xScale. Is there a programmatic/
better way to handle this?

- Why do the xAxis and yAxis not meet? Most of the ideas I have for changing 
this seem to make the code more convoluted. I wanted to focus on the rest of the
 assignment, because I feel like I have a hand on that.