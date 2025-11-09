import React from 'react';
import { FlatList, View, StyleProp, ViewStyle } from 'react-native';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../../domain/entities/project';
import { EmptyList } from '../ui/EmptyList';
import { Text } from 'react-native-paper';

interface Props {
  projects: Project[];
  isLoading?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ProjectList: React.FC<Props> = ({
  projects,
  isLoading,
  contentContainerStyle,
  ...flatListProps
}) => {
  return (
    <>
      <FlatList
        data={projects}
        keyExtractor={(p, i) => String((p as any).ProyectoID ?? i)}
        renderItem={({ item }) => <ProjectCard project={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        contentContainerStyle={[{ paddingVertical: 8, flexGrow: 1 }, contentContainerStyle]}
        ListEmptyComponent={!isLoading ? <EmptyList title='Aún no hay proyectos' subTitle='Crea tu primer proyecto con el botón “Nuevo proyecto”.' icon='folder-open-outline' /> : null}
        {...flatListProps}
      />
    </>
  );
};
