import axios from 'axios';

const getCharacters = async (url = 'https://rickandmortyapi.com/api/character') => {
    const response = await axios.get(url);
    return response.data;
};

const getCharacterById = async (id = 1) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
};

export { getCharacters, getCharacterById };