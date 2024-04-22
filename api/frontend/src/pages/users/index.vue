<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container>
      <div class="flex-container justify-end">
        <router-link to="/users/create">
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
          <template v-slot:item.email="{ item }">
            <a class="font-italic" :class="{ 'text-decoration-underline bg-grey-darken-3': item.email === user.email }">{{
                item.email
              }}</a>
          </template>
          <template v-slot:item.role="{ item }">
            <a class="font-italic">{{ item.role.charAt(0).toUpperCase() + item.role.slice(1) }}</a>
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ new Date(item.created_at).toLocaleDateString('pt-BR') }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="" text @click="navigateToUser(item.id)" variant="flat">
              <font-awesome-icon icon="cog" class="text-grey-darken-2"/>
            </v-btn>
            <v-btn color="" text @click="deleteUser(item.id)" class="ml-4" variant="flat">
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
import UserService from "../../services/user.service";

export default {

  data() {
    return {
      items: [],
      errorSnackbar: false,
      successSnackbar: false,
      errorMessage: '',
      headers: [

        {title: "User", value: 'email', sortable: true},
        {title: "Role", value: 'role'},
        {title: "Created At", value: 'created_at', sortable: true},
        {title: "", value: 'actions'}
      ],
    };
  },
  methods: {
    async fetchUsers(raw, page, email, sort) {
      try {
        const users = await UserService.getAllUsers(raw, page, email, sort);
        this.items = users;
        if (users.length === 0) {
          throw new Error('Nenhum user foi encontrado');
        }
      } catch (error) {
        this.errorMessage = `Nenhum user foi encontrado`;
        this.errorSnackbar = true;
      }
    },
    async deleteUser(id) {
      try {
        if (id == this.user.id) {
          this.errorMessage = `Você não pode deletar seu próprio user`;
          this.errorSnackbar = true;
          return;
        }
        await UserService.deleteUser(id);
        this.fetchUsers(true, "", "", "");
        this.successMessage = `User deletado com sucesso`;
        this.successSnackbar = true;
      } catch (error) {
        this.errorMessage = `Erro ao deletar o user`;
        this.errorSnackbar = true;
      }
    },
  },
  async created() {
    this.fetchUsers(true, "", "", "");
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

