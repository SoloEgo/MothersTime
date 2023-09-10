import React from 'react';
import { View } from 'react-native';
import { animatedClockStyles } from '../assets/styles/animatedClockStyles';
import Animated, {
    Easing,
    Keyframe
} from 'react-native-reanimated';
import { mainStyles } from '../assets/styles/mainStyles';

const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function AnimatedClock(props) {

    const enteringAnimation = new Keyframe({
        0: {
            originX: 0,
            transform: [{ rotate: '0deg' }],
        },
        20: {
            originX: 0,
            transform: [{ rotate: '90deg' }],
        },
        25: {
            originX: 0,
            transform: [{ rotate: '90deg' }],

        },
        45: {
            originX: 0,
            transform: [{ rotate: '180deg' }],
        },
        50: {
            originX: 0,
            transform: [{ rotate: '180deg' }],
        },
        70: {
            originX: 0,
            transform: [{ rotate: '270deg' }],
        },
        75: {
            originX: 0,
            transform: [{ rotate: '270deg' }],
        },
        95: {
            originX: 0,
            transform: [{ rotate: '360deg' }],
            easing: Easing.quad,
        },
        100: {
            originX: 0,
            transform: [{ rotate: '360deg' }],
            easing: Easing.quad,
        },
    }).duration(2000);

    return (
        <View style={animatedClockStyles.wrapper}>
            <View style={animatedClockStyles.clockCircle}>
                <Animated.View style={[animatedClockStyles.arrow]} entering={enteringAnimation} />
            </View>
        </View>
    )
}