import React, { Component } from 'react';
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
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