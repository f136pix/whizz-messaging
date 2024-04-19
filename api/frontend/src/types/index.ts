export type IApiRes = {
  status: number;
  data: any
}

export type IUserLoginDto = {
    email: string;
    password: string;
}

export type IUserRegisterDto = {
  email: string;
  password: string;
  role: number;
}
