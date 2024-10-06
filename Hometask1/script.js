// task1
console.log("Task 1");
console.log("Print numbers from 1 to 10 using a for loop:");
let i;
for(i = 1; i <= 10; i++){
    console.log(i);
}
console.log("Print numbers from 1 to 10 using a while loop:");
i = 1;
while(i <= 10){
    console.log(i++);
}

// task2
console.log("Task 2");
let arr = [1, 'hi', true, 3.14, null, undefined, "hello", 2024, false, "world"];
console.log("Iterating through the array using forEach:");
arr.forEach(item => console.log(typeof item));
console.log("Iterating through the array using a for loop:");
for(i = 0; i < arr.length; i++){
    console.log(typeof arr[i]);
}
console.log("Iterating through the array using a while loop:");
i = 0;
while(i < arr.length){
    console.log(typeof arr[i]);
    i++;
}
console.log("Iterating through the array using a do while loop:");
i = 0;
do {
    console.log(typeof arr[i]);
    i++;
} while (i < arr.length);

// task3
console.log("Task 3");
let people = [
    {
        name: "Tom",
        age: 25,
        pets: ["cat", "dog"]
    },
    {
        name: "Ann",
        age: 18,
        pets: ["fish"]
    },
    {
        name: "Nick",
        age: 19,
        pets: ["dog", "parrot"]
    },
    {
        name: "Eve",
        age: 31,
        pets: ["hamster"]
    }
];
console.log("People: ");
console.log(people);
const peopleOlderThan20 = people.filter(person => person.age > 20);
console.log("People older than 20: ");
console.log(peopleOlderThan20);

// task4
console.log("Task 4");
const peopleWithNewPet = people.map(person => {
    return {
        ...person,
        pets: [...person.pets, "rabbit"]
    }
});
console.log("People with new pet: ");
console.log(peopleWithNewPet);

// task5
console.log("Task 5");
let array = new Array(10).fill(42);
console.log("Initial array: ", array);
array.splice(4, 0, "answer");
console.log("Array after insertion: ", array);
const foundWord = array.find(item => item === "answer");
console.log("Found word: ", foundWord);

// task6
console.log("Task 6");
let book = {
    title: "Some title",
    description: "Some description",
    year: 2024,
    country: "Ukraine",
    rating: 4.5
};
console.log("Object: ", book);
console.log("Object keys: ", Object.keys(book));
console.log("Object values: ", Object.values(book));
console.log("Checking if object has a year property: ", Object.hasOwn(book, 'year'));
console.log("Checking if object has an author property: ", Object.hasOwn(book, 'author'));