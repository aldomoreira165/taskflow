import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, ProgressBar } from 'react-native-paper';
import { Project } from '../../../domain/entities/project';
import { globalColors } from '../../theme/global.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    project: Project;
}

const STATUS: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: 'Pendiente', color: '#374151', bg: '#E5E7EB' },
    2: { label: 'En progreso', color: '#6D28D9', bg: '#EDE9FE' },
    3: { label: 'Completado', color: '#065F46', bg: '#D1FAE5' },
};

const getStatus = (estadoID: number) =>
    STATUS[estadoID ?? 1];

const formatDate = (dateProject: string) => {
    if (!dateProject) return '—';
    const date = new Date(dateProject);
    return date.toLocaleDateString();
};

export const ProjectCard = ({ project }: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const statusProject = getStatus(project.EstadoID);

    const progress = 0.5;

    return (
        <Card
            mode="elevated"
            style={styles.card}
            onPress={() => navigation.navigate('ProjectScreen', { projectID: project.ProyectoID })}
        >
            <Card.Content style={{ gap: 8 }}>
                <Text variant="titleMedium" style={styles.title}>
                    {project.Nombre}
                </Text>

                <View style={styles.row}>

                    <View style={styles.metaLeft}>
                        <Text variant="labelSmall" style={styles.metaLabel}>
                            Fecha entrega
                        </Text>
                        <Text variant="bodyMedium" style={styles.metaText}>
                            {formatDate((project as any).FechaEntrega)}
                        </Text>
                    </View>

                    <Chip
                        compact
                        style={[styles.statusChip, { backgroundColor: statusProject.bg }]}
                        textStyle={{ color: statusProject.color, fontWeight: '600' }}
                    >
                        {statusProject.label}
                    </Chip>
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
    resp: {
        color: '#6B7280',
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
