import { Text, View } from "react-native"
import { Header } from "../../components/ui/Header"
import { CardContent } from "../../components/ui/CardContent"
import { globalColors } from "../../theme/global.styles"

export const ProjecstScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
        <Header/>

        <CardContent>

        </CardContent>
    </View>
  )
}
