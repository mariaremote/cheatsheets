// use the Luhn Algorithm to check if a credit card number is valid
// https://en.wikipedia.org/wiki/Luhn_algorithm#Description

// take every 2nd number from the array (from right to left) and double it
// last number remains untouched
// if the value is greater than 9, subtract 9
// take the sum of all these numbers and modulo by 10
// if there is a remainder the result is false (ie. card number is not valid)

// 1st approach.. got too complicated..
const validateCred1 = (array) => {
  // last value gets added to the sum as it is
  let sum = array[array.length-1];
  // iterating backwards starting from the 2nd last position
  for (let i = array.length-2; i >= 0; i--) {
console.log(`index ${i}: ${array[i]}`);
    // only for even indexes the math is applied
    if (i % 2 === 0) {
      let doubled = array[i] * 2;
      if (doubled >= 9) {
        sum += doubled - 9;
      } else {
        sum += doubled;
      }
    } 
    // odd indexes are simply added as is
    else {
      sum += array[i];
    } 
console.log(`new sum ${sum}`)
  }
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

// 2nd approach.. (after hint from Codecademy)
const validateCred = array => {
  // copy the array, remove last digit and add it to the sum
  // reverse copied array so the 2nd last digit is now the first
  // implement math logic for all even indexes starting from 0 
  // doubled values are added to sum
  // non-math numbers are added to sum
}

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
    valid1,
    valid2,
    valid3,
    valid4,
    valid5,
    invalid1,
    invalid2,
    invalid3,
    invalid4,
    invalid5,
    mystery1,
    mystery2,
    mystery3,
    mystery4,
    mystery5,
];

console.log(validateCred(valid3));
console.log(`invalid3`)
console.log(validateCred(invalid3));
