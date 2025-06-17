export type User = {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
  password: string;
  registerDate: string;
};

export type UserOrFalse = {
  user?: User;
  notFound?: false;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export type UserInfoResponse = {
  firstName: string;
  lastName: string;
  registerDate: string;
  phone: string;
  email: string;
  company: { name: string };
  role: { name: string };
};

export type UpdateUserInfoRequest = {
  id: number;
  data: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
};
