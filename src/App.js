import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
	const [ charIdsPerLocation, setCharIdsPerLocation ] = useState('');
    const [ charIdsPerDimension, setCharIdsPerDimension ] = useState('');
    const [ charDetailsByLocation, setCharDetailsByLocation ] = useState([]);
    const [ charDetailsByDimension, setCharDetailsByDimension ] = useState([]);
    const [ locationDetails, setLocationDetails ] = useState({});
    const [ dimensionDetails, setDimensionDetails ] = useState({});
	// Get location information
	useEffect(() => {
        axios({
            // Endpoint from https://rickandmortyapi.com/documentation/#get-all-locations
            url: 'https://rickandmortyapi.com/api/location/1',
            method: 'get',
        })
        .then(function (response) {
            // Once it's successful do below:

            // Set location name (Earth etc.)
            setLocationDetails({
                name: response.data.name,
                dimension: response.data.dimension,
            })
			// response.data.residents is an array with each "resident" being an endpoint.
			let ids = processCharacterIds(response.data.residents).join(',');
			// Once we finish the loop and set all the ids, store these values with "setCharIdsPerLocation"
			setCharIdsPerLocation(ids);
        });
    }, []);

	useEffect(
        () => {
            // If there are charIds we need to show, execute following:
            if(charIdsPerLocation) {
                // Get all the characters by their id
                axios({
                    url: `https://rickandmortyapi.com/api/character/${charIdsPerLocation}`,
                    method: 'get',
                })
                .then(function (response) {
                    // Store character details
                    setCharDetailsByLocation(response.data);
                });
            }
        },
        // Only update if charIds update
        [charIdsPerLocation]
    );

	const processCharacterIds = residents => {
	    let ids = [];
	    residents.forEach(resident => {
	        // Takes https://rickandmortyapi.com/api/character/30
	        // Returns ["", "30"];
	        // 30 is the ID, so take the first index
	        const residentId = resident.split('https://rickandmortyapi.com/api/character/')[1];
	        ids.push(residentId);
	    });
	    return ids;
	}

	const charactersToDisplay = !charDetailsByLocation.length ? [charDetailsByLocation] : charDetailsByLocation;

    return (
		<div className="App">
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
        </div>
    );
}


export default App
