import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VehicleStatus } from '../types';
import { COLORS } from '../constants/colors';

interface Props {
    status: VehicleStatus;
}

const statusLabel: Record<VehicleStatus, string> = {
    aktif: 'Aktif',
    bakımda: 'Bakımda',
    arızalı: 'Arızalı',
};

const statusColor: Record<VehicleStatus, string> = {
    aktif: COLORS.aktif,
    bakımda: COLORS.bakımda,
    arızalı: COLORS.arızalı,
};

export default function StatusBadge({ status }: Props) {
    return (
        <View style={[styles.badge, { backgroundColor: statusColor[status] + '22', borderColor: statusColor[status] }]}>
            <View style={[styles.dot, { backgroundColor: statusColor[status] }]} />
            <Text style={[styles.text, { color: statusColor[status] }]}>
                {statusLabel[status]}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});