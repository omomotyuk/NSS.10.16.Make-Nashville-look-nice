import React, { Component } from 'react';

class GImage extends Component {

    render() {
        return (
            <>
                <img className="test-photo" src={require("../../photos/test-photo.jpg")} alt="test" />
            </>
        )
    }
}

export default GImage