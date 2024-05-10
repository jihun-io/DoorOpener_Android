import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from '../ModalContext';

import Opener from './Opener';

export default function OpenerModal() {
    const { modalVisible, setModalVisible } = useContext(ModalContext);
    const backgroundColor = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            backgroundColor, {
                toValue: modalVisible ? 1 : 0,
                duration: 500,
                useNativeDriver: false
            }
        ).start();
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false
        }).start();
    }, [modalVisible]);

    const backgroundColorInterpolate = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
    });

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dy: pan.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                if (pan.y._value > 50) {
                    setModalVisible(false);
                }
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: false
                }).start();
            }
        })
    ).current;

    return (
        <Animated.View style={{ backgroundColor: backgroundColorInterpolate, width: '100%', height: '100%', position: 'absolute', zIndex: 0, pointerEvents: 'none' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles_opener.modalWrapper, { transform: [{ translateY: pan.y }] }]}
                >
                    <View style={{
                        width: '100%',
                        height: '80%',
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 24,
                        alignItems: 'center',
                    }}>
                        <View style={styles_opener.modalGrabber}>
                            <Icon name="reorder-three-outline" size={32} color="gray" />
                        </View>
                        <View style={styles_opener.modalContent}>
                            <Opener />
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        </Animated.View>
    );
}

const styles_opener = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#00000080',
    },
    modalGrabber: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        // backgroundColor: '#FF0000',
        marginTop: -20,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00FF00'
    },
});
