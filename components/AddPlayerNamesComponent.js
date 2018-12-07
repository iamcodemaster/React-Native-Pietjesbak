import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

export default class AddPlayerNamesComponent extends Component {
    state = {
        playerOneName: '',
        playerTwoName: ''
    };

    getHandler = key => val => {
        this.setState({ [key]: val });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <FormLabel>Player 1</FormLabel>
                <FormInput 
                    value={this.state.playerOneName}
                    onChangeText={this.getHandler('playerOneName')}
                    placeholder="Name Player 1" />
                <FormLabel>Player 2</FormLabel>
                <FormInput 
                    value={this.state.playerTwoName}
                    onChangeText={this.getHandler('playerTwoName')}
                    placeholder="Name Player 2" />
                <Button 
                    buttonStyle={styles.button}
                    backgroundColor="#0B60FF"
                    title="Start the game"
                    onPress={this.handleSubmit} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});