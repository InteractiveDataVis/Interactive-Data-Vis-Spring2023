document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('navbar')
  
    fetch('navbar.html')
      .then(response => response.text())
      .then(html => {
        navContainer.innerHTML = html
      })
    .catch(err => {
      console.warn('Navbar not loaded:', err)
    })
  })

document.getElementById("disappear-button").addEventListener("click", function() {
  // Get all elements in the body
  var elements = document.body.getElementsByTagName("*");

  // Add the fade class to each element with increasing delay
  for (var i = 0; i < elements.length; i++) {
    // Calculate delay (in seconds)
    var delay = i * 0.15; // Adjust this value to speed up/slow down the effect

    // Apply the fade class and set the transition-delay CSS property
    elements[i].style.transitionDelay = `${delay}s`;
    elements[i].classList.add("fade");
  }
})