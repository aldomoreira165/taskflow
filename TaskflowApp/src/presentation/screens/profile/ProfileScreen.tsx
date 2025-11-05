import { View } from "react-native"
import { CardContent } from "../../components/ui/CardContent"
import { Header } from "../../components/ui/Header"
import { globalColors } from "../../theme/global.styles"
import { CustomButton } from "../../components/ui/CustomButton"
import { useAuthStore } from "../../store/auth/useAuthStore"

export const ProfileScreen = () => {

  const { logout } = useAuthStore();

  return (
    <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
      <Header/>

      <CardContent>
        <CustomButton
          label="Cerrar Sesión"
          onPress={logout}
          style={{
            backgroundColor: globalColors.danger,
            width: '100%',
          }}
        />
      </CardContent>
    </View>
  )
}
