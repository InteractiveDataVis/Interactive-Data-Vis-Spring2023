console.log(d3)

/* LOAD DATA */
d3.csv('roster.csv', d3.autoType)
  .then(classRoster => {
    console.log("roster", classRoster)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    // select container
    // append table
    const table = d3.select("#container")
      .append("table")
      
     // append table head
    table.append("thead")
        // append table body

    const tbody = table.append("tbody")
      // .append("tr")
      // .attr('class', 'row')


    // use d3 to populate table
    const row = tbody.selectAll("tr")
      .data(classRoster)
      .join("tr")
      // assign 'student' class
      .attr("class", "student") 
      // assign id
      .attr("id", data => data.Last)


    // assign text

    // break the chain!
    // add cell for first name to row
    row.append("td")
      .text(data => data.First)

    // add cell for last name to row
    row
      .append("td")
      .text(data => data.Last)
      
    // add cell for last name to row
    row
      .append("td")
      .text(data => data.Num)

  })

