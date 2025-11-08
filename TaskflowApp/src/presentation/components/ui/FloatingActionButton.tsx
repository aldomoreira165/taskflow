import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { globalColors, globalStyles } from '../../theme/global.styles';

type AnimateFrom = 'left' | 'right';
type IconMode = 'static' | 'dynamic';

interface Props {
  visible: boolean;
  extended?: boolean;
  label?: string;
  animateFrom?: AnimateFrom;
  style?: StyleProp<ViewStyle>;
  iconMode?: IconMode;
  icon?: string;            
  onPress?: () => void;       
}

const FloatingActionButton: React.FC<Props> = ({
  visible,
  extended = true,
  label = 'Label',
  animateFrom = 'right',
  style,
  iconMode = 'static',
  icon = 'plus',
  onPress = () => {},
}) => {
  const fabSideStyle: Partial<Record<AnimateFrom, number>> = { [animateFrom]: 16 };

  return (
    <AnimatedFAB
      icon={icon}
      label={label}
      extended={extended}
      onPress={onPress}
      visible={visible}
      animateFrom={animateFrom}
      iconMode={iconMode}
      style={[globalStyles.fab, style, fabSideStyle, { backgroundColor: globalColors.accent }]}
      color={globalColors.textSecondary}
    />
  );
};

export default FloatingActionButton;

