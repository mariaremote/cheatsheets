/**
Checks that a credit card number (a string of numbers) is valid via
the Luhn Algorithm (https://en.wikipedia.org/wiki/Luhn_algorithm#Description)
using a slightly modified version.

The last digit is the checkDigit. The remaining digits are called the payload.
Remove the checkDigit and reverse the payload in order so that the 2nd last digit is now the first. 
Iterating over the reversed payload and doubling every 2nd digit. 
e.g. [3,4,3,5] becomes [3,8,3,10]
If any doubled number is greater than 10, subtract 9 from it. 
Sum all of those digits. e.g. [3,8,3,1] => 3 + 8 + 3 + 1 = 15
The checkDigit is added to the sum and the total modulo by 10. 
If there is no remainder, the credit card number is valid. 
**/

// Step 1: Get sum of credit card number
const summarizeCreditCard = creditCard => {
  // checkDigit is added to sum as it is
  // reverse the payload array so the 2nd last digit is now the first
  let payload = creditCard.slice(0, -1).toReversed()
  let sum = creditCard[creditCard.length - 1]
  // Iterating over the reversed payload and doubling every 2nd digit. 
  payload.forEach((value, index) => {
    if (index % 2 === 0) {
      let doubled = value * 2;
      if (doubled >= 9) {
        sum += doubled - 9;
      } else {
        sum += doubled;
      }
    }
    // odd indexes are simply added as is
    else {
      sum += value;
    }
  })
  return sum;
}

// Step 2: Check if sum of all numbers (including checkDigit is divisible by 10)
const validateCreditCard = creditCard => {
  if (summarizeCreditCard(creditCard) % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// The role of findInvalidCards() is to check through the nested array for which numbers are invalid
// and return another nested array of invalid cards.
const findInvalidCards = (listOfCreditCards) => {
  return listOfCreditCards.filter((creditCard) => validateCreditCard(creditCard) === false)
}

const companiesData = [ // list of objects
  {
    name: 'Amex',
    cardPrefix: 3
  },
  {
    name: 'Visa',
    cardPrefix: 4
  },
  {
    name: 'MasterCard',
    cardPrefix: 5
  },
  {
    name: 'Discover',
    cardPrefix: 6
  }
]

// based on first number will return name of card company of affected invalid credit card numbers
const idInvalidCardCompanies = (nestedArray) => {
  let invalidCards = findInvalidCards(nestedArray);
  let affectedCompanies = [];
  const amex = (element) => element[0] === 3;
  const visa = (element) => element[0] === 4;
  const mastercard = (element) => element[0] === 5;
  const discover = (element) => element[0] === 6;
  if (invalidCards.some(amex)) {
    affectedCompanies.push('Amex');
  }
  if (invalidCards.some(visa)) {
    affectedCompanies.push('Visa');
  }
  if (invalidCards.some(mastercard)) {
    affectedCompanies.push('MasterCard');
  }
  if (invalidCards.some(discover)) {
    affectedCompanies.push('Discover')
  }
  return affectedCompanies;
}

// takes a creditcard number typed as string and return array of integers
const convertStringToNumbers = (string) => {
  let output = [];
  for (let i = 0; i < string.length; i++){
    let digit = string.charAt(i);
    if (parseInt(digit)){
    output.push(parseInt(digit)); }  
  }
  return output;
}

// function that can creates valid creditcard numbers
// the remainder is distributed to the last digit (returns altered last digit)
const convertInvalidToValid = (array) => {
  let remainder = summarizeCreditCard(array) % 10;
  if (remainder > 5) {
    array[array.length - 1] += (10-remainder); 
  }
  else if (remainder <= 5){
    array[array.length - 1] -= remainder; 
  }
  return array;
}

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [4, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [6, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]; //invalid
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]; //invalid
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]; //invalid
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

// TESTS

console.log(`should return true:`)
console.log(validateCreditCard(valid1));
console.log(validateCreditCard(valid2));
console.log(validateCreditCard(valid3));
console.log(validateCreditCard(valid4));
console.log(validateCreditCard(valid5));
console.log(`should return false:`)
console.log(validateCreditCard(invalid1));
console.log(validateCreditCard(invalid2));
console.log(validateCreditCard(invalid3));
console.log(validateCreditCard(invalid4));
console.log(validateCreditCard(invalid5));

console.log(`mysteries`)
console.log(validateCreditCard(mystery1));
console.log(validateCreditCard(mystery2));
console.log(validateCreditCard(mystery3));
console.log(validateCreditCard(mystery4));
console.log(validateCreditCard(mystery5));

console.log(`should return true:`);
console.log(validateCreditCard(convertInvalidToValid(mystery1)));
console.log(validateCreditCard(convertInvalidToValid(mystery3)));
console.log(validateCreditCard(convertInvalidToValid(mystery4)));

console.log(`should return ['Visa','Amex','Discover']`)
console.log(idInvalidCardCompanies(batch));
// check if your card is valid or not: (letters are ignored)
let myCard = "34682786hh245685oooo"
console.log(`should return array of only numbers:`)
console.log(convertStringToNumbers(myCard));

console.log(`should return true if you entered your real credit number in variable myCard:`);
console.log(validateCreditCard(convertStringToNumbers(myCard)));