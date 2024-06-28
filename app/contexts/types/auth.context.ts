import React from 'react';
import { IUser } from '../../models/user.model';

export type AuthProviderProp = {
  children: React.ReactNode;
};

export interface IAuthContext {
  user?: IUser | any;
  token: string;
  error?: string;
  isLoggedIn?: boolean;
  loading?: boolean;
}
