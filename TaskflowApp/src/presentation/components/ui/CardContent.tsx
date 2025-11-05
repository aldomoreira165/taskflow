import { Text, useWindowDimensions, View } from "react-native"
import { globalStyles } from "../../theme/global.styles"
import { PropsWithChildren } from "react";

export const CardContent = ({ children }: PropsWithChildren) => {

    const { height } = useWindowDimensions();

    return (
        <View style={[globalStyles.containerCardContent, { height: height * 0.70 }]}>
            { children }
        </View>
    )
}
