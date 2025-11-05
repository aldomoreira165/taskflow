import { Text, View } from "react-native"
import { Header } from "../../components/ui/Header"
import { CardContent } from "../../components/ui/CardContent"
import { globalColors, globalStyles } from "../../theme/global.styles"
import { useAuthStore } from "../../store/auth/useAuthStore"

export const ProjecstScreen = () => {

  const { user } = useAuthStore();

  return (
    <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
      <Header>
        <Text style={[globalStyles.mainTitle, { fontSize: 60 }]}>TaskFlow</Text>
        <Text style={[globalStyles.mainSubtitle, { fontSize: 25, fontWeight: '400', marginBottom: 5 }]}>¡Hola, {user?.Nombre}! 👋</Text>
        <Text style={globalStyles.mainSubtitle}>Te damos la bienvenida de nuevo</Text>
      </Header>

      <CardContent>

      </CardContent>
    </View>
  )
}
