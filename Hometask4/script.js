const url = 'https://rickandmortyapi.com/api/character';
const characterContainer = document.getElementById("characterContainer");
const message = document.getElementById("message");
let info = {};

const modal = document.getElementById('modal');
const modalImg = document.querySelector('.modalContent img');
const modalName = document.querySelector('.modalContent h3:first-child');
const modalStatus = document.querySelector('.modalContent h3:first-child + h3');
const modalCloseButton = document.querySelector('.modalContent span:first-child');

function loadCharacters(url){
    message.innerText = 'Loading...';
    fetch(url).then(data =>{
        return data.json();
    }).then(data => {
        console.log(data);
        info = data.info;
        const characterList = data.results.map(item => {
            return {
                'id': item.id,
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
        character.setAttribute('data-id', item.id);
        character.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="50"/>
        <div>
            <h3>Name: ${item.name}</h3>
            <h3>Status: ${item.status}</h3>
        </div>`;
        characterContainer.appendChild(character);
    });
}

characterContainer.addEventListener('click', (event) => {
    const characterItem = event.target.closest('.characterItem');
    if (characterItem) {
        event.stopPropagation();
        const characterId = characterItem.getAttribute('data-id');
        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(data => data.json())
        .then(character => {
            modalImg.src = character.image;
            modalImg.alt = character.name;
            modalName.innerText = character.name;
            modalStatus.innerText = character.status;
            modal.style.display = 'block';
        })
        .catch(error => console.error(error));
    }
});

function closeModal(event) {
    if (event.target === modal || event.target === modalCloseButton) {
        event.stopPropagation();
        modal.style.display = 'none';
    }
}

window.addEventListener('click', closeModal);

window.addEventListener('scroll', event => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadCharacters(info["next"]);
    }
});

loadCharacters(url);