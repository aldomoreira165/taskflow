import React from 'react';
import { Image, useWindowDimensions, View, Text, StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { CustomButton } from '../../components/ui/CustomButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { globalColors, globalStyles } from '../../theme/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

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
            accessoryLeft={(props) => (
              <CustomIcon {...props} name="people-outline" fill={globalColors.highlight} />
            )}
          />

          <Input
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            style={globalStyles.mainInput}
            textStyle={{ color: globalColors.textPrimary }}
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
            accessoryLeft={(props) => (
              <CustomIcon {...props} name="lock-closed-outline" fill={globalColors.primary} />
            )}
          />
        </View>

        <View>
          <CustomButton
            label="Registrarse"
            onPress={() => {}}
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
