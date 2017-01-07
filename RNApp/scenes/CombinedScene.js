import React, { Component } from 'react';

export default class CombinedScene extends Component {

    render() {
        return (
            {this.props.component};
        );
    }
}