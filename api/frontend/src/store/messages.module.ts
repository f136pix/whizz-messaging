import MessageService from "../services/message.service";

export const messages = {
  namespaced: true,
  state: {messages: []},
  actions: {
    retrieve({commit},) {
      return MessageService.getAllMessages(true).then(
        messages => {
          console.log(messages)
          commit('retrieveSuccess', messages);
          return Promise.resolve(messages);
        },
        error => {
          commit('retrieveFailure');
          return Promise.reject(error);
        }
      );
    },
    delete({commit}, id) {
      return MessageService.deleteMessage(id).then(
        response => {
          commit('deleteSuccess');
          return Promise.resolve(id);
        },
        error => {
          commit('deleteFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    retrieveSuccess(state, messages) {
      state.messages = messages;
    },
    retrieveFailure(state) {
      console.log("Erro ao carregar mensagens");
    },
    deleteSuccess(state, id) {
      // retira a mensagem deletada do array de mensagens
      state.messages = state.messages.filter(message => message.id !== id);
      console.log("--->",state.messages)
      console.log("Mensagem deletada");
      },
    deleteFailure(state) {
      console.log("Erro ao deletar mensagem");
    }
  }
};
