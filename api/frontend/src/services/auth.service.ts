import {IApiRes, IUserLoginDto, IUserRegisterDto} from "../types";
import {resFormatter} from "../utils";

import authHeader from "./auth-header";

// @ts-ignore
import axios from "axios";

const API_URL = 'http://localhost:3000/';

class AuthService {
  login(data: IUserLoginDto): Promise<IApiRes> {
    return axios
      .post(API_URL + 'login',
        {
          "user": {
            "email": data.email,
            "password": data.password
          }
        }
      )
      .catch(err => {
        console.log(err);
        return resFormatter(err);
      })
      .then(response => {
        if (response.status === 200) {
          const token = response.headers.authorization.split(' ')[1];
          localStorage.setItem('jwt', JSON.stringify(token)); // saving jwt in localstorage
        }
        return {
          status: response.status,
          data: response.data
        };
      });
  }

  register(user: IUserRegisterDto) {
    return axios
      .post(API_URL + 'signup',
        {
          "user": {
            "email": user.email,
            "password": user.password,
            "role": user.role
          }
        }).catch(err => {
        console.log(err);
        return resFormatter(err);
      })
      .then(response => {
        if (response.status === 200) {
          return {
            status: response.status,
            data: response.data
          };
        }
        return {
          status: response.status,
          data: response.data
        };
      });
  }

  async logout(): Promise<IApiRes> {
    const bearer = authHeader();
    if (!bearer.Authorization) {
      return {
        status: 401,
        data: "Não foi possivel realizar logout"
      };
    }
    return axios.delete(API_URL + 'logout', {headers: bearer})
      .catch(err => {
          return resFormatter(err);
        }
      )
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('jwt');
          return {
            status: response.status,
            data: response.data
          };
        }
        return resFormatter(response);
      });
  }
}

export default new AuthService();
