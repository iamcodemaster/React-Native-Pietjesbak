import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, TextInput } from 'react-native';

export default class EndGameScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Good Game',
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
            winnerPlayer: this.props.navigation.getParam('winner', 0)
        }
    }
  
    render() {
      return(
          <View>
              <Text>{this.state.winnerPlayer.name}</Text>
          </View>
      );
    }
}
