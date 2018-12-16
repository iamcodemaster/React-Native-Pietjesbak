import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
// Screens Components
import AddPlayerNamesScreen from './screens/AddPlayerNamesScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';
import EndGameScreen from './screens/EndGameScreen';
// Data
import players from './players';

const AppNavigator = createStackNavigator(
  {
    Start: StartScreen,
    AddPlayerNames: AddPlayerNamesScreen,
    StartGame: StartGameScreen,
    Game: GameScreen,
    EndGame: EndGameScreen
  }
);

// const AppNavigator = createSwitchNavigator({
//   Main: MainStack,
//   Game: GameScreen
// });

export default class App extends Component {
  state = {
    players
  };

  addPlayerNames = newPlayer => {
    players[0].name = newPlayer.playerOneName;
    players[1].name = newPlayer.playerTwoName;
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
