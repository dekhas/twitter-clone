import React from 'react';
import './App.css';
import Sign from "./Pages/Sign";
import Home from "./Pages/Home/"
import {Switch, Route} from "react-router-dom"


// todo
// #1 Добавить токен после регистрации (backend)
// #2 Поправить NavLink в Home

function App() {
    return (
        <div>
            <Switch>
                <Route path={"/sign"} render={() => <Sign/>}/>
                <Route path={'/'} render={() => <Home/>}/>
            </Switch>
        </div>
    );
}

export default App;
