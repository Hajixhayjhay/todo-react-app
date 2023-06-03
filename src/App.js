import './App.css';
import {TodoHeader} from "./components/TodoHeader"
import {TodoForm} from "./components/TodoForm"
import {TodoList} from "./components/TodoList";
import {initServices} from "./services";
import {useState} from "react";
import {ServicesContext} from "./contexts"


function App() {
    const [services] = useState(initServices())

    return (
        <ServicesContext.Provider value={services}>
            <div className="flex-container">
                <TodoHeader/>
                <TodoForm/>
                <TodoList/>
            </div>
        </ServicesContext.Provider>
    );

}

export default App;
