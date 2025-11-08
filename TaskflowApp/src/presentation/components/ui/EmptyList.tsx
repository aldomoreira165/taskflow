import { View, Text } from "react-native";
import { globalStyles } from "../../theme/global.styles";
import { CustomIcon } from "./CustomIcon";

interface Props {
    title: string;
    subTitle: string;
    icon: string;
}

export const EmptyList = ({ title, subTitle, icon }: Props) => (
  <View
    style={globalStyles.cardEmptyList}
    pointerEvents="none"
  >
    <View
      style={globalStyles.iconEmptyList}
    >
      <CustomIcon name={ icon } white />
    </View>

    <Text style={{ fontSize: 18, fontWeight: '600', color: '#666' }}>
      { title }
    </Text>
    <Text style={{ textAlign: 'center', color: '#888' }}>
      { subTitle }
    </Text>
  </View>
);