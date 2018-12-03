import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView } from 'react-native';
import Dice from '../components/DiceComponent';
import players from './../players';

class Player extends Component {
  render() {
    return (
        <View>
          <Text>Name: {this.props.name}</Text>
          <Text>Score: {this.props.score}</Text>
          <Text>Pinstripes: {this.props.pinstripes}</Text>
        </View>
    );
  }
}

export default class GameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Pietjesbak',
    };

    constructor(props) {
        super(props);

        this.state = {
            players: players
        };
    }

    toggleKeepDice(player, dice) {
        let actualPlayer;
        if(player == 'playerOne') {
            actualPlayer = players.playerOne;
            if(dice == 'firstDice') {
                actualPlayer.firstDice.keepTheDice = !actualPlayer.firstDice.keepTheDice;
            } else if(dice == 'secondDice') {
                actualPlayer.secondDice.keepTheDice = !actualPlayer.secondDice.keepTheDice;
            } else if(dice == 'thirdDice') {
                actualPlayer.thirdDice.keepTheDice = !actualPlayer.thirdDice.keepTheDice;
            }
            players.playerOne = actualPlayer;
        }

        if(player == 'playerTwo') {
            actualPlayer = players.playerTwo;
            if(dice == 'firstDice') {
                actualPlayer.firstDice.keepTheDice = !actualPlayer.firstDice.keepTheDice;
            } else if(dice == 'secondDice') {
                actualPlayer.secondDice.keepTheDice = !actualPlayer.secondDice.keepTheDice;
            } else if(dice == 'thirdDice') {
                actualPlayer.thirdDice.keepTheDice = !actualPlayer.thirdDice.keepTheDice;
            }
            players.playerTwo = actualPlayer;
        }

        this.setState({
            players: players
        })
    }

    rollTheDice(player) {
        if(player == 'playerOne') {
            if(!(players.playerOne.throws < 1)) {
                if(players.playerOne.firstDice.keepTheDice == false) {
                    players.playerOne.firstDice.number = Math.floor(Math.random() * 6) + 1;
                }
                if(players.playerOne.secondDice.keepTheDice == false) {
                    players.playerOne.secondDice.number = Math.floor(Math.random() * 6) + 1;
                }
                if(players.playerOne.thirdDice.keepTheDice == false) {
                    players.playerOne.thirdDice.number = Math.floor(Math.random() * 6) + 1;
                }
            } 
            if(players.playerOne.throws == 1) {
                players.playerOne.disabled = true;
            }
            players.playerOne.throws--;
        } else if(player == 'playerTwo') {
            if(!(players.playerTwo.throws < 1)) {
                if(players.playerTwo.firstDice.keepTheDice == false) {
                    players.playerTwo.firstDice.number = Math.floor(Math.random() * 6) + 1;
                }
                if(players.playerTwo.secondDice.keepTheDice == false) {
                    players.playerTwo.secondDice.number = Math.floor(Math.random() * 6) + 1;
                }
                if(players.playerTwo.thirdDice.keepTheDice == false) {
                    players.playerTwo.thirdDice.number = Math.floor(Math.random() * 6) + 1;
                }
            } 
            if(players.playerTwo.throws == 1) {
                players.playerTwo.disabled = true;
            }
            players.playerTwo.throws--;
        }

        if(players.playerTwo.disabled == true && players.playerOne.disabled == true) {
            this.countScore();
        }

        this.setState({
            players: players
        })
    }

    isGameOver() {
        if (players.playerOne.pinstripes <= 0 || players.playerTwo.pinstripes <= 0) {
            alert("Game Over");
        }
    }

    checkResults(first, second) {
        if(first == second) {
            // throw one more dice

        } else if(String(first).indexOf('zand') != -1 || String(second).indexOf('zand') != -1){
            if(String(first).indexOf('zand') == -1 && String(second).indexOf('zand') != -1) {
                players.playerTwo.pinstripes = players.playerTwo.pinstripes - 3;
            } else if(String(second).indexOf('zand') == -1 && String(first).indexOf('zand') != -1) {
                players.playerOne.pinstripes = players.playerOne.pinstripes - 3;
            } else {
                first = String(first).replace('zand-','');
                first = parseInt(first);
    
                second = String(second).replace('zand-','');
                second = parseInt(second);
                if(first > second) {
                    players.playerOne.pinstripes = players.playerOne.pinstripes - 3;
                } else {
                    players.playerTwo.pinstripes = players.playerTwo.pinstripes - 3;
                }
            }
        } else {
            if(first > second) {
                players.playerOne.pinstripes = players.playerOne.pinstripes - 1;
            } else {
                players.playerTwo.pinstripes = players.playerTwo.pinstripes - 1;
            }
        }
        this.isGameOver();
        players.playerTwo.disabled = false; 
        players.playerTwo.throws = 3;
        players.playerOne.disabled = false;
        players.playerOne.throws = 3;
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
                <Player name={this.state.players.playerOne.name} score={this.state.players.playerOne.score} pinstripes={this.state.players.playerOne.pinstripes} />
                <View style={styles.dices}>
                    <Dice number={this.state.players.playerOne.firstDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "firstDice")}}
                        value={this.state.players.playerOne.firstDice.keepTheDice}
                        disabled={this.state.players.playerOne.disabled}
                    />
                    <Dice number={this.state.players.playerOne.secondDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "secondDice")}}
                        value={this.state.players.playerOne.secondDice.keepTheDice}
                        disabled={this.state.players.playerOne.disabled}
                    />
                    <Dice number={this.state.players.playerOne.thirdDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerOne", "thirdDice")}}
                        value={this.state.players.playerOne.thirdDice.keepTheDice}
                        disabled={this.state.players.playerOne.disabled}
                    />
                </View>
                <Button title="Roll" onPress={() => {this.rollTheDice("playerOne")}} />
            </View>

            <View style={styles.container}>
                <Player name={this.state.players.playerTwo.name} score={this.state.players.playerTwo.score} pinstripes={this.state.players.playerTwo.pinstripes} />
                <View style={styles.dices}>
                    <Dice number={this.state.players.playerTwo.firstDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "firstDice")}}
                        value={this.state.players.playerTwo.firstDice.keepTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                    <Dice number={this.state.players.playerTwo.secondDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "secondDice")}}
                        value={this.state.players.playerTwo.secondDice.keepTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                    <Dice number={this.state.players.playerTwo.thirdDice.number} />
                    <Switch
                        onValueChange={() => {this.toggleKeepDice("playerTwo", "thirdDice")}}
                        value={this.state.players.playerTwo.thirdDice.keepTheDice}
                        disabled={this.state.players.playerTwo.disabled}
                    />
                </View>
                <Button title="Roll" onPress={() => {this.rollTheDice("playerTwo")}} />
            </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dices: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

  