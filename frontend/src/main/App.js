import '../styles/App.css'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import React from "react";

const App = () => {
  return (
    <div className="App">
        <div className="nabBar">
            <NavBar/>
        </div>
        <div className="main">
            <div className="row">
                <div className="column">
                    <Login/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
