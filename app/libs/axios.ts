import axios from 'axios';
import { useMMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';

const httpClient = axios.create({
  baseURL: 'http://192.168.100.5:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const accessStorage = useMMKV();

httpClient.interceptors.response.use(
  async (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    const res = await error.response;
    const router = useNavigation();
    console.log(res);

    switch (res.status) {
      case 401 || 403:
        accessStorage.delete('accessToken');
        await router.navigate('SignIn');
        break;

      default:
        break;
    }

    let resErr = await res?.data;
    return Promise.reject(resErr);
  },
);

httpClient.interceptors.request.use(
  async function (config) {
    const accessToken = accessStorage.getString('accessToken');

    if (!!accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

export default httpClient;
