## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Noting the differences between having to map over a value to set a domain, 
and plotting numerical data for both axes. Honestly, it took me an hour to debug
compare commit `50b47c31b896864f897716a6a73365b86f12d323` to 
`429173933b75babb90efb12ddc01da5ab6e8c880`. Not coming as naturally as I wanted
it to.

So, after a bit of tweaks, I ended up with a graph looking if birth weight
correlated with the age of the mother:

![Age of the Mother vs. bwt](../screen_shots/age_of_mother_v_birth_weight.png)

At this point, is occuring to me that having the minimum domain of the x-axis
be zero is kind not helping. Also, I wanted to extend the y-axis a bit to
reference the max weight.

```javascript 
    const xScale = d3.scaleLinear()
      .domain([10, d3.max(data, d => d.age)])
      .range([margin, width - margin])

    const yScale = d3.scaleLinear()
      .domain([0, (d3.max(data, d => d.bwt) + 10)])
      .range([height - margin, margin])
```
It occurs to me at this point that this _might_ be more interesting if it was 
color coded by whether or not the mother was a smoker.

![Coding mother smoking with colors](../screen_shots/with_smothing_color_coding.png)

I also thought it might be nice to conditionally change the radius based on
the smoking variable.

One question that comes up is what the difference is between adding style with
the style method vs. attr.

Given that the dots are tightly cluster in this graph, in future, I'd add 
tooltip with additional metadata to help give better context, and potentially
inform other scatterplots that might reveal something about this dataset.

Blarg! I'm notices some dots are mapped way off on the left of the y-axis, but
I'm a little at a loss as to why. Doing this type of spacial reasoning and 
debug remains a challenge for me.

------------
