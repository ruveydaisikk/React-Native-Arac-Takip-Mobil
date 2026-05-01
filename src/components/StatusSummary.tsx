import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Vehicle } from '../types';
import { COLORS } from '../constants/colors';

interface Props {
    vehicles: Vehicle[];
}

export default function StatusSummary({ vehicles }: Props) {
    const aktif = vehicles.filter((v) => v.status === 'aktif').length;
    const bakımda = vehicles.filter((v) => v.status === 'bakımda').length;
    const arızalı = vehicles.filter((v) => v.status === 'arızalı').length;
    const toplam = vehicles.length;

    return (
        <View style={styles.container}>
            <View style={[styles.card, { borderColor: '#888888' }]}>
                <Text style={[styles.count, { color: COLORS.text }]}>{toplam}</Text>
                <Text style={styles.label}>Toplam</Text>
            </View>
            <View style={[styles.card, { borderColor: COLORS.aktif }]}>
                <Text style={[styles.count, { color: COLORS.aktif }]}>{aktif}</Text>
                <Text style={styles.label}>Aktif</Text>
            </View>
            <View style={[styles.card, { borderColor: COLORS.bakımda }]}>
                <Text style={[styles.count, { color: COLORS.bakımda }]}>{bakımda}</Text>
                <Text style={styles.label}>Bakımda</Text>
            </View>
            <View style={[styles.card, { borderColor: COLORS.arızalı }]}>
                <Text style={[styles.count, { color: COLORS.arızalı }]}>{arızalı}</Text>
                <Text style={styles.label}>Arızalı</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 12,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    count: {
        fontSize: 22,
        fontWeight: '700',
    },
    label: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
});