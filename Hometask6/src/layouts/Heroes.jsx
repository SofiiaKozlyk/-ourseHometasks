import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Toolbar } from '@mui/material';
import CharactersList from '../components/CharactersList';
import DirectionButton from '../components/DirectionButton';

function Heroes() {
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');
    const [info, setInfo] = useState({});
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url).then(data => {
            return data.json();
        }).then(data => {
            setInfo(data.info);
            setCharacters(data.results);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);

    const buttonClick = (direction) => setUrl(info[direction]);


    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <CharactersList characters={characters} />
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
            <DirectionButton onClick={buttonClick} direction="prev" />
                <Typography variant="h6" noWrap sx={{ mx: 2 }}>
                    Page {info.next ? new URL(info.next).searchParams.get('page') - 1 : info.pages}
                </Typography>
            <DirectionButton onClick={buttonClick} direction="next" />
            </Toolbar>
        </>
    );
}

export default Heroes;