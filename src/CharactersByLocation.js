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

function App() {
    const [ charIdsPerLocation, setCharIdsPerLocation ] = useState('');
    const [ charDetailsByLocation, setCharDetailsByLocation ] = useState([]);
    const [ locationDetails, setLocationDetails ] = useState({});
    useEffect(() => {
        axios({
            url: 'https://rickandmortyapi.com/api/location/1',
            method: 'get',
        })
        .then(function (response) {
            setLocationDetails({
                name: response.data.name,
                dimension: response.data.dimension,
            })
            let ids = processCharacterIds(response.data.residents).join(',');
            setCharIdsPerLocation(ids);
        });
    }, []);

    useEffect(
        () => {
            if(charIdsPerLocation) {
                axios({
                    url: `https://rickandmortyapi.com/api/character/${charIdsPerLocation}`,
                    method: 'get',
                })
                .then(function (response) {
                    setCharDetailsByLocation(response.data);
                });
            }
        }, 
        [charIdsPerLocation]
    );
    const charactersToDisplay = !charDetailsByLocation.length ? [charDetailsByLocation] : charDetailsByLocation;
    
    return (
        <div className="section">
            <h1 className="heading">Location: {locationDetails.name}</h1>
            <div className="charWrapper">
                {charactersToDisplay && charactersToDisplay.map((charData, index) => {
                    return (
                        <div key={index + 'wrapper'}>
                            <img src={charData.image} alt={charData.name + 'image'} />
                            <h2><strong>Name:</strong> {charData.name}</h2>
                            <h4><strong>Species:</strong> {charData.species}</h4>
                            <h4><strong>Gender:</strong> {charData.gender}</h4>
                            <h4><strong>Last location:</strong> {charData.location && charData.location.name}</h4>
                            <h4><strong>Dimension:</strong> {locationDetails.dimension}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
