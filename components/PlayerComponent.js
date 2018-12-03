import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Player extends Component {
  render() {
    return (
        <View>
          <Text>{this.props.name}</Text>
        </View>
    );
  }
}

export default Player;