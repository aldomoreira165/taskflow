import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native"
import { Header } from "../../components/ui/Header"
import { CardContent } from "../../components/ui/CardContent"
import { globalColors, globalStyles } from "../../theme/global.styles"
import { useAuthStore } from "../../store/auth/useAuthStore"
import FloatingActionButton from "../../components/ui/FloatingActionButton"
import { useState } from "react"

export const TasksScreen = () => {

    const { user } = useAuthStore();
    const [isExtended, setIsExtended] = useState(true);

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = Math.floor(nativeEvent?.contentOffset?.y ?? 0);
        setIsExtended(y <= 0);
    };


    return (
        <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
            <Header>
                <Text style={[globalStyles.mainTitle, { fontSize: 60 }]}>TaskFlow</Text>
                <Text style={[globalStyles.mainSubtitle, { fontSize: 25, fontWeight: '400', marginBottom: 5 }]}>¡Hola, {user?.Nombre}! 👋</Text>
                <Text style={globalStyles.mainSubtitle}>Te damos la bienvenida de nuevo</Text>
            </Header>

            <CardContent>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 160 }}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >



                </ScrollView>

                <FloatingActionButton
                    label="Nueva tarea"
                    animateFrom="right"
                    icon="plus"
                    extended={isExtended}
                    style={{ bottom: 115, right: 0 }}
                    visible
                    onPress={() => console.log('Nueva tarea')}
                />

            </CardContent>
        </View>
    )
}
