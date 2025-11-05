import { View } from "react-native"
import { CardContent } from "../../components/ui/CardContent"
import { globalColors } from "../../theme/global.styles"
import { Header } from "../../components/ui/Header"

export const TasksScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
            <Header />

            <CardContent>

            </CardContent>
        </View>
    )
}
