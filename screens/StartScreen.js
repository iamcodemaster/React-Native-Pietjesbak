import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Animated, Easing } from 'react-native';

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
                        <View style={styles.elementsContainer}>
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/el.png')} />
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/el.png')} />
                            <Animated.Image
                                style={{width: 50, height: 50, transform: [{scale: this.springValue}]}}
                                source={require('../assets/img/el.png')} />
                        </View>
                        <TouchableOpacity onPress={() => this.startGame()}>
                            <Text>Hello</Text>
                        </TouchableOpacity>
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
    }
});