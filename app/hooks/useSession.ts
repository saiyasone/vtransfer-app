import { useMMKV } from 'react-native-mmkv';
import { IUser } from '../models/user.model';

const useLocalStorage = () => {
  const localStorage = useMMKV();

  const useSession = (token: string, user: IUser) => {
    localStorage.set('accessToken', token);
    localStorage.set('userData', JSON.stringify(user));
  };

  const useGetStorage = (key: string) => {
    return localStorage.getString(key);
  };

  const useClearSession = () => {
    localStorage.delete('userData');
    localStorage.delete('accessToken');
  };

  const useDeleteLocalByKey = (key: string) => {
    localStorage.delete(key);
  };

  return {
    useSession,
    useGetStorage,
    useClearSession,
    useDeleteLocalByKey,
  };
};

export default useLocalStorage;
