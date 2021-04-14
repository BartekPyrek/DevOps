import React from 'react';
import axios from 'axios';
import {useState} from "react";
import './App.css';

const AddTeam = (props) => {

    const [teamName, setTeamName] = useState("");

    const handleSubmitTeam = (event) => {
        axios.post('http://localhost:9090/addTeam', {
            team: teamName
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));

        event.preventDefault();
    };


    return (
        <>
            <div className="Div-element">
                <input type='text' value={teamName} onChange={event => setTeamName(event.target.value)}/><br/>
                <input type='submit' value='Dodaj zespół' onClick={handleSubmitTeam}/>
            </div>
        </>
    );
};

export default AddTeam;