import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Vehicle, VehicleStatus } from '../types';
import { COLORS } from '../constants/colors';

type FilterType = 'hepsi' | VehicleStatus;

interface Props {
    vehicles: Vehicle[];
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export default function StatusSummary({ vehicles, activeFilter, onFilterChange }: Props) {
    const aktif = vehicles.filter((v) => v.status === 'aktif').length;
    const bakımda = vehicles.filter((v) => v.status === 'bakımda').length;
    const arızalı = vehicles.filter((v) => v.status === 'arızalı').length;
    const toplam = vehicles.length;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.card, { borderColor: '#555555' }, activeFilter === 'hepsi' && styles.activeCard]}
                onPress={() => onFilterChange('hepsi')}
            >
                <Text style={[styles.count, { color: COLORS.text }]}>{toplam}</Text>
                <Text style={styles.label}>Toplam</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { borderColor: COLORS.aktif }, activeFilter === 'aktif' && styles.activeCard]}
                onPress={() => onFilterChange('aktif')}
            >
                <Text style={[styles.count, { color: COLORS.aktif }]}>{aktif}</Text>
                <Text style={styles.label}>Aktif</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { borderColor: COLORS.bakımda }, activeFilter === 'bakımda' && styles.activeCard]}
                onPress={() => onFilterChange('bakımda')}
            >
                <Text style={[styles.count, { color: COLORS.bakımda }]}>{bakımda}</Text>
                <Text style={styles.label}>Bakımda</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { borderColor: COLORS.arızalı }, activeFilter === 'arızalı' && styles.activeCard]}
                onPress={() => onFilterChange('arızalı')}
            >
                <Text style={[styles.count, { color: COLORS.arızalı }]}>{arızalı}</Text>
                <Text style={styles.label}>Arızalı</Text>
            </TouchableOpacity>
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
        opacity: 0.6,
    },
    activeCard: {
        opacity: 1,
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