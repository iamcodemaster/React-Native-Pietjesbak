import React, { Component } from 'react';
import { Share, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
// Data
import players from './../players';
import dices from './../dices';

export default class EndGameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'End Game',
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
            players,
            dices,
            winnerPlayer: this.props.navigation.getParam('winner', 0)
        }
    }

    share() {
        Share.share({
          message: this.state.winnerPlayer.name + ' won this game of Pietjesbak with ' + this.state.winnerPlayer.score + " points made in the last round",
          title: 'Pietjesbak Winner ' + this.state.winnerPlayer.name
        }, {
          // Android only:
          dialogTitle: 'Pietjesbak Winner ' + this.state.winnerPlayer.name,
        })
    }

    restartGame() {
        // reset players
        let counter = 1;
        players.forEach(player => {
            player.startDice = 0;
            player.turn = false;
            player.turnEnded = false;
            player.score = 0;
            player.lastDiceNumbers = [0, 0, 0];
            player.pinstripes = 5;
            player.throws = 0;
            player.disabled = true;
            counter++;
        });

        // reset dice
        dices.forEach(die => {
            die.number = 0;
            die.side = 0;
            die.checked = true;
        });

        // return to start screen
        this.props.navigation.navigate('StartGame');
    }
  
    render() {
      return(
          <View style={ styles.container }>
              <ImageBackground source={require('../assets/img/bg.png')} style={styles.backgroundImage}>
                <View style={styles.mainWrapper}>
                    <Text style={styles.winnerName}>{this.state.winnerPlayer.name}</Text>
                    <View>
                        <Image
                            style={{width: 150, height: 200}}
                            source={require('../assets/img/cup.png')} />
                    </View>
                    <Button 
                        buttonStyle={styles.button}
                        onPress={() => this.restartGame()}
                        backgroundColor="#92D418"
                        title="Play Again" />

                    <Button 
                        buttonStyle={styles.button}
                        onPress={() => this.share()}
                        backgroundColor="#92D418"
                        title="Share It" />
                </View>
              </ImageBackground>
          </View>
      );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    mainWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 15,
        borderRadius: 100
    },
    winnerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#CF7307'
    }
});