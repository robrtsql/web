import React, { Component } from 'react';
import axios from 'axios';

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.originalTrack.name,
            url: props.originalTrack.url
        };
    }

    render() {
        return <div className="entry" key={this.state.url}>{this.state.name}</div>;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {topTracks: []};
        var thisComponent = this;
        axios.get('https://7zab8bf921.execute-api.us-east-1.amazonaws.com/Prod/music')
            .then(function (response) {
                var tracks = response.data.toptracks.track.map(function(track) {
                    return new Track({originalTrack: track});
                });
                thisComponent.setState((prevState) => ({
                        topTracks: tracks
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
            <div className="App container content">
                <main>
                    <div id="tlogs">
                        {this.state.topTracks.map(function(track, i){
                            return track.render();
                        })}
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
