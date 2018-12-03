import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';

export default class Dice extends Component {
  constructor() {
    super();

    
  }

  render() {
    return (
      <View>
        <Text>Dice - {this.props.number}</Text>
      </View>
    );
  }
}