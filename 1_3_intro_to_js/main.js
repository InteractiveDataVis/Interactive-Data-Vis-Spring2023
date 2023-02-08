console.log('hello world');

// console.log(document)
// console.log(window)

const input = document.getElementById("name-input")
// console.log(input)
// console.log(document.getElementById("name-input"))
const updateName = () => {
    // console.log('in update function')
    const userName = input.value;
    window.alert(`Hello, welcome to class ${userName}`)
}

// updateName();

let changeable = true;
const constant = true;
let counter = 0;


function change() {
    changeable = false;
    const constant = false;
    // console.log(changeable, constant)
    counter = counter + 1
}

// change(); 
// change();
// change()
// change()
// console.log('counter', counter)
// console.log(changeable, constant)

const array = ["apple", "orange", "banana", "mango", "toast"]

const newArray = array.map((c) => {
    // console.log('c', c)

    return `my favorite food is ${c}`
})

// console.log(newArray)

const filteredArray = array.filter((d, i) => {
    // const onlyToast = d === "toast"
    // const onlyFruit = d !== "toast"
    // const applesOrOranges = d === "apple" || d === "orange"
    const laterFoods = i > 0;
    return laterFoods
})

// console.log(filteredArray)
// console.log(filteredArray.length)


// array.forEach(d => console.log('d', d))
// const implicitReturnArray = array.map(d => `my least favorite food is ${d}`)

// console.log(implicitReturnArray)

const dataVizClass = {
    day: 'Tuesday',
    time: 'late',
    students: 15,
}

const dayAccessor = 'day'

// const day = dataVizClass[dayAccessor]
// dataVizClass['day']
// dataVizClass.day

// console.log('day', day)

// const keys = Object.keys(dataVizClass)
// console.log(keys)

// const values = Object.values(dataVizClass)
// console.log(values)

// const entries = Object.entries(dataVizClass)
// console.log(entries)

const apple = 'mango'
// if (apple === 'apple'){
//     console.log("I'm an apple!")

// }else {
//     console.log("I'm not an apple!")

// }

const yesApple = apple === "apple" ? "I'm an apple!" : "I'm not an apple!"
console.log(yesApple)

// const now = new Date()
// console.log(now)