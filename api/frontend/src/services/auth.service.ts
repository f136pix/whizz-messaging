// @ts-ignore
import {IApiRes, IUserLoginDto, IUserRegisterDto} from "../types";
// @ts-ignore
import {API_URL, resFormatter} from "../utils";

// @ts-ignore
import authHeader from "./auth-header";

// @ts-ignore
import axios from "axios";


class AuthService {
  login(data: IUserLoginDto): Promise<IApiRes> {
    return axios
      .post(API_URL  + 'login',
        {
          "user": {
            "email": data.email,
            "password": data.password
          }
        }
      )
      .catch(err => {
        console.log(err);
        throw new Error("Não foi possivel realizar login, verifique as credenciais !");
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          const user = response.data.user;
          const token = response.headers.authorization.split(' ')[1];
          localStorage.setItem('jwt', JSON.stringify(token)); // saving jwt in localstorage
          localStorage.setItem('user', JSON.stringify(user)); // saving user in localstorage
          return {
            status: response.status,
            data: response.data
          };
        }
        throw new Error("Não foi possivel realizar login, verifique suas credenciais");
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
        const formattedErr = resFormatter(err);
        const errMsg = formattedErr.data.errors ? formattedErr.data.errors[0]
          : "Houve um erro ao cadastrar o usuário. Tente novamente.";
        throw new Error(errMsg);
      })
      .then(response => {
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          return {
            status: response.status,
            data: response.data
          };
        }
        throw new Error("Houve um erro ao cadastrar o usuário. Tente novamente.");
      });
  }

  // unico metodo que não precisa realizar o throw dos errors
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
          localStorage.removeItem('user');
          return {
            status: response.status,
            data: response.data
          };
        }
        return resFormatter(response);
      });
  }

  update() {
    console.log(localStorage.getItem('jwt'))
    return axios
      .get(API_URL + 'current_user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        throw new Error("User não autenticado");
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user)); // saving user in localstorage
          return {
            status: response.status,
            data: response.data
          };
        }
        throw new Error("Não foi possivel realizar login, verifique suas credenciais");
      });
  }
}

export default new AuthService();
