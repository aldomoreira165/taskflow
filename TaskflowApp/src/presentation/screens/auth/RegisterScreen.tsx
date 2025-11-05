import React, { useState } from 'react';
import { Image, useWindowDimensions, View, Text, StyleSheet, Alert } from 'react-native';
import { Input } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { CustomButton } from '../../components/ui/CustomButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { globalColors, globalStyles } from '../../theme/global.styles';
import { authRegister } from '../../../actions/auth/auth';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  const [form, setForm] = useState({
    usuario: '',
    password: '',
    nombre: ''
  });

  const onRegister = async () => {

    if (form.usuario.length === 0 || form.password.length === 0 || form.nombre.length === 0) {
      return;
    }

    const isRegistered = await authRegister(form.password, form.nombre, form.usuario);

    if (isRegistered) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }]
      })

      return;
    }

    Alert.alert('Error', 'Ocurrió un error en el registro del usuario')

  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView style={globalStyles.container} keyboardShouldPersistTaps="handled">
        <View style={[globalStyles.header, { paddingTop: height * 0.10 }]}>
          <Image
            source={require('../../../assets/logo.png')}
            style={globalStyles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.containerCenter}>
          <Text style={globalStyles.mainTitle}>TaskFlow</Text>
          <Text style={globalStyles.mainSubtitle} numberOfLines={1}>Organiza tu mundo, una tarea a la vez</Text>
        </View>

        <View style={globalStyles.containerCenter}>
          <Input
            placeholder="Nombre completo"
            style={globalStyles.mainInput}
            textStyle={{ color: globalColors.textPrimary }}
            value={form.nombre}
            onChangeText={(nombre) => setForm({ ...form, nombre })}
            accessoryLeft={(props) => (
              <CustomIcon {...props} name="people-outline" fill={globalColors.highlight} />
            )}
          />

          <Input
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            style={globalStyles.mainInput}
            textStyle={{ color: globalColors.textPrimary }}
            value={form.usuario}
            onChangeText={(usuario) => setForm({ ...form, usuario })}
            accessoryLeft={(props) => (
              <CustomIcon {...props} name="at-outline" fill={globalColors.danger} />
            )}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            style={globalStyles.mainInput}
            textStyle={{ color: globalColors.textPrimary }}
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={(props) => (
              <CustomIcon {...props} name="lock-closed-outline" fill={globalColors.primary} />
            )}
          />
        </View>

        <View>
          <CustomButton
            label="Registrarse"
            onPress={onRegister}
          />
        </View>

        <View style={[globalStyles.containerCenter, { flexDirection: 'row' }]}>
          <Text style={globalStyles.mainSubtitle}>¿Ya tienes una cuenta?</Text>
          <Text
            onPress={() => navigation.goBack()}
            style={[globalStyles.mainSubtitle, { color: globalColors.accent, fontWeight: '600' }]}
          > ¡Inicia sesión!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
