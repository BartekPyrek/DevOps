import React from 'react';
import './App.css';
import DeleteTeam from "./DeleteTeam";
import ShowTeams from "./ShowTeams";
import AddTeam from "./AddTeam";
import UpdateTeam from "./UpdateTeam";

const App = (props) => {

    return (
        <>
            <AddTeam/>
            <DeleteTeam/>
            <UpdateTeam/>
            <ShowTeams/>
        </>
    );
}

export default App;
