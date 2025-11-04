import { Input } from "@ui-kitten/components"
import { Image, useWindowDimensions, View, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { globalColors, globalStyles } from "../../theme/global.styles";
import { CustomButton } from "../../components/ui/CustomButton";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { };

export const LoginScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={globalStyles.container}>

        <View style={globalStyles.containerCenter}>
          <View style={[globalStyles.header, { paddingTop: height * 0.10 }]}>
            <Image
              source={require('../../../assets/logo.png')}
              style={globalStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={globalStyles.containerCenter}>
            <Text style={globalStyles.mainTitle}>TaskFlow</Text>
            <Text style={globalStyles.mainSubtitle}>Tu día productivo comienza aquí</Text>
          </View>
        </View>

        <View style={ globalStyles.containerCenter }>
          <Input
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            accessoryLeft={<CustomIcon name="at-outline" fill={ globalColors.danger } />}
            style={ globalStyles.mainInput }
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<CustomIcon name="lock-closed-outline"  fill={ globalColors.primary }/>}
            style={ globalStyles.mainInput }
          />
        </View>

        <View>
          <CustomButton
            label='Iniciar Sesión'
            onPress={() => { }}
          />
        </View>

        <View style={[globalStyles.containerCenter, { flexDirection: 'row' }]}>
          <Text style={globalStyles.mainSubtitle}>¿No tienes una cuenta?</Text>
          <Text
            onPress={() => { navigation.navigate('RegisterScreen') }}
            style={[globalStyles.mainSubtitle, { color: globalColors.accent, fontWeight: '600' }]}
          > ¡Registrate!</Text>
        </View>

      </ScrollView>
    </View>
  )
}
