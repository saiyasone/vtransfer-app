import React from 'react';
import { IUser } from '../../models/user.model';

export type AuthProviderProp = {
  children: React.ReactNode;
};

export interface IAuthContext {
  isLoggedIn: boolean;
  user?: IUser | any;
  token: string;
  error?: string;
  loading?: boolean;
}
