import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, ProgressBar } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Task } from '../../../domain/entities/task';
import { globalColors } from '../../theme/global.styles';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    task: Task;
}

const STATUS: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: 'Pendiente', color: '#374151', bg: '#E5E7EB' },
    2: { label: 'En progreso', color: '#6D28D9', bg: '#EDE9FE' },
    3: { label: 'Bloqueada', color: '#92400E', bg: '#FEF3C7' },
    4: { label: 'Completada', color: '#065F46', bg: '#D1FAE5' },
    5: { label: 'Archivada', color: '#374151', bg: '#E5E7EB' },
};

const PRIORITY: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: 'Baja', color: '#065F46', bg: '#D1FAE5' },
    2: { label: 'Media', color: '#92400E', bg: '#FEF3C7' },
    3: { label: 'Alta', color: '#991B1B', bg: '#FEE2E2' },
    4: { label: 'Crítica', color: '#6D28D9', bg: '#EDE9FE' },
};

const getStatus = (estadoID?: number) =>
    STATUS[estadoID ?? 1] ?? STATUS[1];

const getPriority = (prioridadID?: number) =>
    PRIORITY[prioridadID ?? 1] ?? PRIORITY[1];

const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
};


const calcProgress = (inicio?: string | Date, entrega?: string | Date, estadoID?: number) => {
    const start = inicio ? new Date(inicio).getTime() : NaN;
    const end = entrega ? new Date(entrega).getTime() : NaN;
    const now = Date.now();

    if (!isNaN(start) && !isNaN(end) && end > start) {
        const pct = (now - start) / (end - start);
        return Math.max(0, Math.min(1, pct));
    }

    if (estadoID === 4) return 1;
    if (estadoID === 2) return 0.6;
    return 0.15;
};

export const TaskCard = ({ task }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const statusTask = getStatus(task.EstadoID);
    const priorityTask = getPriority(task.PrioridadID);

    const progress = useMemo(
        () => calcProgress(task.FechaInicio as any, task.FechaEntrega as any, task.EstadoID),
        [task.FechaInicio, task.FechaEntrega, task.EstadoID]
    );

    return (
        <Card
            mode="elevated"
            style={styles.card}
            onPress={() => navigation.navigate('TaskScreen', { taskID: task.TareaID })}
        >
            <Card.Content style={{ gap: 8 }}>
                <Text variant="titleMedium" style={styles.title}>
                    {task.Nombre}
                </Text>

                {!!task.Descripcion && (
                    <Text variant="bodySmall" style={styles.desc}>
                        {String(task.Descripcion).length > 140
                            ? String(task.Descripcion).slice(0, 140) + '…'
                            : task.Descripcion}
                    </Text>
                )}

                <View style={styles.row}>
                    <View style={styles.metaLeft}>
                        <Text variant="labelSmall" style={styles.metaLabel}>
                            Fecha entrega
                        </Text>
                        <Text variant="bodyMedium" style={styles.metaText}>
                            {formatDate(task.FechaEntrega as any)}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Chip
                            compact
                            style={[styles.statusChip, { backgroundColor: priorityTask.bg }]}
                            textStyle={{ color: priorityTask.color, fontWeight: '600' }}
                        >
                            {priorityTask.label}
                        </Chip>

                        <Chip
                            compact
                            style={[styles.statusChip, { backgroundColor: statusTask.bg }]}
                            textStyle={{ color: statusTask.color, fontWeight: '600' }}
                        >
                            {statusTask.label}
                        </Chip>
                    </View>
                </View>

                <View style={{ marginTop: 6 }}>
                    <ProgressBar
                        progress={progress}
                        style={styles.progress}
                        color={globalColors.primary}
                    />
                    <Text variant="labelSmall" style={styles.progressText}>
                        {Math.round(progress * 100)}%
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 2,
    },
    title: {
        fontWeight: '700',
    },
    desc: {
        color: '#4B5563',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
    },
    metaLeft: {
        flexDirection: 'column',
    },
    metaLabel: {
        color: '#6B7280',
    },
    metaText: {
        color: '#111827',
        fontWeight: '500',
    },
    statusChip: {
        borderRadius: 999,
    },
    progress: {
        height: 8,
        borderRadius: 999,
        backgroundColor: '#F3F4F6',
    },
    progressText: {
        marginTop: 4,
        color: '#6B7280',
    },
});
