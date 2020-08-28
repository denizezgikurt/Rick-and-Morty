import React from 'react';
import './App.css';
import CharactersByLocation from './CharactersByLocation';
import CharactersByDimensions from './CharactersByDimensions';

function App() {
    return (
        <div className="App">
            <CharactersByLocation />
            <CharactersByDimensions />
        </div>
    );
}

export default App;
