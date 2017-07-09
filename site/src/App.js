import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {topTracks: []};
        var thisComponent = this;
        axios.get('https://7zab8bf921.execute-api.us-east-1.amazonaws.com/Prod/music')
            .then(function (response) {
                thisComponent.setState((prevState) => ({
                        topTracks: response.data.toptracks.track
                    }));
                }
            )
            .catch(function (error) {
                console.log(error);
            }
        );
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.

                </p>


                <ul>
                    {this.state.topTracks.map(function(track, i){
                        return <li>{track.name}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default App;
