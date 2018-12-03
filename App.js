import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AddPlayerNamesScreen from './screens/AddPlayerNamesScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import players from './players';

const MainStack = createStackNavigator(
  {
    AddPlayerNames: AddPlayerNamesScreen,
    StartGame: StartGameScreen
  }
);

const AppNavigator = createSwitchNavigator({
  Main: MainStack,
  Game: GameScreen
});

export default class App extends React.Component {
  state = {
    players
  };

  addPlayerNames = newPlayer => {
    players.playerOne.name = newPlayer.playerOneName;
    players.playerTwo.name = newPlayer.playerTwoName;
  }

  render() {
    return (
      <AppNavigator screenProps={{
        players: this.state.players,
        addPlayerNames: this.addPlayerNames
      }} />
    );
  }
}
