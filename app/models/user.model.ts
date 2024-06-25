export interface IUser {
  id?: string;
  username?: string;
  newName?: string;
  Profile?: IUserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  gender?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
