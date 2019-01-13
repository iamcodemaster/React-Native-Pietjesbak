
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
// data
import players from './../players';

export default class StartGameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Decide start player',
        headerTintColor: '#CF7307',
        headerStyle: {
            backgroundColor: '#fffbe0'
        },
        headerTitleStyle: {
            alignSelf: 'center',
            color: '#CF7307'
        }
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

    rollTheDie(indexPlayer) {
        let playerOneRollButton = this.state.playerOneRollButton;
        let playerTwoRollButton = this.state.playerTwoRollButton;
        let startGameButton = this.state.startGameButton;
        let starter = this.state.starter;

        players[indexPlayer].startDie = Math.floor(Math.random() * 6) + 1;
        if(indexPlayer == 0) {
            playerOneRollButton = true;
        } else if(indexPlayer == 1) {
            playerTwoRollButton = true;
        }

        // check if the die values are equal
        if(playerOneRollButton == true && playerTwoRollButton == true) {
            if(players[0].startDie == players[1].startDie) {
                playerOneRollButton = false;
                playerTwoRollButton = false;
            } else {
                players[0].startDie > players[1].startDie ? players[0].turn = true : players[1].turn = true;
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

        this.setState({
            playerOneRollButton: false,
            playerTwoRollButton: false,
            startGameButton: true,
            starter: 0,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Player One */}
                <View style={styles.playerContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={this.state.players[0].avatar} />
                    </View>
                    <View style={styles.playerText}>
                        <Text style={styles.ImportantTextElements}>Player 1: {this.state.players[0].name}</Text>
                        <Text style={styles.TextStyle}>Pinstripes: {this.state.players[0].pinstripes}</Text>
                        <Text style={styles.TextStyle}>Die: {this.state.players[0].startDie}</Text>
                    </View>
                </View>
                <Button 
                    buttonStyle={styles.button}
                    backgroundColor="#92D418"
                    title="Roll the die" 
                    disabled={this.state.playerOneRollButton} 
                    onPress={() => {this.rollTheDie(0)}} />
                {/* Player Two */}
                <View style={styles.playerContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={this.state.players[1].avatar} />
                    </View>
                    <View style={styles.playerText}>
                        <Text style={styles.ImportantTextElements}>Player 2: {this.state.players[1].name}</Text>
                        <Text style={styles.TextStyle}>Pinstripes: {this.state.players[1].pinstripes}</Text>
                        <Text style={styles.TextStyle}>Die: {this.state.players[1].startDie}</Text>
                    </View>
                </View>
                <Button 
                    buttonStyle={styles.button}
                    backgroundColor="#92D418"
                    title="Roll the die" 
                    disabled={this.state.playerTwoRollButton} 
                    onPress={() => {this.rollTheDie(1)}} />
                {/* Start Button */}
                <Button 
                    buttonStyle={[styles.buttonSpacing, styles.button]}
                    backgroundColor="#92D418"
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
        color: '#CF7307'
    },
    buttonSpacing: {
        marginTop: 20
    },
    playerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15,
        marginBottom: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    playerText: {
    },
    TextStyle: {
        color: '#ecad63',
    },
    container: {
        flex: 1,
        backgroundColor: '#fffbe0',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 100
    },
});