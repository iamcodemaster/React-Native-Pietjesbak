import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView } from 'react-native';
import Dice from '../components/DiceComponent';
import Player from '../components/PlayerComponent';
import players from './../players';

export default class GameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Pietjesbak',
    };

    constructor(props) {
        super(props);

        this.state = {
            finishGame: false,
            finishRound: true,
            playerOneStopThrow: true,
            playerTwoStopThrow: true,
            endTurnPlayerOne: false,
            endTurnPlayerTwo: false,
            totalRoundThrows: 3,
            roundWinner: 0,
            players: players
        };
    }

    toggleKeepDice(player, dice) {
        let actualPlayer;
        if(player == 'playerOne') {
            actualPlayer = players.playerOne;
            if(dice == 'firstDice') {
                actualPlayer.firstDice.throwTheDice = !actualPlayer.firstDice.throwTheDice;
            } else if(dice == 'secondDice') {
                actualPlayer.secondDice.throwTheDice = !actualPlayer.secondDice.throwTheDice;
            } else if(dice == 'thirdDice') {
                actualPlayer.thirdDice.throwTheDice = !actualPlayer.thirdDice.throwTheDice;
            }
            players.playerOne = actualPlayer;
        }

        if(player == 'playerTwo') {
            actualPlayer = players.playerTwo;
            if(dice == 'firstDice') {
                actualPlayer.firstDice.throwTheDice = !actualPlayer.firstDice.throwTheDice;
            } else if(dice == 'secondDice') {
                actualPlayer.secondDice.throwTheDice = !actualPlayer.secondDice.throwTheDice;
            } else if(dice == 'thirdDice') {
                actualPlayer.thirdDice.throwTheDice = !actualPlayer.thirdDice.throwTheDice;
            }
            players.playerTwo = actualPlayer;
        }

        this.setState({
            players: players
        })
    }

    endThrowRound(player) {
        let totalRoundThrows;
        let playerOneStopThrow = this.state.playerOneStopThrow;
        let playerTwoStopThrow = this.state.playerTwoStopThrow;
        let endTurnPlayerOne = this.state.endTurnPlayerOne;
        let endTurnPlayerTwo = this.state.endTurnPlayerTwo;
        if(player == 1) {
            totalRoundThrows = players.playerOne.throws;
            players.playerOne.disabled = true;
            players.playerTwo.disabled = false;
            playerOneStopThrow = true;
            endTurnPlayerOne = true;
        } else if(player == 2) {
            totalRoundThrows = players.playerTwo.throws;
            players.playerTwo.disabled = true;
            players.playerOne.disabled = false;
            playerTwoStopThrow = true;
            endTurnPlayerTwo = true;
        }

        let finishRound = true;
        if(endTurnPlayerOne == true && endTurnPlayerTwo == true) {
            finishRound = false;
            playerOneStopThrow = true;
            playerTwoStopThrow = true;
            players.playerOne.disabled = true;
            players.playerTwo.disabled = true;
            this.countScore();
        }

        this.setState({
            finishRound: finishRound,
            totalRoundThrows: totalRoundThrows,
            playerOneStopThrow: playerOneStopThrow,
            playerTwoStopThrow: playerTwoStopThrow,
            endTurnPlayerOne: endTurnPlayerOne,
            endTurnPlayerTwo: endTurnPlayerTwo,
            players: players
        })
    }

    resetRound() {
        // set total throws on 0
        players.playerOne.throws = 0;
        players.playerTwo.throws = 0;
        // set all dices on 0
        players.playerOne.firstDice.number = 0;
        players.playerOne.secondDice.number = 0;
        players.playerOne.thirdDice.number = 0;
        players.playerTwo.firstDice.number = 0;
        players.playerTwo.secondDice.number = 0;
        players.playerTwo.thirdDice.number = 0;
        // set all dices on active
        players.playerOne.firstDice.throwTheDice = true;
        players.playerOne.secondDice.throwTheDice = true;
        players.playerOne.thirdDice.throwTheDice = true;
        players.playerTwo.firstDice.throwTheDice = true;
        players.playerTwo.secondDice.throwTheDice = true;
        players.playerTwo.thirdDice.throwTheDice = true;
        // set score on 0
        players.playerOne.score = 0;
        players.playerTwo.score = 0;
        // change state 
        this.setState({
            endTurnPlayerOne: false,
            endTurnPlayerTwo: false
        });
    }

    startNewRound() {
        // check the winner
        // the winner will start the next round
        if(this.state.roundWinner == 1) {
            players.playerOne.disabled = false;
        } else if(this.state.roundWinner == 2) {
            players.playerTwo.disabled = false;
        }
        // reset round
        this.resetRound();
        // save new state
        this.setState({
            totalRoundThrows: 3,
            finishRound: true,
            players: players
        });
    }

    rollTheDice(player) {
        let playerOneStopThrow = true;
        let playerTwoStopThrow = true;
        let endTurnPlayerOne = this.state.endTurnPlayerOne;
        let endTurnPlayerTwo = this.state.endTurnPlayerTwo;
        if(player == 'playerOne') {
            // turn the ability to stop his turn on
            playerOneStopThrow = false;
            // decrease from trows number 
            players.playerOne.throws++;
            // change the number of the active dices
            if(players.playerOne.firstDice.throwTheDice == true) {
                players.playerOne.firstDice.number = Math.floor(Math.random() * 6) + 1;
            }
            if(players.playerOne.secondDice.throwTheDice == true) {
                players.playerOne.secondDice.number = Math.floor(Math.random() * 6) + 1;
            }
            if(players.playerOne.thirdDice.throwTheDice == true) {
                players.playerOne.thirdDice.number = Math.floor(Math.random() * 6) + 1;
            }
            // check if the user has any throws left
            if(players.playerOne.throws == this.state.totalRoundThrows) {
                // disable buttons if no throws left
                players.playerOne.disabled = true;
                playerOneStopThrow = true;
                endTurnPlayerOne = true;
                // check if the other user has any throws left
                if(players.playerTwo.throws != this.state.totalRoundThrows) {
                    players.playerTwo.disabled = false;
                }
            }
        } else if(player == 'playerTwo') {
            // turn the ability to stop his turn on
            playerTwoStopThrow = false;
            // decrease from trows number 
            players.playerTwo.throws++;
            // change the number of the active dices
            if(players.playerTwo.firstDice.throwTheDice == true) {
                players.playerTwo.firstDice.number = Math.floor(Math.random() * 6) + 1;
            }
            if(players.playerTwo.secondDice.throwTheDice == true) {
                players.playerTwo.secondDice.number = Math.floor(Math.random() * 6) + 1;
            }
            if(players.playerTwo.thirdDice.throwTheDice == true) {
                players.playerTwo.thirdDice.number = Math.floor(Math.random() * 6) + 1;
            }
            // check if the user has any throws left
            if(players.playerTwo.throws == this.state.totalRoundThrows) {
                // disable buttons if no throws left
                endTurnPlayerTwo = true;
                players.playerTwo.disabled = true;
                playerTwoStopThrow = true;
                // check if the other user has any throws left
                if(players.playerOne.throws != this.state.totalRoundThrows) {
                    players.playerOne.disabled = false;
                }
            }
        }

        let finishRound = true;
        if(players.playerTwo.throws == this.state.totalRoundThrows && players.playerOne.throws == this.state.totalRoundThrows) {
            finishRound = false;
            playerOneStopThrow = true;
            playerTwoStopThrow = true;
            this.countScore();
        }

        this.setState({
            endTurnPlayerOne: endTurnPlayerOne,
            endTurnPlayerTwo: endTurnPlayerTwo,
            playerOneStopThrow: playerOneStopThrow,
            playerTwoStopThrow: playerTwoStopThrow,
            finishRound: finishRound,
            players: players
        })
    }

    isGameOver() {
        if (players.playerOne.pinstripes <= 0 || players.playerTwo.pinstripes <= 0) {
            alert("Game Over");
        }
    }

    checkResults(first, second) {
        let roundWinner;
        if(first == second) {
            // throw one more dice

        } else if(first == 69 || second == 69) {
            if(first == 69) {
                players.playerOne.pinstripes = players.playerOne.pinstripes - 3;
                roundWinner = 1;
            } else if(second == 69) {
                players.playerTwo.pinstripes = players.playerTwo.pinstripes - 3;
                roundWinner = 2;
            }
        } else if(String(first).indexOf('zand') != -1 || String(second).indexOf('zand') != -1){
            if(String(first).indexOf('zand') == -1 && String(second).indexOf('zand') != -1) {
                players.playerTwo.pinstripes = players.playerTwo.pinstripes - 2;
                roundWinner = 1;
            } else if(String(second).indexOf('zand') == -1 && String(first).indexOf('zand') != -1) {
                players.playerOne.pinstripes = players.playerOne.pinstripes - 2;
                roundWinner = 2;
            } else {
                first = String(first).replace('zand-','');
                first = parseInt(first);
    
                second = String(second).replace('zand-','');
                second = parseInt(second);
                if(first > second) {
                    players.playerOne.pinstripes = players.playerOne.pinstripes - 2;
                    roundWinner = 1;
                } else {
                    players.playerTwo.pinstripes = players.playerTwo.pinstripes - 2;
                    roundWinner = 2;
                }
            }
        } else {
            if(first > second) {
                players.playerOne.pinstripes = players.playerOne.pinstripes - 1;
                roundWinner = 1;
            } else {
                players.playerTwo.pinstripes = players.playerTwo.pinstripes - 1;
                roundWinner = 2;
            }
        }

        this.setState({
            roundWinner: roundWinner
        })

        this.isGameOver();
        // players.playerTwo.disabled = false; 
        // players.playerTwo.throws = 3;
        // players.playerOne.disabled = false;
        // players.playerOne.throws = 3;
    }

    countScore() {
        let playerOneDiceOne = players.playerOne.firstDice.number;
        let playerOneDiceTwo = players.playerOne.secondDice.number;
        let playerOneDiceThree = players.playerOne.thirdDice.number;
        let playerTwoDiceOne = players.playerTwo.firstDice.number;
        let playerTwoDiceTwo = players.playerTwo.secondDice.number;
        let playerTwoDiceThree = players.playerTwo.thirdDice.number;

        if(this.isFullAses(playerOneDiceOne, playerOneDiceTwo, playerOneDiceThree)) {
            // win direct
            alert('ass');
        } else if(this.isSoixanteNeuf(playerOneDiceOne, playerOneDiceTwo, playerOneDiceThree)) {
            // 3 lines out
            players.playerOne.score = 69;
        } else if(this.isZand(playerOneDiceOne, playerOneDiceTwo, playerOneDiceThree)) {
            // 2 lines out
            let arrayNumbers = [playerOneDiceOne, playerOneDiceTwo, playerOneDiceThree];
            if(arrayNumbers.includes(2)) {
                players.playerOne.score = "zand-2";
            } else if(arrayNumbers.includes(3)) {
                players.playerOne.score = "zand-3";
            } else if(arrayNumbers.includes(4)) {
                players.playerOne.score = "zand-4";
            } else if(arrayNumbers.includes(5)) {
                players.playerOne.score = "zand-5";
            } else if(arrayNumbers.includes(6)) {
                players.playerOne.score = "zand-6";
            }
        } else {
            let score = this.isSomethingElse(playerOneDiceOne, playerOneDiceTwo, playerOneDiceThree);
            players.playerOne.score = score[0] + score[1] + score[2];
        }

        if(this.isFullAses(playerTwoDiceOne, playerTwoDiceTwo, playerTwoDiceThree)) {
            // win direct
            alert('ass');
        } else if(this.isSoixanteNeuf(playerTwoDiceOne, playerTwoDiceTwo, playerTwoDiceThree)) {
            // 3 lines out
            players.playerTwo.score = 69;
        } else if(this.isZand(playerTwoDiceOne, playerTwoDiceTwo, playerTwoDiceThree)) {
            // 2 lines out
            let arrayNumbers = [playerTwoDiceOne, playerTwoDiceTwo, playerTwoDiceThree];
            if(arrayNumbers.includes(2)) {
                players.playerTwo.score = "zand-2";
            } else if(arrayNumbers.includes(3)) {
                players.playerTwo.score = "zand-3";
            } else if(arrayNumbers.includes(4)) {
                players.playerTwo.score = "zand-4";
            } else if(arrayNumbers.includes(5)) {
                players.playerTwo.score = "zand-5";
            } else if(arrayNumbers.includes(6)) {
                players.playerTwo.score = "zand-6";
            }
        } else {
            let score = this.isSomethingElse(playerTwoDiceOne, playerTwoDiceTwo, playerTwoDiceThree);
            players.playerTwo.score = score[0] + score[1] + score[2];
        }

        this.checkResults(players.playerOne.score, players.playerTwo.score);
        // this.rollAgain();

        this.setState({
            players: players
        })
    }

    rollAgain() {
        players.playerTwo.disabled == false; 
        players.playerOne.disabled == false;

        this.setState({
            players: players
        })
    }

    isFullAses(first, second, third) {
        if(first == 1 && second == 1 && third == 1) {
            return true;
        }

        return false;
    }

    isSoixanteNeuf(first, second, third) {
        let arrayNumbers = [first, second, third];
        let includeSix = arrayNumbers.includes(6);
        let includeFive = arrayNumbers.includes(5);
        let includeFour = arrayNumbers.includes(4);

        if(includeSix == true && includeFive == true && includeFour == true) {
            return true;
        }
        
        return false;
    }

    isZand(first, second, third) {
        if(first == second && second == third) {
            return true;
        }

        return false;
    }

    isSeven(first, second, third) {
        // To Do: are the numbers 2 2 3
        alert(seleven)
    }

    isSomethingElse(first, second, third) {
        let arrayNumbers = [first, second, third];
        for (let i = 0; i < arrayNumbers.length; i++) {
            if(arrayNumbers[i] == 1) {
                arrayNumbers[i] = 100;
            } else if(arrayNumbers[i] == 6) {
                arrayNumbers[i] = 60;
            } else {
                arrayNumbers[i];
            }
        }
        return arrayNumbers;
    }

    render() {
      return (
        <ScrollView>
            <View style={styles.container}>
                <Player 
                    name={this.state.players.playerOne.name} 
                    score={this.state.players.playerOne.score} 
                    pinstripes={this.state.players.playerOne.pinstripes} />
                <View style={styles.dices}>
                    <Dice 
                        number={this.state.players.playerOne.firstDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "firstDice")}}
                        value={this.state.players.playerOne.firstDice.throwTheDice}
                        disabled={this.state.players.playerOne.disabled} />
                    <Dice 
                        number={this.state.players.playerOne.secondDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "secondDice")}}
                        value={this.state.players.playerOne.secondDice.throwTheDice}
                        disabled={this.state.players.playerOne.disabled} />
                    <Dice 
                        number={this.state.players.playerOne.thirdDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "thirdDice")}}
                        value={this.state.players.playerOne.thirdDice.throwTheDice}
                        disabled={this.state.players.playerOne.disabled} />
                </View>
                <Button 
                    title="Roll" 
                    disabled={this.state.players.playerOne.disabled} 
                    onPress={() => {this.rollTheDice("playerOne")}} />
                <Button 
                    title="Stop" 
                    disabled={this.state.playerOneStopThrow}
                    onPress={() => {this.endThrowRound(this.state.players.playerOne.id)}} />
            </View>

            <View style={styles.container}>
                <Player name={this.state.players.playerTwo.name} score={this.state.players.playerTwo.score} pinstripes={this.state.players.playerTwo.pinstripes} />
                <View style={styles.dices}>
                    <Dice number={this.state.players.playerTwo.firstDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "firstDice")}}
                        value={this.state.players.playerTwo.firstDice.throwTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                    <Dice number={this.state.players.playerTwo.secondDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "secondDice")}}
                        value={this.state.players.playerTwo.secondDice.throwTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                    <Dice number={this.state.players.playerTwo.thirdDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "thirdDice")}}
                        value={this.state.players.playerTwo.thirdDice.throwTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                </View>
                <Button 
                    title="Roll" 
                    disabled={this.state.players.playerTwo.disabled}
                    onPress={() => {this.rollTheDice("playerTwo")}} />
                <Button 
                    title="Stop" 
                    disabled={this.state.playerTwoStopThrow}
                    onPress={() => {this.endThrowRound(this.state.players.playerTwo.id)}} />
            </View>
            <Button 
                title="New round" 
                disabled={this.state.finishRound}
                onPress={() => {this.startNewRound()}} />
        </ScrollView>
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
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    dices: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

  