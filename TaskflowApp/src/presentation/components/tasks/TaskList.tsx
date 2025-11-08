import React from 'react';
import { FlatList, View, StyleProp, ViewStyle } from 'react-native';
import { TaskCard } from './TaskCard';
import { Task } from '../../../domain/entities/task';
import { EmptyList } from '../ui/EmptyList';

interface Props {
    tasks: Task[];
    isLoading?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

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
            ListEmptyComponent={!isLoading ? <EmptyList title='Aún no hay tareas' subTitle='Crea tu primera tarea con el botón “Nueva tarea”.' icon='list-outline' /> : null}
            {...flatListProps}
        />
    );
};
