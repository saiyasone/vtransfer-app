import { NavigationContainer } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { AuthProvider } from './contexts/AuthContext.context';
import Routes from './screens/routes';

// Non import
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <Fragment>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </Fragment>
  );
}

export default App;
