console.log('hello world');

// We have access to the document and the window
console.log(document);
console.log(window);

const input = document.getElementById("name-input");

console.log(input);

// const updateName = () => {
//     console.log('in update function')
//     const userName = input.value;
//     window.alert(`Hello, welcome to class ${userName}`);
// }

// updateName();

let changeable = true;
const constant = true;

function change() {
    let changeable = false;
    const constant = false;
    console.log(changeable, constant);
}

console.log(changeable, constant);
change();

const array =['apple', 'orange', 'banana', 'mango', 'toast'];

const newArray = array.map((d) => {
    console.log('d', d)
    return `my favorite food is ${d}.`
})

// console.log(newArray);


// const filteredArray = array.filter((d, i) => {
//     const onlyToast = d === 'toast'
    // const onlyFruit = d !== 'toast'
    // return onlyToast;
     // return onlyFruit;
//     const applesOrOranges = d === 'apple' || d === 'orange' 
//     return applesOrOranges;
    // const laterFoods = i > 0;
    // return laterFoods;
// })

// console.log(filteredArray)
// console.log(filteredArray.length)

// array.forEach(d => console.log('d', d))



// const implicitReturnArray = array.map(d => console.log((`my favorite food is ${d}.`)))

const dataVisClass = {
    day: 'Tuesday',
    time: 'late',
    students: 15
}

const dayAccessor = 'day'
const day = dataVisClass[dayAccessor]
console.log('day', day)

const keys = Object.keys(dataVisClass)
console.log(keys)

const values = Object.values(dataVisClass)
console.log(values)

const entries = Object.entries(dataVisClass)
console.log(entries)

const apple = 'mango'
if(apple === 'apple') {
    console.log("I'm an apple.")
} else {
    console.log("I'm not an apple.")
}

const yesApple = apple === "apple" ? "I'm an apple!" : "I'm not an apple"

console.log(yesApple)