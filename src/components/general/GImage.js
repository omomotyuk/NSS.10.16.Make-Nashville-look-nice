import React, { Component } from 'react';

class GImage extends Component {

    render() {
        return (
            <>
                <img className="test-photo" src={require(this.props.photo)} alt="test" />
            </>
        )
    }
}

export default GImage