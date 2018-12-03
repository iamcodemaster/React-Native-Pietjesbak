import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, TextInput } from 'react-native';

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
                <TextInput
                    style={styles.input}
                    value={this.state.playerOneName}
                    onChangeText={this.getHandler('playerOneName')}
                    placeholder="Name player 1"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.playerTwoName}
                    onChangeText={this.getHandler('playerTwoName')}
                    placeholder="Name player 2"
                />
                <Button
                    title="Start the game"
                    onPress={this.handleSubmit}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});