/* Challenge Project: Mysterious Organism

Project Goals
Context: You’re part of a research team that has found a new mysterious bacteria 
at the bottom of the ocean near hydrothermal vents. Your team names the bacteria, 
Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases. 
The small DNA samples and frequency at which it mutates due to the hydrothermal vents 
make P. aequor an interesting specimen to study. However, P. aequor cannot survive 
above sea level and locating P. aequor in the deep sea is difficult and expensive. 
Your job is to create objects that simulate the DNA of P. aequor for your research team to study.

DNA is comprised of four bases (Adenine, Thymine, Cytosine, and Guanine). 
When returnRandBase() is called, it will randomly select a base and return the base ('A','T','C', or 'G').
mockUpStrand() is used to generate an array containing 15 bases to represent a single DNA strand with 15 bases.

TASK 1)
Since you need to create multiple objects, create a factory function pAequorFactory() that has two parameters:
The first parameter is a number (no two bacteria should have the same number).
The second parameter is an array of 15 DNA bases.
pAequorFactory() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.

TASK 2)
Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).
To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate().
.mutate() is responsible for randomly selecting a base in the object’s dna property 
and changing the current base to a different base. Then .mutate() will return the object’s dna.
For example, if the randomly selected base is the 1st base and it is 'A', 
the base must be changed to 'T', 'C', or 'G'. But it cannot be 'A' again.

TASK 3)
Your research team wants to be able to compare the DNA sequences of different P. aequor. 
You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.
.compareDNA() has one parameter, another pAequor object.
The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in 
pAequor‘s .dna and compute how many bases are identical and in the same locations. 
.compareDNA() does not return anything, but prints a message that states the percentage 
of DNA the two objects have in common — 
use the .specimenNum to identify which pAequor objects are being compared.

TASK 4)
P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
In the returned object of pAequorFactory(), add another method .willLikelySurvive().
.willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. 
Otherwise, .willLikelySurvive() returns false.

TASK 5)
With the factory function set up, your team requests that you create 30 instances of pAequor 
that can survive in their natural environment. Store these instances in an array for your team to study later.

TASK 6)
Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand. 
The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa.

TASK 7)
Use the .compareDNA() to find the two most related instances of pAequor.
*/

// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

// TASK 1: factory function to create bacteria DNA
function pAequorFactory(specimenNum, dnaStrand) {
    return {
        specimenNum,
        dna: dnaStrand,
        // TASK 2: method to simulate mutation
        mutate() {
            // gets random index from DNA
            const randomIndex = Math.floor(Math.random() * 15);
            console.log(`randomIndex: `, randomIndex);
            // which base is it
            const targetBase = this.dna[randomIndex];
            console.log(`targetBase: `, targetBase);
            // gets random base for mutation
            let mutation;
            do {
                mutation = returnRandBase();
                console.log(`mutation: `, mutation);
            } while (targetBase === mutation);
            // only when mutation is different it is applied
            this.dna[randomIndex] = mutation;
            return this.dna;
        },
        // TASK 3: compare two bacteria's DNA
        compareDNA(otherBacteria) {
            // iterate over each base of this.dna
            // compare with iteration of base of otherBacteria.dna
            let count = 0;
            // if equal count up 1
            // return count divided by 15 (length of dna) as percentage
            this.dna.forEach((base, index) => {
                if (base === otherBacteria.dna[index]) {
                    count++;
                }
            });
            const percentageOverlap = ((count / this.dna.length) * 100).toFixed(2);
            console.log(`specimen #${this.specimenNum} and specimen #${otherBacteria.specimenNum
                } have ${percentageOverlap}% DNA in common.`);
            return percentageOverlap;
        },
        // TASK 4: if C and G accounts for 60% of the DNA will return true
        willLikelySurvive() {
            // counts all C and G bases and returns true if both sum up to 60%
            let countC = 0;
            let countG = 0;
            this.dna.forEach((base) => {
                if (base === "C") {
                    countC++;
                } else if (base === "G") {
                    countG++;
                }
            });
            // console.log(`C: ${countC}, G: ${countG}`);
            let percentageC = (countC / this.dna.length) * 100;
            let percentageG = (countG / this.dna.length) * 100;
            // console.log(`%C: ${percentageC}, %G: ${percentageG}`)
            return percentageC + percentageG >= 60;
            },
            // TASK 6: method that creates complementary DNA strands
            complementStrand() {
                return this.dna.map(
                    (base) => {
                        switch (base) {
                            case "A": return "T"
                            case "T": return "A"
                        case "G": return "C"
                        case "C": return "G"
                        default: throw new Error('Invalid base found: ' + base);
                    }
                }
                )}
                
            };
        }
            
            // TASK 5: creating 30 instances of bacteria DNA
            let pAequorDatabase = [];
            for (let i = 1; i <= 30; i++) {
    pAequorDatabase.push(pAequorFactory(i, mockUpStrand));
}

// STILL OPEN!
// TASK 7: finding highest matching pair from DNA Database
/**
this is the hardest problem

The algorithm should be:

let bestA, bestB, bestPercentage. for each dna in the database:
for each dna2 in the database again (nested loop):
if dna === dna2, continue
percentage = calcPercentage(dna, dna2)
if (percentage > bestPercentage) {
bestA = dna;
bestB = dna2;
bestPercentage = percentage;
}

 */
// let matches =
//     pAequorDatabase.map((dnaStrand, index1) => {
//         dnaStrand.compareDNA(pAequorDatabase
//             .filter((dnaStrand, index2) => {
//                 index2 !== index1
//             }
//             ))
//     }
//     );

// SOME TESTS

console.log(pAequorDatabase);
let test = pAequorFactory(1, mockUpStrand());
let test2 = pAequorFactory(2, mockUpStrand());
let test5 = pAequorFactory(5, mockUpStrand());
console.log(test.dna);
console.log(test.complementStrand());
console.log(test.compareDNA(test5));
console.log(test.willLikelySurvive());

