import React, { useState, useEffect } from 'react';

function App() {
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

    const buttonClick = (direction) => setUrl(direction);

    return (
        <>
            {loading && <div id="message">Loading...</div>}
            <div id="characterContainer">
                {characters.map(item => (
                    <div className='characterItem' key={item.id}>
                        <img src={item.image} alt={item.name} width="50" />
                        <div>
                            <h3>Name: {item.name}</h3>
                            <h3>Status: {item.status}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button data-page="prev" disabled={!info.prev} onClick={() => buttonClick(info.prev)}>Previous</button>
                <span data-page="number">Page {info.next ? new URL(info.next).searchParams.get('page') - 1 : info.pages}</span>
                <button data-page="next" disabled={!info.next} onClick={() => buttonClick(info.next)}>Next</button>
            </div>
        </>
    );
}

export default App;