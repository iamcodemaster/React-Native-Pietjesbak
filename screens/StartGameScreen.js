
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
            starter: 0,
            players
        };
    }

    rollTheDice(indexPlayer) {
        let playerOneRollButton = this.state.playerOneRollButton;
        let playerTwoRollButton = this.state.playerTwoRollButton;
        let startGameButton = this.state.startGameButton;
        let starter = this.state.starter;

        players[indexPlayer].startDice = Math.floor(Math.random() * 6) + 1;
        if(indexPlayer == 0) {
            playerOneRollButton = true;
        } else if(indexPlayer == 1) {
            playerTwoRollButton = true;
        }

        // check if the dice values are equal
        if(playerOneRollButton == true && playerTwoRollButton == true) {
            if(players[0].startDice == players[1].startDice) {
                playerOneRollButton = false;
                playerTwoRollButton = false;
            } else {
                players[0].startDice > players[1].startDice ? players[0].turn = true : players[1].turn = true;
                if(players[0].turn == true) {
                    players[0].disabled = false;
                    starter = 0;
                } else if(players[1].turn == true) {
                    players[1].disabled = false;
                    starter = 1;
                }
                startGameButton = false;
            }
        }
        this.setState({
            starter: starter,
            playerOneRollButton: playerOneRollButton,
            playerTwoRollButton: playerTwoRollButton,
            startGameButton: startGameButton,
            players: players
        });
    }

    navigateToGame() {
        this.props.navigation.navigate('Game', {
            starter: this.state.starter,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Player One */}
                <View style={styles.playerText}>
                    <Text style={styles.ImportantTextElements}>Player 1: {this.state.players[0].name}</Text>
                    <Text style={styles.TextStyle}>Pinstripes: {this.state.players[0].pinstripes}</Text>
                    <Text style={styles.TextStyle}>Dice: {this.state.players[0].startDice}</Text>
                </View>
                <Button 
                    backgroundColor="#0B60FF"
                    title="Roll the dice" 
                    disabled={this.state.playerOneRollButton} 
                    onPress={() => {this.rollTheDice(0)}} />
                {/* Player Two */}
                <View style={styles.playerText}>
                    <Text style={styles.ImportantTextElements}>Player 2: {this.state.players[1].name}</Text>
                    <Text style={styles.TextStyle}>Pinstripes: {this.state.players[1].pinstripes}</Text>
                    <Text style={styles.TextStyle}>Dice: {this.state.players[1].startDice}</Text>
                </View>
                <Button 
                    backgroundColor="#CE3B3E"
                    title="Roll the dice" 
                    disabled={this.state.playerTwoRollButton} 
                    onPress={() => {this.rollTheDice(1)}} />
                {/* Start Button */}
                <Button 
                    buttonStyle={styles.buttonSpacing}
                    backgroundColor="#0B60FF"
                    title="Start Game"
                    disabled={this.state.startGameButton} 
                    onPress={() => this.navigateToGame()} />
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