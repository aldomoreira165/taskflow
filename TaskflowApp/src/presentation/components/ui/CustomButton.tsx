import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native"
import { globalColors, globalStyles } from "../../theme/global.styles";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface Props {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: globalColors.accent },
  secondary: { backgroundColor: "#1e2a38" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: globalColors.accent },
};

const textVariantStyles: Record<Variant, StyleProp<TextStyle>> = {
  primary: { color: "white" },
  secondary: { color: "white" },
  outline: { color: globalColors.accent },
};

const sizeStyles: Record<Size, StyleProp<ViewStyle>> = {
  sm: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  md: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12 },
  lg: { paddingVertical: 18, paddingHorizontal: 22, borderRadius: 14 },
};

export const CustomButton = ({
  label,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
  size = "md",
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        globalStyles.mainButton,
        variantStyles[variant],
        sizeStyles[size],
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        disabled && { opacity: 0.5 },
        style, 
      ]}
    >
      <Text
        style={[
          globalStyles.mainButtonText,
          textVariantStyles[variant],
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};
