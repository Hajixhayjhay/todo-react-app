import './App.css';
import React, {useState} from 'react'
import {TaskHeader} from "./components/TaskHeader"
import {initServices} from "./services";
import {ServicesContext} from "./contexts"
import {TasksManager} from "./components/TasksManager";
import {TaskProvider} from "./components/TaskProvider";


function App() {
    const [services] = useState(initServices())


    return (
        <ServicesContext.Provider value={services}>
            <div className="flex-container">
                <TaskHeader/>
                <TaskProvider>
                    <TasksManager/>
                </TaskProvider>
            </div>
        </ServicesContext.Provider>
    );

}

export default App;
