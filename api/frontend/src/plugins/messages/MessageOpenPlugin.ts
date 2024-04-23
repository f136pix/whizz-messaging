import store from "../../store";
import {generateWhatsAppLink} from "../../utils";

export default {
  install(Vue) {
    setInterval(async function () {
      let msgs = store.state.messages.messages;
      if (msgs.length === 0) return;
      // ve se é apos agora
      const scheduleTime = new Date(msgs[0].scheduleDate);
      scheduleTime.setHours(scheduleTime.getHours() + 3);
      const now = new Date();
      // se hora ainda não chegou, retorna
      if(scheduleTime > now) return;
      const wppLink = generateWhatsAppLink(msgs[0]);
      window.open(wppLink, '_blank');
      store.dispatch("messages/delete", msgs[0].id);
      msgs.shift();

    }, 60000);
  }
};
