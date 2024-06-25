import { useNavigation } from '@react-navigation/native';
import React, { createContext, useReducer } from 'react';
import useLocalStorage from '../hooks/useSession';
import AuthService from '../services/auth.service';
import { AuthProviderProp, IAuthContext } from './types/auth.context';
import { typeReducer } from './types/reducer';

const initialState: IAuthContext = {
  isLoggedIn: false,
  user: {},
  token: '',
  error: '',
  loading: false,
};

type Action = {
  type: typeReducer;
  payload: typeof initialState;
};

const AuthContext = createContext<{
  state?: IAuthContext;
  dispatch?: React.Dispatch<Action>;
  signIn?: (username: string, password: string) => void;
  signUp?: (username: string, password: string) => void;
  signOut?: () => void;
}>({});

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case typeReducer.SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,

        loading: true,
      };

    case typeReducer.SIGN_UP: {
      return { ...state };
    }
  }
};

const AuthProvider = ({ children }: AuthProviderProp) => {
  const router = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const authService = new AuthService();
  const localStorage = useLocalStorage();

  const signIn = async (username: string, password: string) => {
    try {
      authService.setUsername(username);
      authService.setPassword(password);

      const response = await authService.login();
      localStorage.useSession(response.accessToken, response.userData);
      await router.navigate('Tab');

      dispatch({
        type: typeReducer.SIGN_IN,
        payload: {
          user: response.userData,
          token: response.accessToken,
          isLoggedIn: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await localStorage.useClearSession();
      await router.navigate('SignIn');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
