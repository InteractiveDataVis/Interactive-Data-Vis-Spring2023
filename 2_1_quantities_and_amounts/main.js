console.log(d3)

/* LOAD DATA */
d3.csv('roster.csv', d3.autoType)
  .then(roster => {
    console.log("roster", roster)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    // select container

    // append table

    // append table head

    // append table body

    // use d3 to populate table

    // select table rows, fill with roster data

    // assign 'student' class

    // assign id

    // assign text

    // break the chain!

    // add cell for first name to row

    // add cell for last name to row

    // inspect all arguments - data, index, nodes
  })