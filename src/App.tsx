import React from 'react';
import './App.css';
import Sign from "./Pages/Sign";
import Home from "./Pages/Home/"
import {Switch, Route} from "react-router-dom"

function App() {
  return (
    <div>
        <Switch>
            <Route exact path={"/"} render={() => <Sign />}/>
            <Route path={'/home'} render={() => <Home/>}/>
        </Switch>
    </div>
  );
}

export default App;
