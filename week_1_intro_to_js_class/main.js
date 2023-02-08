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