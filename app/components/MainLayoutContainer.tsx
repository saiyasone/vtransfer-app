import React from 'react';
import { SafeAreaView } from 'react-native';

type Prop = {
  children: React.ReactNode;
};

const MainLayoutContainer = ({ children }: Prop) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 12 }}>
      {children}
    </SafeAreaView>
  );
};

export default MainLayoutContainer;
