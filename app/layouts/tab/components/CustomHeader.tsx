import { Text } from 'react-native';
import { COLORS } from '../../../constants/style';

type Props = {
  title: string;
};

const CustomHeaderTitle = ({ title }: Props) => {
  return (
    <Text style={{ fontSize: 20, color: COLORS.whiteGray, fontWeight: 'bold' }}>
      {title}
    </Text>
  );
};

export default CustomHeaderTitle;