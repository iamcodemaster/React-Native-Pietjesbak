import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Animated, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default class StartScreen extends Component {
    constructor () {
        super()
        this.springValue = new Animated.Value(0.3)
    }

    componentDidMount() {
        this.spring()
    }

    spring() {
        this.springValue.setValue(0.3)
        
        Animated.spring(
          this.springValue,
            {
                toValue: 1,
                friction: 0.5
            }
        ).start()
    }

    static navigationOptions = {
        header: null,
    };

    startGame() {
        this.props.navigation.navigate('AddPlayerNames');
    };
  
    render() {
        return (
            <View style={ styles.container }>
                <ImageBackground source={require('../assets/img/bg.png')} style={styles.backgroundImage}>
                    <View style={styles.mainWrapper}>
                        <View>
                            <Image
                                style={{width: 250, height: 50}}
                                source={require('../assets/img/logo.png')} />
                        </View>
                        <View style={styles.elementsContainer}>
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/die-1.png')} />
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/die-2.png')} />
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/die-3.png')} />
                        </View>
                        <Button 
                            buttonStyle={styles.button}
                            onPress={() => this.startGame()}
                            backgroundColor="#92D418"
                            title="Let's Go!" />
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
    elementsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 40,
        borderRadius: 100
    },
});