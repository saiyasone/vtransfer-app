import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fragment } from 'react';

// Screen
import useAuth from '../hooks/useAuth';
import TabNavigation from '../layouts/tab';
import CustomHeaderTitle from '../layouts/tab/components/CustomHeader';
import { RootStackParam } from '../layouts/tab/types/RootStackParam';
import SignIn from './SignIn.screen';
import SignUp from './SignUp.screen';

const Stack = createNativeStackNavigator<RootStackParam>();

const Routes = () => {
  const { state } = useAuth();

  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Tab'
      >
        {state?.token ? (
          <Stack.Screen name='Tab' component={TabNavigation} />
        ) : (
          <Fragment>
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{
                headerTitle: (props) => (
                  <CustomHeaderTitle title='Sign In' {...props} />
                ),
              }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{
                headerTitle: (props) => (
                  <CustomHeaderTitle title='Sign Up' {...props} />
                ),
              }}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </Fragment>
  );
};

export default Routes;
