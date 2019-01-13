import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// Custom Components
import Die from '../components/DieComponent';
import Player from '../components/PlayerComponent';
// Data
import players from './../players';
import dice from '../dice';

export default class GameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Pietjesbak',
        headerLeft: null,
        headerTintColor: '#CF7307',
        headerStyle: {
            backgroundColor: '#fffbe0'
        },
        headerTitleStyle: {
            alignSelf: 'center',
            color: '#CF7307'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            // main states
            players,
            dice,
            // active player
            activePlayer: this.props.navigation.getParam('starter', 0),
            // game rounds
            totalRoundThrows: 3,
            finishThrow: false,
            finishRound: false,
            roundWinner: 0,
            // game buttons 
            rollButton: false,
            passButton: true,
            newRoundButton: true
        };
    }


    // Shake Effect for the dice
    shakeEffect = (die) => {
        if(die == 0) {
            this.refs.shakeDieIndex0.shake(800);
        } else if(die == 1) {
            this.refs.shakeDieIndex1.shake(800);
        } else {
            this.refs.shakeDieIndex2.shake(800);
        }
    }

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
        // reset the dice for the next player
        this.resetDice();
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
        // reset the dice for the next player
        this.resetDice();
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

    resetDice() {
        // set die numbers on 0 and set checked on true for all dice
        dice.forEach(die => {
            die.number = 0;
            // die.side = 0;
            die.checked = true;
        });
        // set new states
        this.setState({
            dice: dice
        })
    }

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
            this.resetDice();
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

    finishRound() {
        // set new states
        this.setState({
            rollButton: true,
            passButton: true,
            newRoundButton: false
        })
    }

    roll(activePlayer) {
        // change the number of the active dice
        for (let i = 0; i < dice.length; i++) {
            if(dice[i].checked == true) {
                let randomNumber = Math.floor(Math.random() * 6) + 1;
                dice[i].number = randomNumber;
                dice[i].side = dice[i].number - 1;
                this.shakeEffect(i);
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
            // reset dice for the next player
            this.resetDice();
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
            dice: dice,
            players: players
        })
    }

    isGameOver() {
        let winner;
        players.forEach(player => {
            if(player.pinstripes <= 0) {
                winner = player;
                this.props.navigation.navigate('EndGame', {
                    winner: winner,
                });
            }
        });
    }

    // TO DO
    checkResults() {
        let first = this.state.players[0].score;
        let second = this.state.players[1].score;
        let roundWinner;
        if(first == second) {
            // throw one more die
            // this.props.navigation.navigate('Even');
            score = [0, 0];
            Alert.alert(
                'Even Score - ' + this.state.players[0].name,
                'Roll the die to decide the round winner',
                [
                    {
                        text: 'Roll', onPress: () => {
                            score.push(Math.floor(Math.random() * 6) + 1);
                            if(score[0] > score[1]) {
                                roundWinner = 0;
                                players[0].pinstripes = players[0].pinstripes - 1;
                            } else {
                                roundWinner = 1
                                players[1].pinstripes = players[1].pinstripes - 1;
                            }
                            this.setState({
                                players: players,
                                roundWinner: roundWinner
                            })
                            this.isGameOver();
                        }
                    }
                ],
                { cancelable: false }
            )
            Alert.alert(
                'Even Score - ' + this.state.players[1].name,
                'Roll the die to decide the round winner',
                [
                    {
                        text: 'Roll', onPress: () => {
                            score.push(Math.floor(Math.random() * 6) + 1);
                        }
                    }
                ],
                { cancelable: false }
            )
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

        this.isGameOver();
    }

    countScore() {
        // create array with dice numbers
        let diceArray = [];
        dice.forEach(die => {
            diceArray.push(die.number);
        });

        // Check the dice sides
        if(this.isFullAses(diceArray)) {
            // win direct - all lines out
            // set pinstripes on 0
            players[this.state.activePlayer].pinstripes = 0;
            // set new state
            this.setState({
                players: players
            })
            // game over
            this.isGameOver();
        } else if(this.isSoixanteNeuf(diceArray)) {
            // 3 lines out
            players[this.state.activePlayer].score = 69;
        } else if(this.isZand(diceArray)) {
            // 2 lines out
            for (let i = 2; i < 7; i++) {
                if(diceArray.includes(i)) {
                    players[this.state.activePlayer].score = "zand-"+i;
                }
            }
        } else {
            // 1 line out
            let score = this.isSomethingElse(diceArray);
            players[this.state.activePlayer].score = score[0] + score[1] + score[2];
        }

        // add dice numbers to player last dice numbers
        players[this.state.activePlayer].lastDiceNumbers = [
            dice[0].number,
            dice[1].number,
            dice[2].number,
        ]

        // set new state
        this.setState({
            players: players
        })
    }

    isFullAses(dice) {
        // if all dices are aces return true
        if(dice[0] == 1 && dice[1] == 1 && dice[2] == 1) {
            return true;
        }
        return false;
    }

    isSoixanteNeuf(dice) {
        let includeSix = dice.includes(6);
        let includeFive = dice.includes(5);
        let includeFour = dice.includes(4);
        // if 6, 5, 4 icluded return true
        if(includeSix == true && includeFive == true && includeFour == true) {
            return true;
        }
        return false;
    }

    isZand(dice) {
        // if all the same number return true
        if(dice[0] == dice[1] && dice[1] == dice[2]) {
            return true;
        }
        return false;
    }

    isSeven(dice) {
        if(dice.includes(2, 2, 3)) {
            return true;
        }
        return false;
    }

    isSomethingElse(dice) {
        var diceValues = [];
        for (let i = 0; i < dice.length; i++) {
            if(dice[i] == 1) {
                diceValues[i] = 100;
            } else if(dice[i] == 6) {
                diceValues[i] = 60;
            } else {
                diceValues[i] = dice[i];
            }
        }
        return diceValues;
    }

    render() {
      return (
        <View style={styles.mainContainer}>
            <LinearGradient colors={['#90D217', '#6dbe0d']} style={styles.diceContainer}>
                <View style={styles.dice}>
                    <Animatable.View ref="shakeDieIndex0">
                        <Die 
                            side={this.state.dice[0].side}
                            die={0}
                            activePlayer={this.state.activePlayer} />
                    </Animatable.View>
                    <Animatable.View ref="shakeDieIndex1">
                        <Die 
                            side={this.state.dice[1].side}
                            die={1}
                            activePlayer={this.state.activePlayer} />
                    </Animatable.View>
                    <Animatable.View ref="shakeDieIndex2">
                        <Die 
                            side={this.state.dice[2].side}
                            die={2}
                            activePlayer={this.state.activePlayer} />
                    </Animatable.View>
                </View>
            </LinearGradient>
            <View style={styles.playersContainer}>
                <Player 
                    style={
                        this.state.activePlayer == 0
                        ? styles.activePlayer
                        : styles.inactivePlayer
                    }
                    name={this.state.players[0].name} 
                    score={this.state.players[0].score} 
                    pinstripes={this.state.players[0].pinstripes} 
                    diceNumbers={this.state.players[0].lastDiceNumbers} 
                    avatar={this.state.players[0].avatar} />
                <Player 
                    style={
                        this.state.activePlayer == 1
                        ? styles.activePlayer
                        : styles.inactivePlayer
                    }
                    name={this.state.players[1].name} 
                    score={this.state.players[1].score} 
                    pinstripes={this.state.players[1].pinstripes}
                    diceNumbers={this.state.players[1].lastDiceNumbers} 
                    avatar={this.state.players[1].avatar} />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={ this.state.passButton ? styles.deactivate : styles.activate }>
                    <Icon 
                        raised
                        containerStyle={{backgroundColor: '#F892AC'}}
                        name='fast-forward'
                        type='feather'
                        color='#F4F2ED'
                        disabled={this.state.passButton}
                        onPress={() => {this.pass(this.state.activePlayer)}} />
                </View>
                <View style={ this.state.rollButton ? styles.deactivate : styles.activate }>
                    <Icon 
                        raised
                        containerStyle={{backgroundColor: '#92D418'}}
                        name='play'
                        type='feather'
                        color='#F4F2ED'
                        size={34}
                        disabled={this.state.rollButton} 
                        onPress={() => {this.roll(this.state.activePlayer)}} />
                </View>
                <View style={ this.state.newRoundButton ? styles.deactivate : styles.activate }>
                    <Icon 
                        raised
                        containerStyle={{backgroundColor: '#54C9F4'}}
                        name='rotate-cw'
                        type='feather'
                        color='#F4F2ED'
                        disabled={this.state.newRoundButton}
                        onPress={() => {this.startNewRound()}} />
                </View>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fffbe0',
    },
    diceContainer: {
        flex: 1
    },
    playersContainer: {
        flex: 1,
        // backgroundColor: '#fffbe0'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
        // backgroundColor: '#fffbe0'
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
    dice: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activePlayer: {
        backgroundColor: '#f9f2c5'
    },
    inactivePlayer: {
        backgroundColor: 'transparent'
    },
    activate: {
        opacity: 1
    },
    deactivate: {
        opacity: 0.3
    }
});

  