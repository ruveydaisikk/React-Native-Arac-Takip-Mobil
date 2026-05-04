import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';
import { Vehicle } from '../types';
import { COLORS } from '../constants/colors';
import StatusBadge from './StatusBadge';

interface Props {
    vehicle: Vehicle;
    onPress?: () => void;
}

export default function VehicleCard({ vehicle, onPress }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <View style={styles.row}>
                    <Text style={styles.plate}>{vehicle.plate}</Text>
                    <StatusBadge status={vehicle.status} />
                </View>
                <Text style={styles.model}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Sürücü</Text>
                        <Text style={styles.infoValue}>{vehicle.driver}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Son Servis</Text>
                        <Text style={styles.infoValue}>{vehicle.lastService}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>KM</Text>
                        <Text style={styles.infoValue}>{vehicle.km.toLocaleString('tr-TR')}</Text>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 6,
        gap: 10,
        borderWidth: 1,
        borderColor: '#3a3a3a',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    plate: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        letterSpacing: 1,
    },
    model: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },
    infoItem: {
        gap: 2,
    },
    infoLabel: {
        fontSize: 11,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: '500',
    },
});