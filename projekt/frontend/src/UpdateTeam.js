import React from 'react';
import axios from 'axios';
import {useState} from "react";
import './App.css';

const UpdateTeam = (props) => {

    const [teamId, setTeamId] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamResult, setTeamResult] = useState("");

    const handleUpdate = (event) => {
        setTeamId(event.target.value);
        axios.put(`http://localhost:9090/team/${teamId}`, {
            team: teamName,
            result: teamResult
        })
            .then(response => response.data)
            .catch(error => console.log(error))

        event.preventDefault();
    };

    return (
        <>
            <div className='Div-element'>
                <form>
                    <input type='text' value={teamId} onChange={event => setTeamId(event.target.value)}/><br/>
                    <input type='text' value={teamName} onChange={event => setTeamName(event.target.value)}/><br/>
                    <input type='text' value={teamResult} onChange={event => setTeamResult(event.target.value)}/><br/>
                    <input type='submit' value='Zaktualizuj zespół' onClick={handleUpdate}/>
                </form>
            </div>
        </>
    );
}

export default UpdateTeam;