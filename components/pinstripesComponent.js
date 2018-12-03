import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Pinstripes extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.pinstripes}</Text>
            </View>
        );
    }
}

export default Pinstripes;