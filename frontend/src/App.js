import './App.css';
import React from 'react'
import {TaskHeader} from "./components/TaskHeader"
import {TaskForm} from "./components/TaskForm"
import {TasksList} from "./components/TasksList";
import {initServices} from "./services";
import {useState} from "react";
import {ServicesContext} from "./contexts"
import {TasksManager} from "./components/TasksManager";


function App() {
    const [services] = useState(initServices())


    return (
        <ServicesContext.Provider value={services}>
            <div className="flex-container">
                <TaskHeader/>
                <TasksManager/>
            </div>
        </ServicesContext.Provider>
    );

}

export default App;
