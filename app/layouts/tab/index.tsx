import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MuiIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS } from '../../constants/style';
import History from '../../screens/History.screen';
import Home from '../../screens/Home.screen';
import MyLink from '../../screens/MyLink.screen';
import Receive from '../../screens/Receive.screen';
import CustomHeaderTitle from './components/CustomHeader';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.whiteGray2,

        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          ...SHADOWS.medium,
          position: 'relative',
        },
        tabBarIconStyle: {
          backgroundColor: '#d33',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          // marginTop: 1,
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Receive') {
            iconName = 'package-up';
          } else if (route.name === 'Link') {
            iconName = 'link';
          } else {
            iconName = 'link-outline';
          }
          return <MuiIcons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerTitle: (props) => <CustomHeaderTitle title='Home' {...props} />,
          headerShadowVisible: false,
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name='Receive'
        component={Receive}
        options={{
          headerTitle: (props) => (
            <CustomHeaderTitle title='Receive' {...props} />
          ),
          headerShadowVisible: false,
          tabBarLabel: 'Receive',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='History'
        component={History}
        options={{
          headerTitle: (props) => (
            <CustomHeaderTitle title='History' {...props} />
          ),
          headerShadowVisible: false,
          tabBarLabel: 'History',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='Link'
        component={MyLink}
        options={{
          headerTitle: (props) => (
            <CustomHeaderTitle title='My Link' {...props} />
          ),
          headerShadowVisible: false,
          tabBarLabel: 'Link',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
