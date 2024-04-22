<template>
  <v-container fluid class="bg-transparent d-flex">
    <v-app-bar class="bg-purple-darken-4">
      <v-toolbar-title class="font-weight-bold ml-16">Whizz-msg</v-toolbar-title>
      <v-toolbar-items class="align-center">
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/messages">Messages</v-btn>
        <v-btn text to="/users">Users</v-btn>
        <v-btn class="text-center ml-16" variant="plain">
          <font-awesome-icon :icon="['fas', 'cog']" size="1" class="gear-icon"/>
        </v-btn>
        <v-btn class="text-center mr-16" variant="plain" @click="handleLogout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="1x" class="exit-icon"/>
        </v-btn>

      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSignOutAlt, faCog} from '@fortawesome/free-solid-svg-icons'; // Import the icon
import {useRouter} from "vue-router";
import {useStore} from "vuex";

import AuthService from "../../services/auth.service";

library.add(faSignOutAlt, faCog); // Add the icon to the library

export default {
  methods: {
    handleLogout: async function () {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push('/auth/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    return {


      // handleRegister: async function () {
      //   const user = {
      //     email: 'teste23@mail.com',
      //     password: "123456",
      //     role: 0
      //   };
      //   try {
      //     const res = await AuthService.register(user);
      //     console.log(res);
      //   } catch (error) {
      //     console.error('Error registering:', error);
      //   }
      // },
    };
  },
};
</script>
