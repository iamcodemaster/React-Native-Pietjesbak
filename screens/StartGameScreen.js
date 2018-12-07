
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import players from './../players';
import { Button, Text, Divider } from 'react-native-elements';

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
                if(players.playerOne.turn == true) {
                    players.playerOne.disabled = false;
                } else if(players.playerTwo.turn == true) {
                    players.playerTwo.disabled = false;
                }
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
                {/* Player One */}
                <View style={styles.playerText}>
                    <Text style={styles.ImportantTextElements}>Player 1: {this.state.players.playerOne.name}</Text>
                    <Text style={styles.TextStyle}>Pinstripes: {this.state.players.playerOne.pinstripes}</Text>
                    <Text style={styles.TextStyle}>Dice: {this.state.players.playerOne.startDice}</Text>
                </View>
                <Button 
                    backgroundColor="#0B60FF"
                    title="Roll the dice" 
                    disabled={this.state.playerOneRollButton} 
                    onPress={() => {this.rollTheDice(this.state.players.playerOne.id)}} />
                {/* Player Two */}
                <View style={styles.playerText}>
                    <Text style={styles.ImportantTextElements}>Player 2: {this.state.players.playerTwo.name}</Text>
                    <Text style={styles.TextStyle}>Pinstripes: {this.state.players.playerTwo.pinstripes}</Text>
                    <Text style={styles.TextStyle}>Dice: {this.state.players.playerTwo.startDice}</Text>
                </View>
                <Button 
                    backgroundColor="#CE3B3E"
                    title="Roll the dice" 
                    disabled={this.state.playerTwoRollButton} 
                    onPress={() => {this.rollTheDice(this.state.players.playerTwo.id)}} />
                {/* Start Button */}
                <Button 
                    buttonStyle={styles.buttonSpacing}
                    backgroundColor="#0B60FF"
                    title="Start Game"
                    disabled={this.state.startGameButton} 
                    onPress={() => navigate('Game')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ImportantTextElements: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    TextStyle: {
        fontSize: 16
    },
    buttonSpacing: {
        marginTop: 20
    },
    playerText: {
        marginTop: 20,
        marginLeft: 15,
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});