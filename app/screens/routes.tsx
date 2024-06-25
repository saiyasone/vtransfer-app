import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fragment } from 'react';

// Screen
import TabNavigation from '../layouts/tab';
import CustomHeaderTitle from '../layouts/tab/components/CustomHeader';
import { RootStackParam } from '../layouts/tab/types/RootStackParam';
import SignIn from './SignIn.screen';

const Stack = createNativeStackNavigator<RootStackParam>();

const Routes = () => {
  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='SignIn'
      >
        <Stack.Screen name='Tab' component={TabNavigation} />
        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{
            headerTitle: (props) => (
              <CustomHeaderTitle title='Sign In' {...props} />
            ),
          }}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default Routes;
