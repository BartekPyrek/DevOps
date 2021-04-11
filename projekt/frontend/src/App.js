import React from 'react';
import axios from 'axios';
import { useState } from "react";
import './App.css';

function App() {

  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamId, setId] = useState("");

  const handleShowResult = (event) => {

    axios.get('http://localhost:9090/teams')
      .then(response => setTeams(response.data))
      .catch(error => console.log(error));

    event.preventDefault();
  };

  const handleSubmitTeam = (event) => {
    axios.post('http://localhost:9090/addTeam', {
      team: teamName
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    event.preventDefault();
  };

  const handleShowTeam = (event) => {
    
  event.preventDefault();
  };

  return (
    <>
      <div style={{ padding: '25px' }}>
        <input type='text' value={teamName} onChange={event => setTeamName(event.target.value)} /><br />

        <input type='submit' value='Dodaj zespół' onClick={handleSubmitTeam} />
      </div>

      <div style={{ padding: '25px' }}>
        Tu będzie sprawdzanie po ID
      </div>
      <div style={{ padding: '25px' }}>
        <form>
          <button onClick={handleShowResult}>Pokaż dotychczasowe wyniki</button><br />
          {teams
            .sort((a, b) => a.team.localeCompare(b.team))
            .map(footballTeam => (<div key={footballTeam.id} onClick={handleShowResult}>Team: {footballTeam.team} | Predicted points: {footballTeam.result} | ID: {footballTeam.id}</div>))
          }
        </form>
      </div>
    </>
  );
}

export default App;
