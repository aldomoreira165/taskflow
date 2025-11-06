import React from 'react';
import { FlatList, View, Text, StyleProp, ViewStyle } from 'react-native';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../../domain/entities/project';
import { CustomIcon } from '../ui/CustomIcon';
import { globalStyles } from '../../theme/global.styles';

interface Props {
  projects: Project[];
  isLoading?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const EmptyProjects = () => (
  <View
    style={globalStyles.cardEmptyList}
    pointerEvents="none"
  >
    <View
      style={globalStyles.iconEmptyList}
    >
      <CustomIcon name="folder-open-outline" white />
    </View>

    <Text style={{ fontSize: 18, fontWeight: '600', color: '#666' }}>
      Aún no hay proyectos
    </Text>
    <Text style={{ textAlign: 'center', color: '#888' }}>
      Crea tu primer proyecto con el botón “Nuevo proyecto”.
    </Text>
  </View>
);

export const ProjectList: React.FC<Props> = ({
  projects,
  isLoading,
  contentContainerStyle,
  ...flatListProps
}) => {
  return (
    <FlatList
      data={projects}
      keyExtractor={(p, i) => String((p as any).ProyectoID ?? i)}
      renderItem={({ item }) => <ProjectCard project={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      contentContainerStyle={[{ paddingVertical: 8, flexGrow: 1 }, contentContainerStyle]}
      ListEmptyComponent={!isLoading ? <EmptyProjects /> : null}
      {...flatListProps}
    />
  );
};
