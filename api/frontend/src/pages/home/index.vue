<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4">
            <v-card-title>
              <h1>Bem vindo, <a class="font-weight-light font-italic">{{ this.user.email }} </a> 🎉</h1>
            </v-card-title>
            <v-card-text>
              <p class="mt-2">
                Você esta autenticado e pode acessar as páginas de
                <router-link to="/messages">Mensagens</router-link>
                ou, talvez, a pagina de
                <router-link to="/users">Usuarios</router-link>
                .
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-container class="d-flex justify-space-between" style="gap: 100px;">
        <v-container class="mt-15 bg-grey-lighten-2 w-75 rounded">
          <div class="" style="display: flex; ">
            <h1>Mensagens</h1>
            <h1 class="ml-6">
              <font-awesome-icon icon="paper-plane"/>
            </h1>
          </div>
          <v-row class="mt-6">
            <v-col cols="12">
              <v-btn class="w-100">
                Vizualizar suas mensagens
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn class="bg-purple-darken-4 w-100">
                Criar uma nova mensagem
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="mt-15 bg-grey-lighten-2 w-75 rounded">
          <div class="" style="display: flex;">
            <h1>Usuarios</h1>
            <h1 class="ml-8">
              <font-awesome-icon icon="users"/>
            </h1>
          </div>
          <v-row class="mt-6">
            <v-col cols="12">
              <router-link to="/users">
                <v-btn class="w-100">
                  Vizualizar todos os Usuarios
                </v-btn>
              </router-link>
            </v-col>
            <v-col cols="12">
              <router-link to="/users/create">
                <v-btn class="bg-purple-darken-4 w-100" v-if="this.user.role === 'admin'">
                  Criar um novo usuario
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-container>
    <MainFooter/>
  </FullScreenWrapper>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPaperPlane, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {ref, watchEffect} from "vue";
import {useStore} from "vuex";

library.add(faPaperPlane, faUsers);
export default {
  components: {
    FontAwesomeIcon
  },
  // computed: {
  //   // loggedIn() {
  //   //   return this.$store.state.auth.status.loggedIn;
  //   // },
  //   user() {
  //     return this.$store.state.auth.user;
  //   }
  // },
  created() {
    // se nao esta logado redirect para login
    // if (!this.loggedIn) {
    //   this.$router.push("/auth/login");
    // }
  },
  setup() {
    const store = useStore();
    const user = ref(null);
    // if user nao esta definido na store, refresh a pagina
    watchEffect(async () => {
      const authUser = store.state.auth.user;
      if (!authUser.email) {
        window.location.reload();
      }
      user.value = authUser;
    });

    return {user};
  }
};
</script>
