import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const processCharacterIds = residents => {
    let ids = [];
    residents.forEach(resident => {
        const residentId = resident.split('https://rickandmortyapi.com/api/character/')[1];
        ids.push(residentId);
    });
    return ids;
}

function CharactersByDimensions() {
    const [ charIdsPerDimension, setCharIdsPerDimension ] = useState('');
    const [ charDetailsByDimension, setCharDetailsByDimension ] = useState([]);
    const [ dimensionDetails, setDimensionDetails ] = useState({});
    useEffect(
        () => {
            if(charIdsPerDimension) {
                axios({
                    url: `https://rickandmortyapi.com/api/character/${charIdsPerDimension}`,
                    method: 'get',
                })
                .then(function (response) {
                    setCharDetailsByDimension(response.data);
                });
            }
        },
        [charIdsPerDimension]
    );

    useEffect(() => {
        axios({
            url: 'https://rickandmortyapi.com/api/location/?dimension=Dimension C-137',
            method: 'get',
        })
        .then(function (response) {
            let ids = [];
            response.data.results.forEach(location => {
                let idsPerLocation = processCharacterIds(location.residents);
                ids = ids.concat(idsPerLocation);
            });
            setDimensionDetails({
                name: 'Dimension C-137',
            });
            setCharIdsPerDimension(ids);
        });
    }, []);

    const charactersToDisplayPerDimension = !charDetailsByDimension.length ? [charDetailsByDimension] : charDetailsByDimension;

    return (
        <div className="section">
            <h1 className="heading">Dimension: {dimensionDetails.name}</h1>
            <div className="charWrapper">
                {charactersToDisplayPerDimension && charactersToDisplayPerDimension.map((charData, index) => {
                    return (
                        <div key={index + 'wrapper'}>
                            <img src={charData.image} alt={charData.name + 'image'} />
                            <h2><strong>Name:</strong> {charData.name}</h2>
                            <h4><strong>Species:</strong> {charData.species}</h4>
                            <h4><strong>Gender:</strong> {charData.gender}</h4>
                            <h4><strong>Last location:</strong> {charData.location && charData.location.name}</h4>
                            <h4><strong>Dimension:</strong> Dimension C-137</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CharactersByDimensions;
