
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    // select container
    const table = d3.select('#container')
      .append("table")

      // append table head by breaking chain
      table.append("thead")

      const tbody = table.append("tbody")

      // use d3 
      const row = tbody.selectAll("tr")
        .data(data)
        .join("tr")
        // assign 'squirrelActivities' class
        .attr("class", "squirrelActivities")
        // .attr("id", data => data.count)

        // break the chain
        row
        .append("td")
        .text(data => data.activity)

        row
        .append("td")
        .text(data => data.count)



    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

  })