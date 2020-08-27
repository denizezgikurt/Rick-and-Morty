import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
    const [ info, setInfo ] = useState();
    const [ characters, setCharacters ] = useState();
    useEffect(() => {
        getCharacters();
    }, []);
    const getCharacters = () => {
        axios({
            url: 'https://rickandmortyapi.com/api/character',
            method: 'get',
        })
        .then(function (response) {
            const data = response.data;
            setInfo(data.info);
            setCharacters(data.results);
        });
    }
    console.log('info', info);
    console.log('characters', characters);
    return (
        <div className="App">
            {
                characters && characters.map((character, index) => {
                    return <div key={index}>{character.name}</div>
                })
            }
        </div>
    );
}
export default App;
