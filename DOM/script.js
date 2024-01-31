/*
The document keyword grants access to the root of the DOM in JavaScript.
The DOM Interface allows you to select a specific element with CSS selectors by using the .querySelector() method.
You can access an element directly by its ID with the .getElementById() method which returns a single element.
You can access an array of elements with the .getElementsByClassName() and .getElementsByTagName() methods,
then call a single element by referencing its placement in the array.
The .innerHTML and .style properties allow you to modify an element by changing its contents or style respectively.
The .children property returns a list of an element’s children and the .parentNode property returns the element’s closest connected node in the direction towards the root.
You can create, append, and remove elements by using the .createElement(),.appendChild() and .removeChild() methods respectively.
The .onclick property can add interactivity to a DOM element based on a click event.
*/


// SELECTORS //

// returns the first element that matches (for example class attribute)
document.querySelector('.class-attribute')
// returns element based on its id
document.getElementById('unique')
// returns array of all elements with class="container"
document.querySelectorAll('.container')

// Content & Text of HTML elements
document.getElementById('something').innerHTML 
document.getElementById('something').innerText
document.getElementById('something').textContent

// PARENTS & CHILDREN //

// returns entire HTML element that is the parent
const parentElement = document.getElementById('habitat').parentNode;
// returns array of HTML objects that are direct descendants
const childElements = document.getElementById('habitat').children;

// create new elements
const newttraction = document.createElement('li');
// add attributes to them
newAttraction.id = 'vespa';
newAttraction.innerHTML = 'Rent a Vespa';
// append them in the DOM
document.getElementById('italy-attractions').appendChild(newAttraction);

// removes specified child
const elementToRemove = document.getElementById('vespa');
document.getElementById('italy-attractions').removeChild(elementToRemove);

// sets visibility to hidden 
document.getElementById('sign').hidden = true;

// EVENTS //

// .onclick

// function declared inside
let element = document.querySelector('button');
element.onclick = function () {
    element.style.backgroundColor = 'blue'
};
// using global function
function turnButtonRed() {
    element.style.backgroundColor = 'red';
    element.style.color = 'white';
    element.innerHTML = 'Red Button';
}
element.onclick = turnButtonRed;



