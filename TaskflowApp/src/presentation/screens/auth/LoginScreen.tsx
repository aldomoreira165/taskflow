import { useState } from "react";
import { Input } from "@ui-kitten/components"
import { Image, useWindowDimensions, View, Text, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { globalColors, globalStyles } from "../../theme/global.styles";
import { CustomButton } from "../../components/ui/CustomButton";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { };

export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    usuario: '',
    password: '',
  });

  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.usuario.length === 0 || form.password.length === 0) {
      return;
    }

    setIsLoading(true);
    const wasSuccessful = await login(form.usuario, form.password);
    setIsLoading(false)

    if ( wasSuccessful ) {
      navigation.reset({
        index: 0,
        routes:[{ name: 'ProjecstScreen' }]
      })
      
      return;
    };

    Alert.alert('Error', 'Usuario o contraseña incorrectos')

  }

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
            <Text style={globalStyles.mainSubtitle}>Tu productividad comienza aquí</Text>
          </View>
        </View>

        <View style={globalStyles.containerCenter}>
          <Input
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            value={form.usuario}
            onChangeText={(usuario) => setForm({ ...form, usuario })}
            accessoryLeft={<CustomIcon name="at-outline" fill={globalColors.danger} />}
            style={globalStyles.mainInput}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<CustomIcon name="lock-closed-outline" fill={globalColors.primary} />}
            style={globalStyles.mainInput}
          />
        </View>

        <View>
          <CustomButton
            label='Iniciar Sesión'
            onPress={onLogin}
          />
        </View>

        <View style={[globalStyles.containerCenter, { flexDirection: 'row' }]}>
          <Text style={globalStyles.mainSubtitle}>¿No tienes una cuenta?</Text>
          <Text
            onPress={() => { navigation.navigate('RegisterScreen') }}
            style={[globalStyles.mainSubtitle, { color: globalColors.accent, fontWeight: '600' }]}
          > ¡Regístrate!</Text>
        </View>

      </ScrollView>
    </View>
  )
}
