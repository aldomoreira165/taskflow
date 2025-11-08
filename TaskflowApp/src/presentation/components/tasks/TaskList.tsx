import React from 'react';
import { FlatList, View, Text, StyleProp, ViewStyle } from 'react-native';
import { TaskCard } from './TaskCard';
import { Task } from '../../../domain/entities/task';
import { CustomIcon } from '../ui/CustomIcon';
import { globalStyles } from '../../theme/global.styles';

interface Props {
    tasks: Task[];
    isLoading?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const EmptyTasks = () => (
    <View
        style={globalStyles.cardEmptyList}
        pointerEvents="none"
    >
        <View style={globalStyles.iconEmptyList}>
            <CustomIcon name="list-outline" white />
        </View>

        <Text style={{ fontSize: 18, fontWeight: '600', color: '#666' }}>
            Aún no hay tareas
        </Text>
        <Text style={{ textAlign: 'center', color: '#888' }}>
            Crea tu primera tarea con el botón “Nueva tarea”.
        </Text>
    </View>
);

export const TaskList: React.FC<Props> = ({
    tasks,
    isLoading,
    contentContainerStyle,
    ...flatListProps
}) => {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(t, i) => String(t.TareaID ?? i)}
            renderItem={({ item }) => <TaskCard task={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            contentContainerStyle={[{ paddingVertical: 8, flexGrow: 1 }, contentContainerStyle]}
            ListEmptyComponent={!isLoading ? <EmptyTasks /> : null}
            {...flatListProps}
        />
    );
};
