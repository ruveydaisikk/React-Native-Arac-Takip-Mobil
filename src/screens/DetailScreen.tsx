import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../constants/colors';
import StatusBadge from '../components/StatusBadge';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
    const { vehicle } = route.params;

    const formatDate = (dateStr: string) => {
        const months = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        const [year, month, day] = dateStr.split('-');
        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
    };

    const statusDescription: Record<string, string> = {
        aktif: 'Araç aktif olarak kullanımda ve servis için hazır.',
        bakımda: 'Araç şu anda bakım sürecinde, kısa süre içinde hazır olacak.',
        arızalı: 'Araç arızalı durumda, servis müdahalesi gerekiyor.',
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Geri</Text>
            </TouchableOpacity>

            <View style={styles.headerCard}>
                <Text style={styles.plate}>{vehicle.plate}</Text>
                <StatusBadge status={vehicle.status} />
            </View>

            <Text style={styles.model}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text>

            <View style={styles.descriptionCard}>
                <Text style={styles.descriptionText}>{statusDescription[vehicle.status]}</Text>
            </View>

            <View style={styles.infoCard}>
                <InfoRow label="Sürücü" value={vehicle.driver} />
                <InfoRow label="Marka" value={vehicle.brand} />
                <InfoRow label="Model" value={vehicle.model} />
                <InfoRow label="Yıl" value={String(vehicle.year)} />
                <InfoRow label="Plaka" value={vehicle.plate} />
                <InfoRow label="KM" value={vehicle.km.toLocaleString('tr-TR')} />
                <InfoRow label="Son Servis" value={formatDate(vehicle.lastService)} isLast />
            </View>

        </ScrollView>
    );
}

function InfoRow({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
    return (
        <View style={[styles.row, isLast && { borderBottomWidth: 0 }]}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 20,
        paddingTop: 60,
        gap: 14,
    },
    backButton: {
        marginBottom: 4,
    },
    backText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    plate: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.text,
        letterSpacing: 1.5,
    },
    model: {
        fontSize: 15,
        color: COLORS.textSecondary,
        paddingHorizontal: 4,
    },
    descriptionCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    descriptionText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 22,
    },
    infoCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    rowLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    rowValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
});