// task1
console.log("Task 1");
class Transport{
    constructor(type){
        this.type = type;
    }

    ride() {
        console.log(`${this.type} is riding.`);
    }

    stop() {
        console.log(`${this.type} has stopped.`);
    }
}

class Car extends Transport{
    constructor(){
        super("Car");
    }
}

class Bike extends Transport{
    constructor(){
        super("Bike");
    }
}

class TransportFactory{
    static createTransport(type){
        switch(type){
            case "Car": return new Car();
            case "Bike": return new Bike();
            default: throw new Error('Unknown transport type.');
        }
    }
}

const bike = TransportFactory.createTransport("Bike");
bike.ride();
const car = TransportFactory.createTransport("Car");
car.ride();
//const transport = TransportFactory.createTransport("transport");

// task2
console.log("Task 2");
const url = 'https://rickandmortyapi.com/api/character';
const characterContainer = document.getElementById("characterContainer");
const prevBtn = document.getElementById("prevBtn");
const pageSpan = document.getElementById("page");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");

let currentPage = 1, totalPages;

function loadCharacters(page = 1){
    characterContainer.innerHTML = '';
    message.innerText = 'Loading...';
    fetch(`${url}?page=${page}`).then(data =>{
        return data.json();
    }).then(data => {
        console.log(data);
        totalPages = data.info.pages;

        pageSpan.textContent = data.info.next === null ? totalPages : parseInt(new URL(data.info.next).searchParams.get('page')) - 1;
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        const characterList = data.results.map(item => {
            return {
                'name': item.name,
                'status': item.status,
                'img': item.image
            };
        });
        
        display(characterList);
        message.innerText = '';
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        console.log("Finally");
    });
}

function display(characterList){
    characterList.forEach(item => {
        const character = document.createElement('div');
        character.classList.add('characterItem');
        character.innerHTML = `
        <img src="${item.img}" alt="${character.name}" width="50"/>
        <div>
            <h3>Name: ${item.name}</h3>
            <h3>Status: ${item.status}</h3>
        </div>`;
        characterContainer.appendChild(character);
    });
}

prevBtn.addEventListener("click", () => {
    if(currentPage > 0) {
        currentPage--;
        loadCharacters(currentPage);
    }
});
nextBtn.addEventListener("click", () => {
    if(currentPage < totalPages) {
        currentPage++;
        loadCharacters(currentPage);
    }
});

loadCharacters();