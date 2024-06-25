import { TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS } from '../../../constants/style';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};

const CustomTabBar = ({ children, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        top: -35,
        display: 'flex',
        justifyContent: 'center',
        ...SHADOWS.small,
        borderWidth: 3,
        borderColor: COLORS.white,
      }}
      onPress={onPress}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default CustomTabBar;
