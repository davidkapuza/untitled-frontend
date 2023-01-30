// TODO Separate package for types

export type User = {
  uid: string;
  email: string;
  roles: string[];
  createdAt: Date;
  isActivated: boolean;
  accessToken: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
  user: Omit<User, "accessToken">;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type ErrorResponse = {
  status: number;
  data: {
    error: string;
    message: string;
  };
} & Error;
