console.log('hello world');

let numClicks = 0;

const incrementClicks = () => {
    numClicks += 1;
    document.getElementById('click-count').innerHTML = numClicks;
}