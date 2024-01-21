/*
Write a function groceries() that takes an array of object literals of grocery items. 
The function should return a string with each item separated by a comma 
except the last two items should be separated by the word 'and'. 
Make sure spaces (' ') are inserted where they are appropriate.

*/

const groceries = arrayOfObjects => {
    let newArray = arrayOfObjects.map(
        (element, index, array) => {
            let newString = Object.values(element).toString();
            if (index < array.length -2){
                newString += ',';
            } return newString;
        } 
    );
    if (!arrayOfObjects || arrayOfObjects.length === 0) {
        return "";}
    else if (arrayOfObjects.length > 1){
    newArray.splice(newArray.length-1,0,'and');}
    return newArray.join(' ');
}

console.log(groceries( [{item: 'Carrots'}, {item: 'Hummus'}, {item: 'Pesto'}, {item: 'Rigatoni'}] ));
// returns 'Carrots, Hummus, Pesto and Rigatoni'

console.log(groceries( [{item: 'Bread'}, {item: 'Butter'}] ));
// returns 'Bread and Butter'

console.log(groceries( [{item: 'Cheese Balls'}] ));
// returns 'Cheese Balls'

console.log(groceries([{}]));
// returns empty string