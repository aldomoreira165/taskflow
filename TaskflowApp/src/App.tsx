import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from "./presentation/navigation/StackNavigator"
import { useColorScheme } from 'react-native';
import { IonIconsPack } from './presentation/theme/ion-icons'; 

export const App = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={[IonIconsPack]} />

      <ApplicationProvider
        {...eva} theme={theme}
      >
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
