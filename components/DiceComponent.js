import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
        <Side />
        <CheckBox
          center
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='black'
          containerStyle={styles.checkbox}
          onPress={() => {this.toggleDice(this.props.dice, this.props.activePlayer)}}
          checked={this.state.dices[this.props.dice].checked} />
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
  },
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginLeft: 30
  }
});