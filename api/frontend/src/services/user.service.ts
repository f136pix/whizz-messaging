import {API_URL, checkStatus} from "../utils";

import axios from 'axios';

const API_URL_USERS = `${API_URL}/users`;

class UserService {
  private checkStatus = checkStatus;

  async getAllUsers(raw = false, page = 1, email = "", sort = null,) {
    try {
      const response = await axios.get(API_URL_USERS, {
        params: {page, email, sort},
      });
      this.checkStatus(response, "Nenhum user foi encontrado");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao carregar os users: ${error.message}`);
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(`${API_URL_USERS}/${id}`);
      console.log(response);
      this.checkStatus(response, "User não encontrado");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async createUser(user) {
    try {
      const response = await axios.post(API_URL_USERS, user);
      this.checkStatus(response, "Falha ao criar user");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async updateUser(id, user) {
    try {
      const response = await axios.put(`${API_URL_USERS}/${id}`, user);
      this.checkStatus(response, "Falha ao atualizar user");
      return response.data;
    } catch (error) {
      if (error.response.data.email) {
        throw new Error(`Email já esta sendo ultilizado`);
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const response = await axios.delete(`${API_URL_USERS}/${id}`);
      this.checkStatus(response, "Falha ao deletar user");
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }


}

export default new UserService();
