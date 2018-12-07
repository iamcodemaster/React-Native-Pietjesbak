import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Player extends Component {
  render() {
    return (
        <View style={styles.playerText}>
          <Text style={styles.importantTextElements}>Name: {this.props.name}</Text>
          <Text style={styles.textStyle}>Score: {this.props.score}</Text>
          <Text style={styles.textStyle}>Pinstripes: {this.props.pinstripes}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  importantTextElements: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5
  },
  textStyle: {
      fontSize: 16
  },
  playerText: {
      marginTop: 20,
      marginLeft: 15,
      marginBottom: 10
  }
});