import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from "react-native";
import { Header } from "../../components/ui/Header";
import { CardContent } from "../../components/ui/CardContent";
import { globalColors, globalStyles } from "../../theme/global.styles";
import { useAuthStore } from "../../store/auth/useAuthStore";
import FloatingActionButton from "../../components/ui/FloatingActionButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";

import { TaskList } from "../../components/tasks/TaskList";
import { getTasks } from "../../../actions/tasks/get-tasks";

export const TasksScreen = () => {

    const { user } = useAuthStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [isExtended, setIsExtended] = useState(true);

    const { isLoading, data: tasks = [] } = useQuery({
        queryKey: ['tasks', user?.UsuarioID],
        staleTime: 1000 * 60 * 5,
        queryFn: () => getTasks(),
        enabled: !!user,
    });

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = Math.floor(nativeEvent?.contentOffset?.y ?? 0);
        setIsExtended(y <= 0);
    };

    return (
        <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>

            <Header>
                <Text style={[globalStyles.mainTitle, { fontSize: 60 }]}>TaskFlow</Text>
                <Text style={[globalStyles.mainSubtitle, { fontSize: 25, fontWeight: '400', marginBottom: 5 }]}>
                    ¡Hola, {user?.Nombre}! 👋
                </Text>
                <Text style={globalStyles.mainSubtitle}>Estas son tus tareas</Text>
            </Header>

            <CardContent>

                <TaskList
                    tasks={tasks}
                    isLoading={isLoading}
                    onScroll={onScroll}
                    scrollEventThrottle={1}
                    contentContainerStyle={{ paddingBottom: 160 }}
                    showsVerticalScrollIndicator={false}
                />

                <FloatingActionButton
                    label="Nueva tarea"
                    animateFrom="right"
                    icon="plus"
                    extended={isExtended}
                    style={{ bottom: 115, right: 0 }}
                    visible
                    onPress={() => navigation.navigate('TaskScreen', {})}
                />

            </CardContent>
        </View>
    );
};
