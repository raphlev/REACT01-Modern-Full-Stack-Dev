type PersonType = {
firstName: string, lastName: string, age: number
};
let person0 = {
firstName : "John", lastName : "Sheridan", age : 52
};
let person1: PersonType = {
firstName : "John", lastName : "Sheridan", age : 52
};
const { firstName, lastName, age } = person1;
console.log(firstName);
console.log(lastName);
console.log(age);

const vals = [ "Billy", "Joel", 70 ];
const [ first, last, isAge] = vals;
console.log(first);
console.log(last);
console.log(isAge);
