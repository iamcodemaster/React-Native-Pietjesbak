import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Player extends Component {
  render() {
    return (
        <View style={[styles.playerText, styles.activePlayer, styles.player]}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={require('../assets/img/el.png')} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={[styles.textStyle, styles.importantTextElements]}>{this.props.name}</Text>
            <Text style={styles.textStyle}>Score: {this.props.score}</Text>
            <Text style={styles.textStyle}>Pinstripes: {this.props.pinstripes}</Text>
            <Text style={styles.textStyle}>Dices: {this.props.diceNumbers}</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 15
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  importantTextElements: {
    fontWeight: 'bold'
  },
  textStyle: {
    // fontSize: 16
  },
  playerText: {
    marginLeft: 15,
    marginRight: 15,
  },
  player: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  activePlayer: {
    // backgroundColor: '#999'
  }
});