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
  // get all elements in the body
  let elements = document.body.getElementsByTagName("*");

  // fade class to each element with increasing delay
  for (let i = 0; i < elements.length; i++) {
    let delay = i * 0.05 // speed up/slow down the effect

    // fade class and set the transition-delay CSS property
    elements[i].style.transitionDelay = `${delay}s`
    elements[i].classList.add("fade")
  }
})