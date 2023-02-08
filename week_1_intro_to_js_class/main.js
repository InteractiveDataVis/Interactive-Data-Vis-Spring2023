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

console.log(newArray);


const filteredArray = array.filter((d, i) => {
    const onlyToast = d === 'toast'
    const onlyFruit = d !== 'toast'
    // return onlyToast;
     // return onlyFruit;
//     const applesOrOranges = d === 'apple' || d === 'orange' 
//    return applesOrOranges;
    const laterFoods = i > 0;
    return laterFoods;
})

console.log(filteredArray)
console.log(filteredArray.length)

// const implicitReturnArray = array.map(d => console.log((`my favorite food is ${d}.`)))