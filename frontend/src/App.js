import React, { Component } from 'react';
import Routes from "./Routes";

export default class App extends Component {
   // static displayName = App.name;

    render () {
        return (
            <main>
                <Routes />
            </main>
        );
    }
}