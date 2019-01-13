import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { SideThree, SideOne, SideTwo, SideFour, SideFive, SideSix } from './SideComponent';

import dice from '../dice';
import players from '../players';

export default class Dice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dice,
      players,
      keep: true
    }
    
  }

  toggleDie(activeDie, activePlayer) {
    // if player is not at his first throw
    if(players[activePlayer].throws != 0) {
      // check or uncheck the checkbox
      dice[activeDie].checked = !dice[activeDie].checked;

      this.setState({
        players: players,
        dice: dice,
      });
    }
  }

  render() {
    const Side = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][this.props.side]
    return (
      <View style={styles.side}>
        <View style={ this.state.dice[this.props.die].checked ? styles.throwDie : styles.keepDie}>
          <Side />
        </View>
        <CheckBox
          center
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#CF7307'
          containerStyle={styles.checkbox}
          onPress={() => {this.toggleDie(this.props.die, this.props.activePlayer)}}
          checked={this.state.dice[this.props.die].checked} />
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
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 30,
    // display: 'none'
  },
  keepDie: {
    opacity: 0.5
  },
  throwDie: {
    opacity: 1
  }
});