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
                <FormLabel labelStyle={styles.label}>Player 1</FormLabel>
                <FormInput 
                    inputStyle={styles.input}
                    value={this.state.playerOneName}
                    onChangeText={this.getHandler('playerOneName')}
                    placeholder="Name Player 1" />
                <FormLabel labelStyle={styles.label}>Player 2</FormLabel>
                <FormInput 
                    inputStyle={styles.input}
                    value={this.state.playerTwoName}
                    onChangeText={this.getHandler('playerTwoName')}
                    placeholder="Name Player 2" />
                <Button 
                    buttonStyle={styles.button}
                    backgroundColor="#92D418"
                    title="Let's get started"
                    onPress={this.handleSubmit} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        borderRadius: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#fffbe0',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: '#CF7307'
    },
    input: {
        color: '#ecad63',
        borderBottomColor: '#EED498',
    }
});