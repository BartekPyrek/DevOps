import React from 'react';
import axios from 'axios';
import {useState} from "react";
import './App.css';

const DeleteTeam = (props) => {

    const [teamId, setTeamId] = useState("");

    const handleDeleteTeam = (event) => {
        setTeamId(event.target.value);
        axios.delete(`http://localhost:9090/deleteTeam/${teamId}`)
            .then(response => response.data)
            .catch(error => console.log(error))

        event.preventDefault();
    };

    return (
        <>
            <div className="Div-element">
                <form>
                    <input type='text' value={teamId} onChange={event => setTeamId(event.target.value)}/><br/>
                    <input type='submit' value='Usuń zespół' onClick={handleDeleteTeam}/>
                </form>
            </div>
        </>
    );
};

export default DeleteTeam;