import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function SkeletonCard() {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.card, { opacity }]}>
            <View style={styles.row}>
                <View style={styles.platePlaceholder} />
                <View style={styles.badgePlaceholder} />
            </View>
            <View style={styles.modelPlaceholder} />
            <View style={styles.row}>
                <View style={styles.smallPlaceholder} />
                <View style={styles.smallPlaceholder} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 6,
        gap: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    platePlaceholder: {
        width: 120,
        height: 20,
        borderRadius: 6,
        backgroundColor: COLORS.skeleton,
    },
    badgePlaceholder: {
        width: 70,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.skeleton,
    },
    modelPlaceholder: {
        width: '60%',
        height: 16,
        borderRadius: 6,
        backgroundColor: COLORS.skeleton,
    },
    smallPlaceholder: {
        width: '40%',
        height: 14,
        borderRadius: 6,
        backgroundColor: COLORS.skeleton,
    },
});