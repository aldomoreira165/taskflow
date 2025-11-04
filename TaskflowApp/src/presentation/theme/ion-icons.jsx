import { StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export const IonIconsPack = {
    name: 'ionicons',
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy(
        {},
        {
            get(target, name) {
                return IconProvider(name);
            },
        },
    );
}

const IconProvider = name => ({
    toReactElement: props => IonIconsFunction({ name, ...props }),
});


function IonIconsFunction({ name, style, fill, ...rest }) {
    const flat = StyleSheet.flatten(style || {});
    const { height, tintColor, color, ...iconStyle } = flat;

    const resolvedColor = fill ?? tintColor ?? color ?? '#222';
    const size = typeof height === 'number' ? height : 24;

    return (
        <Ionicons
            name={String(name)}
            size={size}
            color={resolvedColor}
            style={iconStyle}
            {...rest}
        />
    );
}