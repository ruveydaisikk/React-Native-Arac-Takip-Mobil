import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    Pressable
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchVehicles } from '../api/mockApi';
import StatusSummary from '../components/StatusSummary';
import { Vehicle, RootStackParamList } from '../types';
import { COLORS } from '../constants/colors';
import VehicleCard from '../components/VehicleCard';
import SkeletonCard from '../components/SkeletonCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CACHE_KEY = '@vehicle_list_cache';

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    const loadCachedVehicles = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(CACHE_KEY);
        } catch {
        }
    }, []);

    const loadVehicles = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchVehicles();
            setVehicles(data);
            setInfoMessage(null);
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch (e) {
            if (vehicles.length > 0) {
                setInfoMessage('Veriler güncellenemedi. Son kayıtlı veri gösteriliyor.');
                setError(null);
            } else {
                setError('Veriler yüklenemedi. Lütfen tekrar deneyin.');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [vehicles.length]);

    useEffect(() => {
        //  loadCachedVehicles();
        loadVehicles();
    }, [loadCachedVehicles, loadVehicles]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadVehicles();
    }, [loadVehicles]);

    const initialLoad = loading && vehicles.length === 0;

    if (initialLoad) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Araç Takip</Text>
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonCard key={i} />
                ))}
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadVehicles}>
                    <Text style={styles.retryText}>Tekrar Dene</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate('Detail', { vehicle: item })}
                    >
                        <VehicleCard vehicle={item} />
                    </Pressable>
                )}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Araç Takip</Text>
                        <StatusSummary vehicles={vehicles} />
                        {infoMessage ? (
                            <Text style={styles.infoText}>{infoMessage}</Text>
                        ) : null}
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.text}
                    />
                }
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Gösterilecek araç bulunamadı.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
        paddingTop: 60,
    },
    list: {
        paddingBottom: 32,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    infoText: {
        color: COLORS.textSecondary,
        fontSize: 13,
        paddingHorizontal: 6,
        marginTop: 8,
    },
    centered: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 32,
    },
    errorText: {
        color: COLORS.arızalı,
        fontSize: 15,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: COLORS.card,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    retryText: {
        color: COLORS.text,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 32,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 15,
    },
});