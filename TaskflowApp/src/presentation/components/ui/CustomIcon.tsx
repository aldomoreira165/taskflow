import React from 'react';
import { Icon, useTheme, IconProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface Props extends IconProps {
  name: string;
  color?: string;
  white?: boolean;
}

export const CustomIcon = ({ name, color, white = false, ...props }: Props) => {
  const theme = useTheme();

  let fillColor = props.fill;

  if (!fillColor) {
    if (white) {
      fillColor = theme['color-info-100'];
    } else if (color && theme[color]) {
      fillColor = theme[color];
    } else if (color) {
      fillColor = color;
    } else {
      fillColor = theme['text-basic-color'];
    }
  }

  return (
    <Icon
      {...props}
      pack="ionicons"
      name={name}
      fill={fillColor}
      style={[styles.icon, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
