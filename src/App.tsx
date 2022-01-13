import React from 'react';
import './App.css';
import Sign from "./Pages/Sign";
import Home from "./Pages/Home/"
import {Switch, Route} from "react-router-dom"
import Messages from "./Pages/Messages";

// todo
// #1 выкидывать если не авторизован (backend)


function App() {

    return (
        <div>
            <Switch>
                <Route path={"/sign"} render={() => <Sign/>}/>
                <Route exact path={'/home/messages'} render={() => <Messages/>}/>
                <Route path={'/'} render={() => <Home/>}/>
            </Switch>
        </div>
    );
}

export default App;
