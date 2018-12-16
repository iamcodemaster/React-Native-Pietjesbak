import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchContainer } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import Dice from '../components/DiceComponent';
import Player from '../components/PlayerComponent';
import players from './../players';
import dices from './../dices';

export default class GameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Pietjesbak',
    };

    constructor(props) {
        super(props);

        this.state = {
            // main states
            players,
            dices,

            activePlayer: this.props.navigation.getParam('starter', 0),
            roundWinner: 0,

            // game rounds
            totalRoundThrows: 3,
            finishThrow: false,
            finishRound: false,

            // game buttons 
            rollButton: false,
            passButton: true,
            newRoundButton: true,

            finishGame: false,
            playerOneStopThrow: true,
            playerTwoStopThrow: true,
            endTurnPlayerOne: false,
            endTurnPlayerTwo: false,
        };
    }

    // DONE
    pass(activePlayer) {
        // end the turn of the active player
        players[activePlayer].turnEnded = true;
        // set new states
        this.setState({
            // change max round throws for the next player
            totalRoundThrows: players[activePlayer].throws,
            // deactivate pass button on pass
            passButton: true,
            finishThrow: true
        })
        // count score for the active player
        this.countScore();
        // reset the dices for the next player
        this.resetDices();
        // check if round ended
        this.isRoundEnded();
        // change active user
        if((players.length - 1) != activePlayer) {
            newActivePlayer = activePlayer + 1;
        } else {
            newActivePlayer = 0;
        }
        // set new states
        this.setState({
            players: players,
            activePlayer: newActivePlayer
        })
    }

    // DONE
    startNewRound() {
        // reset round
        players.forEach(player => {
            // reset total throws per player
            player.throws = 0;
            // reset score per player
            player.score = 0;
            // set turn enden to false per player
            player.turnEnded = false;
        });
        // reset the dices for the next player
        this.resetDices();
        // save new state
        this.setState({
            players: players,
            // the winner will start the next round
            activePlayer: this.state.roundWinner,
            // max throws set back to 3
            totalRoundThrows: 3,
            // set original buttons state
            newRoundButton: true,
            rollButton: false,
            passButton: false,
            
            finishThrow: false,
            finishRound: false,
        });
    }

    // DONE
    resetDices() {
        // set dice numbers on 0 and set checked on true for all dices
        dices.forEach(dice => {
            dice.number = 0;
            // dice.side = 0;
            dice.checked = true;
        });
        // set new states
        this.setState({
            dices: dices
        })
    }

    // DONE
    isRoundEnded() {
        // check if throw round ended
        var finishThrow = true; 
        players.forEach(player => {
            if(player.throws != this.state.totalRoundThrows) {
                finishThrow = false;
            }
        });
        // count score if round ended
        if(finishThrow == true) {
            // end the turn of the active player
            players[this.state.activePlayer].turnEnded = true;
            // it seems that this is not needed here -> this.countScore(); keep it for backup
            this.resetDices();
        }
        // check if round is finished
        var finishRound = true;
        players.forEach(player => {
            if(player.turnEnded != true) {
                finishRound = false;
            }
        });
        // if finish round is true end round
        if(finishRound == true) {
            this.finishRound();
            // check results
            this.checkResults();
        }
        // set new states
        this.setState({
            players: players,
            finishRound: finishRound,
            finishThrow: finishThrow
        })
    }

    // DONE
    finishRound() {
        // set new states
        this.setState({
            rollButton: true,
            passButton: true,
            newRoundButton: false
        })
    }

    // DONE
    roll(activePlayer) {
        // change the number of the active dices
        for (let i = 0; i < dices.length; i++) {
            if(dices[i].checked == true) {
                let randomNumber = Math.floor(Math.random() * 6) + 1;
                dices[i].number = randomNumber;
                dices[i].side = dices[i].number - 1;
            }
        }
        // increase throws of active player
        players[activePlayer].throws++;
        // check if the user has any throws left
        let newActivePlayer = activePlayer;
        if(players[activePlayer].throws == this.state.totalRoundThrows) {
            // end the turn of the active player
            players[this.state.activePlayer].turnEnded = true;
            // calculate score for active user
            this.countScore();
            // reset dices for the next player
            this.resetDices();
            // change active user
            if((players.length - 1) != activePlayer) {
                newActivePlayer = activePlayer + 1;
            } else {
                newActivePlayer = 0;
            }
        }
        // activate pass button after first throw
        if(players[this.state.activePlayer].throws == 1) {
            this.setState({
                passButton: false,
            });
        }
        // check if round ended
        this.isRoundEnded();
        // set new states
        this.setState({
            activePlayer: newActivePlayer,
            dices: dices,
            players: players
        })
    }

    // TO DO
    isGameOver() {
        if (players.playerOne.pinstripes <= 0 || players.playerTwo.pinstripes <= 0) {
            alert("Game Over");
        }
    }

    // TO DO
    checkResults() {
        let first = this.state.players[0].score;
        let second = this.state.players[1].score;
        let roundWinner;
        if(first == second) {
            // throw one more dice
            alert('Throw the dice one more time');
        } else if(first == 69 || second == 69) {
            if(first == 69) {
                players[0].pinstripes = players[0].pinstripes - 3;
                roundWinner = 0;
            } else if(second == 69) {
                players[1].pinstripes = players[1].pinstripes - 3;
                roundWinner = 1;
            }
        } else if(String(first).indexOf('zand') != -1 || String(second).indexOf('zand') != -1){
            if(String(first).indexOf('zand') == -1 && String(second).indexOf('zand') != -1) {
                players[1].pinstripes = players[1].pinstripes - 2;
                roundWinner = 1;
            } else if(String(second).indexOf('zand') == -1 && String(first).indexOf('zand') != -1) {
                players[0].pinstripes = players[0].pinstripes - 2;
                roundWinner = 0;
            } else {
                first = String(first).replace('zand-','');
                first = parseInt(first);
    
                second = String(second).replace('zand-','');
                second = parseInt(second);
                if(first > second) {
                    players[0].pinstripes = players[0].pinstripes - 2;
                    roundWinner = 0;
                } else {
                    players[1].pinstripes = players[1].pinstripes - 2;
                    roundWinner = 1;
                }
            }
        } else {
            if(first > second) {
                players[0].pinstripes = players[0].pinstripes - 1;
                roundWinner = 0;
            } else {
                players[1].pinstripes = players[1].pinstripes - 1;
                roundWinner = 1;
            }
        }

        this.setState({
            players: players,
            roundWinner: roundWinner
        })

        // this.isGameOver();
    }

    // TO DO
    countScore() {
        // create array with dice numbers
        let dicesArray = [];
        dices.forEach(dice => {
            dicesArray.push(dice.number);
        });

        if(this.isFullAses(dicesArray)) {
            // win direct
            alert('ass');
        } else if(this.isSoixanteNeuf(dicesArray)) {
            // 3 lines out
            players[this.state.activePlayer].score = 69;
        } else if(this.isZand(dicesArray)) {
            // 2 lines out
            for (let i = 2; i < 7; i++) {
                if(dicesArray.includes(i)) {
                    players[this.state.activePlayer].score = "zand-"+i;
                }
            }
        } else {
            let score = this.isSomethingElse(dicesArray);
            players[this.state.activePlayer].score = score[0] + score[1] + score[2];
        }

        // add dice numbers to player last dice numbers
        alert(this.state.activePlayer);
        players[this.state.activePlayer].lastDiceNumbers = [
            dices[0].number,
            dices[1].number,
            dices[2].number,
        ]

        // set new state
        this.setState({
            players: players
        })
    }

    // DONE 
    isFullAses(dices) {
        // if all dices are aces return true
        if(dices[0] == 1 && dices[1] == 1 && dices[2] == 1) {
            return true;
        }
        return false;
    }

    // DONE 
    isSoixanteNeuf(dices) {
        let includeSix = dices.includes(6);
        let includeFive = dices.includes(5);
        let includeFour = dices.includes(4);
        // if 6, 5, 4 icluded return true
        if(includeSix == true && includeFive == true && includeFour == true) {
            return true;
        }
        return false;
    }

    // DONE 
    isZand(dices) {
        // if all the same number return true
        if(dices[0] == dices[1] && dices[1] == dices[2]) {
            return true;
        }
        return false;
    }

    // TO DO
    isSeven(dices) {
        // To Do: are the numbers 2 2 3
        alert("seven")
    }

    // DONE
    isSomethingElse(dices) {
        var diceValues = [];
        for (let i = 0; i < dices.length; i++) {
            if(dices[i] == 1) {
                diceValues[i] = 100;
            } else if(dices[i] == 6) {
                diceValues[i] = 60;
            } else {
                diceValues[i] = dices[i];
            }
        }
        return diceValues;
    }

    render() {
      return (
        <View style={styles.mainContainer}>
            <LinearGradient colors={['#90D217', '#6dbe0d']} style={styles.diceContainer}>
                <View style={styles.dices}>
                    <Dice 
                        side={this.state.dices[0].side}
                        dice={0}
                        activePlayer={this.state.activePlayer} />
                    <Dice 
                        side={this.state.dices[1].side}
                        dice={1}
                        activePlayer={this.state.activePlayer} />
                    <Dice 
                        side={this.state.dices[2].side}
                        dice={2}
                        activePlayer={this.state.activePlayer} />
                </View>
            </LinearGradient>
            <View style={styles.playersContainer}>
                <Player 
                    name={this.state.players[0].name} 
                    score={this.state.players[0].score} 
                    pinstripes={this.state.players[0].pinstripes} 
                    diceNumbers={this.state.players[0].lastDiceNumbers} />
                <Player 
                    name={this.state.players[1].name} 
                    score={this.state.players[1].score} 
                    pinstripes={this.state.players[1].pinstripes}
                    diceNumbers={this.state.players[1].lastDiceNumbers} />
            </View>
            <View style={styles.buttonsContainer}>
                <Icon 
                    raised
                    name='fast-forward'
                    type='feather'
                    color='#517fa4'
                    disabled={this.state.passButton}
                    onPress={() => {this.pass(this.state.activePlayer)}} />
                <Icon 
                    raised
                    name='play'
                    type='feather'
                    color='#6FDA97'
                    size={34}
                    disabled={this.state.rollButton} 
                    onPress={() => {this.roll(this.state.activePlayer)}} />
                <Icon 
                    raised
                    name='rotate-cw'
                    type='feather'
                    color='#517fa4'
                    disabled={this.state.newRoundButton}
                    onPress={() => {this.startNewRound()}} />
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    diceContainer: {
        flex: 1,
        backgroundColor: 'green',
    },
    playersContainer: {
        flex: 1,
        backgroundColor: '#fffbe0'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
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
    },
    activePlayer: {
        backgroundColor: '#999'
    },
});

  