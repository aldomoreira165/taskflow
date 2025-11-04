import { Pressable, Text } from "react-native"
import { globalStyles } from "../../theme/global.styles";

interface Props {
    label: string;
    onPress: () => void;
}

export const CustomButton = ({ label, onPress }: Props) => {
  return (
    <Pressable 
        onPress={() => onPress()}
        style={ globalStyles.mainButton }
    >
        <Text style={ globalStyles.mainButtonText } >{ label }</Text>
    </Pressable>
  )
}
