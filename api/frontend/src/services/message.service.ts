import {checkStatus} from "../utils";
import axios from "axios";

const API_URL = 'http://localhost:3000/messages';

class MessageService {
  private checkStatus = checkStatus;

  async getAllMessages(nextHour = false) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          nextHour: nextHour
        }
      });
      this.checkStatus(response, "Nenhuma mensagem foi encontrada");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao carregar as mensagens: ${error.message}`);
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response);
      this.checkStatus(response, "Mensagem não encontrada");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao carregar mensagem: ${error.message}`);
    }
  }

  async createMessage(message) {
    try {
      const response = await axios.post(API_URL, message);
      this.checkStatus(response, "Falha ao criar mensagem");
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response.data.errors) {
        throw new Error(`${error.response.data.errors[0]}`);
      }
      throw new Error(`Erro ao criar mensagem: ${error.message}`);
    }
  }

  async updateUser(id, user) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, user);
      this.checkStatus(response, "Falha ao atualizar user");
      return response.data;
    } catch (error) {
      if (error.response.data.email) {
        throw new Error(`Email já esta sendo ultilizado`);
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteMessage(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      this.checkStatus(response, "Falha ao deletar user");
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}

export default new MessageService;
