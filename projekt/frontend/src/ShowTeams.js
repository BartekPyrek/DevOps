import React from 'react';
import axios from 'axios';
import {useState} from "react";
import './App.css';

const ShowTeams = (props) => {

    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState({});


    const handleShowResult = (event) => {
        axios.get('http://localhost:9090/team')
            .then(response => setTeams(response.data))
            .catch(error => console.log(error));

        event.preventDefault();
    };

    const handleShowTeam = (event) => {
        setTeamId(event.target.value);
        axios.get(`http://localhost:9090/team/${teamId}`
        )
            .then(response => response.data)
            .catch(error => console.log(error));

        event.preventDefault();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleShowTeam(event)
        }
    }

    return (
        <>
            <div className="Div-element">
                <form>
                    <button onClick={handleShowResult}>Pokaż dotychczasowe wyniki</button>
                    <button onClick={handleShowResult}><i className="fa fa-refresh"/></button>
                    <br/>
                    {teams
                        .sort((a, b) => a.team.localeCompare(b.team))
                        .map(footballTeam => (<div key={footballTeam.id}>Team: {footballTeam.team} | Predicted
                            points: {footballTeam.result} | ID: {footballTeam.id}</div>))
                    }
                </form>
            </div>

            <div className="Div-element">
                <form>
                    <input type='text' defaultValue={''} value={teamId}
                           onChange={event => setTeamId(event.target.value)} onKeyDown={handleKeyDown}/><br/>
                    {
                        teams
                            .map(team => team.id === teamId ? <div key={team.id}>{team.team} | {team.result}</div> :
                                <div key={teamId}/>)
                    }
                    <button>Wyszukaj zespół po ID</button>
                </form>
            </div>
        </>
    );
};

export default ShowTeams;