import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProjecstScreen } from '../screens/project/ProjectsScreen';
import { TasksScreen } from '../screens/tasks/TasksScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CustomIcon } from '../components/ui/CustomIcon';
import { globalColors } from '../theme/global.styles';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelPosition: 'below-icon',
                tabBarActiveTintColor: globalColors.secondary,
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginTop: 10,
                    fontWeight: '600'
                },
                headerStyle: {
                    elevation: 0
                },
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 10,
                    height: 140,
                    borderRadius: 25,
                    paddingTop: 30,
                },
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen name="ProjectsScreen" options={{ title: 'Proyectos', tabBarIcon: ({ color }) => (<CustomIcon name="folder-outline" color={color}/>) }} component={ProjecstScreen} />
            <Tab.Screen name="TasksScreen" options={{ title: 'Tareas', tabBarIcon: ({ color }) => (<CustomIcon name="book-outline" color={color}/>) }} component={TasksScreen} />
            <Tab.Screen name="ProfileScreen" options={{ title: 'Perfil', tabBarIcon: ({ color }) => (<CustomIcon name="person-outline" color={color}/>) }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}