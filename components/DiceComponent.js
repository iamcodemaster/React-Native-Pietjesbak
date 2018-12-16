import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { SideThree, SideOne, SideTwo, SideFour, SideFive, SideSix } from './side';

import dices from '../dices';
import players from '../players';

export default class Dice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dices,
      players
    }
    
  }

  toggleDice(activeDice, activePlayer) {
    // if player is not at his first throw
    if(players[activePlayer].throws != 0) {
      // check or uncheck the checkbox
      dices[activeDice].checked = !dices[activeDice].checked;

      this.setState({
        players: players,
        dices: dices,
      });
    }
  }

  render() {
    const Side = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][this.props.side]
    return (
      <View style={styles.side}>
        <TouchableHighlight
            style={
              this.state.dices[this.props.dice].checked
                ? styles.doNotKeepDie
                : styles.keepDie
            }
            underlayColor={'transparent'}
            onPress={() => {this.toggleDice(this.props.dice, this.props.activePlayer)}} >
          <Side />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  side: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  keepDie: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  doNotKeepDie: {
    opacity: 1,
    backgroundColor: 'transparent',
  }
});