import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from '../ModalContext';

import { AuthContext } from '../AuthContext';


export default function App() {
    const { setModalVisible } = useContext(ModalContext);

    const pan = useState(new Animated.ValueXY())[0];
    const MAX_LEFT = 152; // 최대 left 값 설정

    const btnComeBack = setTimeout(function () {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    }, 2000);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (e, gestureState) => {
            return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderMove: (e, gestureState) => {
            let dx = gestureState.dx;
            if (dx < 0) {
                dx = 0; // dx 값이 0 미만인 경우 0으로 설정
            } else if (dx > MAX_LEFT) {
                dx = MAX_LEFT; // dx 값이 MAX_LEFT 초과인 경우 MAX_LEFT으로 설정
            }
            pan.x.setValue(dx); // dx 값을 직접 설정
        },
        onPanResponderRelease: (e, gestureState) => {
            let dx = gestureState.dx;

            if (dx > 140) {
                Animated.timing(pan, {
                    toValue: { x: 152, y: 0 },
                    duration: 150,
                    useNativeDriver: false
                }).start();
                setModalVisible(true);
                clearTimeout(btnComeBack);
            } else if (dx > 77) {
                Animated.timing(pan, {
                    toValue: { x: 152, y: 0 },
                    duration: 150,
                    useNativeDriver: false
                }).start(() => { setModalVisible(true) });
                clearTimeout(btnComeBack);
            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            }


        },
    });

    const opacity = pan.x.interpolate({
        inputRange: [0, 76],
        outputRange: [1, 0],
    });

    const { getData } = useContext(AuthContext);
    const [username, setUsername] = useState(''); // username 상태 설정

    const getUsername = async () => {
        const name = await getData('username');
        setUsername(name);
        // console.log("your real name is: " + name);
    };

    useEffect(() => {
        getUsername();
    });

    // console.log("your name is " + username);

    return (
        <View style={styles.container}>
            <View style={styles.welcomeBox}>
                <Text style={styles.mainMessage}>{username} 님, {"\n"}안녕하세요?</Text>
                <View style={styles_slider.sliderWrapper}>
                    <View style={styles_slider.slider}>
                        <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), styles_slider.sliderButton]}>
                            <Icon name="caret-forward-outline" size={32} color="black" />
                        </Animated.View>
                        <View style={styles_slider.sliderTextWrapper}>
                            <Animated.Text style={[styles_slider.sliderText, { opacity }]} >밀어서 잠금 해제</Animated.Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeBox: {
        width: 280,
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 32,
        paddingRight: 32,
    },
    mainMessage: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

const styles_slider = StyleSheet.create({
    sliderWrapper: {
        width: '100%',
        height: 48,
    },
    slider: {
        width: '100%',
        height: 48,

        backgroundColor: 'rgb(242,242,247)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
    },
    sliderButton: {
        width: 64,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,204,0)',
        borderRadius: 8,
        cursor: 'pointer',
    },
    sliderTextWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 64,
        zIndex: -99,
    },
    sliderText: {
        fontSize: 16,
        fontWeight: 'bold',
        userSelect: 'none',
    },
});