<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container>
      <div class="flex-container justify-end">
        <router-link to="/messages/create">
          <v-btn v-if="user.role === 'admin'" density="compact" icon="mdi-plus" class="mr-lg-16 bg-green"></v-btn>
        </router-link>
      </div>
      <v-card
        class="mx-auto"
        max-width="800"
      >
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <template v-slot:item.whatsappNumber="{ item }">
            <a class="font-italic">{{
                `+${item.whatsappNumber}`
              }}</a>
          </template>
          <template v-slot:item.scheduleDate="{ item }">
            <a class="font-italic">{{
                `${formatScheduleTime(item.scheduleDate)}`
              }}</a>
          </template>
          <template v-slot:item.textMsg="{ item }">
            <a class="font-italic">{{
                item.textMsg.length > 15 ? item.textMsg.substring(0, 15) + '...' : item.textMsg
              }}</a>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="" text @click="deleteMessage(item.id)" class="ml-4" variant="flat">
              <font-awesome-icon icon="trash" class="text-red"/>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-snackbar
      class="mb-14"
      v-model="errorSnackbar"
      color="error"
      :timeout="3000"
    >
      {{ errorMessage }}
    </v-snackbar>
    <v-snackbar
      class="mb-14"
      v-model="successSnackbar"
      color="success"
      :timeout="3000"
    >
      {{ successMessage }}
    </v-snackbar>
  </FullScreenWrapper>
</template>

<script>
import MessageService from "../../services/message.service";

export default {

  data() {
    return {
      items: [],
      errorSnackbar: false,
      successSnackbar: false,
      errorMessage: '',
      headers: [

        {title: "Numero", value: 'whatsappNumber', sortable: true},
        {title: "Data de Envio", value: 'scheduleDate', sortable: false},
        {title: "Mensagem", value: 'textMsg'},
        {title: "", value: 'actions'}
      ],
    };
  },
  methods: {
    formatScheduleTime,

    async fetchMessage() {
      try {
        const messages = await MessageService.getAllMessages();
        this.items = messages;
        if (messages.length === 0) {
          throw new Error('Nenhuma mensagem foi encontrada');
        }
      } catch (error) {
        this.errorMessage = `Nenhuma mensagem foi encontrada`;
        this.errorSnackbar = true;
      }
    },
    async deleteMessage(id) {
      try {
        await MessageService.deleteMessage(id);
        this.fetchMessage();
        this.successMessage = `Mensagem deletado com sucesso`;
        this.successSnackbar = true;
      } catch (error) {
        this.errorMessage = `Erro ao deletar a mensagem`;
        this.errorSnackbar = true;
      }
    },
  },
  async created() {
    this.fetchMessage();
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const user = ref(null);
    watchEffect(() => {
      user.value = store.state.auth.user;

    });

    const navigateToUser = (id) => {
      router.push(`/users/edit?value=${id}`);
    };

    return {user, navigateToUser};

  },
};
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCog, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {formatScheduleTime} from "../../utils";

library.add(faTrash, faCog);
</script>
<style scoped>
.hover-effect:hover {
  background-color: #868686 !important;
  transition: background-color 0.3s;
  cursor: pointer;
}
.flex-container {
  display: flex;
  align-items: flex-end;
}
</style>

