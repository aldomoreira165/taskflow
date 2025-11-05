import { Text, useWindowDimensions, View } from "react-native"
import { globalStyles } from "../../theme/global.styles"

export const Header = () => {

  const { height } = useWindowDimensions();

  return (
    <View style={[globalStyles.containerHeader, { height: height * 0.3, paddingLeft: 20, justifyContent: 'flex-end', paddingBottom: 50 }]}>
        <Text style={[globalStyles.mainTitle, { fontSize: 60 }]}>TaskFlow</Text>
        <Text style={[globalStyles.mainSubtitle, {  fontSize: 25, fontWeight: '400' }]}>Hola, Aldo</Text>
        <Text style={globalStyles.mainSubtitle}>Te damos la bienvenida de nuevo</Text>
    </View>
  )
}
