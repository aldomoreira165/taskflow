import { useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from "react-native"
import { Header } from "../../components/ui/Header"
import { CardContent } from "../../components/ui/CardContent"
import { globalColors, globalStyles } from "../../theme/global.styles"
import { useAuthStore } from "../../store/auth/useAuthStore"
import FloatingActionButton from "../../components/ui/FloatingActionButton"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigator"
import { getProjects } from "../../../actions/projects/get-projects"
import { useQuery } from "@tanstack/react-query"
import { ProjectList } from "../../components/projects/ProjectList"

export const ProjecstScreen = () => {

  const { user } = useAuthStore();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [isExtended, setIsExtended] = useState(true);

  const { isLoading, data: projects = [] } = useQuery({
    queryKey: ['projects', user?.UsuarioID],
    queryFn: () => getProjects(),
    enabled: !!user?.UsuarioID,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = Math.floor(nativeEvent?.contentOffset?.y ?? 0);
    setIsExtended(y <= 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>

      <Header>
        <Text style={[globalStyles.mainTitle, { fontSize: 60 }]}>TaskFlow</Text>
        <Text style={[globalStyles.mainSubtitle, { fontSize: 25, fontWeight: '400', marginBottom: 5 }]}>¡Hola, {user?.Nombre}! 👋</Text>
        <Text style={globalStyles.mainSubtitle}>Te damos la bienvenida de nuevo</Text>
      </Header>

      <CardContent>


        <ProjectList
          projects={projects}
          isLoading={isLoading}
          onScroll={onScroll}
          scrollEventThrottle={1}
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        />

        <FloatingActionButton
          label="Nuevo proyecto"
          animateFrom="right"
          icon="plus"
          extended={isExtended}
          style={{ bottom: 115, right: 0 }}
          visible
          onPress={() => navigation.navigate('ProjectScreen', {})}
        />

      </CardContent>
    </View>
  )
}
