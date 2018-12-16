import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Player extends Component {
  render() {
    return (
        <View style={[styles.playerText, styles.activePlayer, styles.player, this.props.style]}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={this.props.avatar} />
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
  textStyle: {
    // fontSize: 16
    color: '#ecad63'
  },
  playerText: {
    paddingLeft: 15,
    paddingRight: 15
  },
  importantTextElements: {
    fontWeight: 'bold',
    color: '#CF7307'
  },
  player: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#EED498',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});