import store from "../../store";

export default {
  install(Vue) {
    setInterval(async function () {

      // dispatch realizado de hora em hora ou quando user entra em uma nova aba
      await store.dispatch("messages/retrieve");

      console.log(store.state.messages.messages);

    }, 3600000);
  }
};
