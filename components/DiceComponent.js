import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

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
    return (
      <View>
        <Text>{this.props.number}</Text>
        <CheckBox
          onPress={() => {this.toggleDice(this.props.dice, this.props.activePlayer)}}
          checked={this.state.dices[this.props.dice].checked} />
      </View>
    );
  }
}