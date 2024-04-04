import React from 'react';
import './App.css';
import { PokeController } from './components/pokeList/PokeController';
import bleachersImage from "./bleachers.jpg";

function App() {
  return (
  <div className="App" style={{backgroundImage: `url(${bleachersImage})`}}>
      <PokeController />
    </div>
  );
}

export default App;
