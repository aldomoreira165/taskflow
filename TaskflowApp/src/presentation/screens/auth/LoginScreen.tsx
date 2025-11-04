import { Button, Input, Layout, Text, Icon } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { CustomIcon } from "../../components/ui/CustomIcon";

export const LoginScreen = () => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>


        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">TaskFlow</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            accessoryLeft={<CustomIcon name="people-outline" />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<CustomIcon name="lock-closed-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            onPress={() => { }}
            appearance="filled"
          >
            Ingresar
          </Button>
        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>¿No tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => { }}
          > ¡Registrate!</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
