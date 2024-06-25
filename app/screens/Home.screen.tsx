import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainLayoutContainer from '../components/MainLayoutContainer';
import ImagePicker from '../features/Home/components/ImagePicker';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useSession';
import { IUser } from '../models/user.model';

const Home = () => {
  const [user, setUser] = useState<IUser>({});
  const router = useNavigation();
  const localStorage = useLocalStorage();
  const { signOut } = useAuth();

  useEffect(() => {
    router.setOptions({
      headerRight: () => {
        return (
          <View style={{ marginRight: 13 }}>
            <TouchableOpacity
              onPress={() => {
                signOut?.();
              }}
            >
              <MuiIcon name='logout' color={'red'} size={22} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  useEffect(() => {
    const userData = localStorage.useGetStorage('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Fragment>
      <MainLayoutContainer>
        <Text>Home - {user.username?.toUpperCase()} </Text>

        <ImagePicker />
        {/* <FileCardItem /> */}
      </MainLayoutContainer>
    </Fragment>
  );
};

export default Home;
