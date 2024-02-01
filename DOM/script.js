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

// returns element based on its id
document.getElementById('unique') // is faster than querySelector
// returns collections of all elements with that class (need to convert to array to use array methods on them)
document.getElementsByClassName("visible")

// querySelector uses CSS selectors syntax!
// returns the first element that matches (for example class attribute)
document.querySelector('.class-attribute') // gets the class
document.querySelector("#unique") // gets the id
// returns array of all elements with class="container" 
document.querySelectorAll('.container')

// closest moves upwards! (opposite to querySelector) apply to a child element
childOne.closest('.id-grandparent')
// gets the sibling element to the right (down)
childOne.nextElementSibling
// gets the sibling element to the left (up)
childTwo.previousElementSibling


// Content & Text of HTML elements
document.getElementById('something').innerHTML // dangerous, because renders <tags/> and attributes!
document.getElementById('something').innerText // text content that is visible, i.e. displays the text the way it would in the browser
document.getElementById('something').textContent // shows all raw text content

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
/*
What's difference between append and appendChild?
Element.append() allows you to also append string objects, 
whereas Node.appendChild() only accepts Node objects. 
Element.append() has no return value, 
whereas Node.appendChild() returns the appended Node object. 
Element.append() can append several nodes and strings, 
whereas Node.appendChild() can only append one node.
*/

// removes specified child
const elementToRemove = document.getElementById('vespa');
document.getElementById('italy-attractions').removeChild(elementToRemove);

// sets visibility to hidden 
document.getElementById('sign').hidden = true;

// EVENTS //

// eventListener (can add several events)

let eventTarget = document.getElementById('targetElement');
eventTarget.addEventListener('click', function () { // eventListener takes two arguments: event name as string and the eventHandler as function
    // eventHandler: this block of code will run when click event happens on eventTarget element
}); // best practice: do not use anonymous functions though


// .onEvent properties //

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

// .onkeypress
eventTarget.onkeypress = eventHandlerFunction; 
// same as:
eventTarget.addEventListener('keypress',eventHandlerFunction)

// Event Object Properties
// JavaScript stores events as Event objects with their related data and functionalities as properties and methods.
// When an event is triggered, the event object can be passed as an argument to the event handler function.

function eventHandlerFunction(event) {
    console.log(event.timeStamp); // number of milliseconds that passed since the document loaded and the event was triggered
    console.log(event.target); // reference to the element the event is registered too
    console.log(event.type); // name of the event
}
eventTarget.addEventListener('click', eventHandlerFunction);

// abstracted way to apply to any element (using the event.target property)
let sharePhoto = function (event) {
    event.target.style.display = 'none';
}
element.addEventListener('click', sharePhoto);

