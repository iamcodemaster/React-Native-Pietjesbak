
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import players from './../players';

class Player extends Component {
    render() {
      return (
          <View>
            <Text>Name: {this.props.name}</Text>
            <Text>Pinstripes: {this.props.pinstripes}</Text>
          </View>
      );
    }
}

export default class StartGameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Roll the dices to begin',
    };

    constructor() {
        super();
        
        this.state = {
            playerOneRollButton: false,
            playerTwoRollButton: false,
            startGameButton: true,
            players
        };
    }

    rollTheDice(player) {
        let playerOneRollButton = this.state.playerOneRollButton;
        let playerTwoRollButton = this.state.playerTwoRollButton;
        let startGameButton = this.state.startGameButton;
        if(player == 1) {
            players.playerOne.startDice = Math.floor(Math.random() * 6) + 1;
            playerOneRollButton = true;
        } else if(player == 2) {
            players.playerTwo.startDice = Math.floor(Math.random() * 6) + 1;
            playerTwoRollButton = true;
        }
        // check if the dice values are equal
        if(playerOneRollButton == true && playerTwoRollButton == true) {
            if(players.playerOne.startDice == players.playerTwo.startDice) {
                playerOneRollButton = false;
                playerTwoRollButton = false;
            } else {
                players.playerOne.startDice > players.playerTwo.startDice ? players.playerOne.turn = true : players.playerTwo.turn = true;
                startGameButton = false;
            }
        }
        this.setState({
            playerOneRollButton: playerOneRollButton,
            playerTwoRollButton: playerTwoRollButton,
            startGameButton: startGameButton,
            players: players
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Player 
                    name={this.state.players.playerOne.name} 
                    pinstripes={this.state.players.playerOne.pinstripes} />
                <Text>{this.state.players.playerOne.startDice}</Text>
                <Button 
                    title="Roll the dice" 
                    disabled={this.state.playerOneRollButton} 
                    onPress={() => {this.rollTheDice(this.state.players.playerOne.id)}} />
                <Player 
                    name={this.state.players.playerTwo.name} 
                    pinstripes={this.state.players.playerTwo.pinstripes} />
                <Text>{this.state.players.playerTwo.startDice}</Text>
                <Button 
                    title="Roll the dice" 
                    disabled={this.state.playerTwoRollButton} 
                    onPress={() => {this.rollTheDice(this.state.players.playerTwo.id)}} />
                <Button 
                    title="Start Game"
                    disabled={this.state.startGameButton} 
                    onPress={() => navigate('Game')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});