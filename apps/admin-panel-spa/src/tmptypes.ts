// TODO Separate package for types

export type User = {
  uid: string;
  email: string;
  roles: string[];
  createdAt: Date;
  isActivated: boolean;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type ErrorResponse =
  | Array<{
      error: string;
      message: string;
    }>
  | ({
      error: string;
      message: string;
    });
