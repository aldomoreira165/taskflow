import { Text, useWindowDimensions, View } from "react-native"
import { globalStyles } from "../../theme/global.styles"

export const CardContent = () => {

    const { height } = useWindowDimensions();

    return (
        <View style={[globalStyles.containerCardContent, { height: height * 0.70 }]}>
            <Text>CardContent</Text>
        </View>
    )
}
