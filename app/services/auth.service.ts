import httpClient from '../libs/axios';
import { IUser } from '../models/user.model';

class AuthService {
  private username?: string;
  private password?: string;

  constructor() {}

  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }

  async login() {
    try {
      const response = await httpClient.post<{
        accessToken: string;
        userData: IUser;
      }>('/auth/sign-in', {
        username: this.username,
        password: this.password,
      });

      return await response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
