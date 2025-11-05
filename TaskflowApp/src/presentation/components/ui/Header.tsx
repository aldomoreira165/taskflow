import { Text, useWindowDimensions, View } from "react-native"
import { globalStyles } from "../../theme/global.styles"
import { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {

  const { height } = useWindowDimensions();

  return (
    <View style={[globalStyles.containerHeader, { height: height * 0.3, paddingLeft: 20, justifyContent: 'flex-end', paddingBottom: 50 }]}>
        {children}
    </View>
  )
}
