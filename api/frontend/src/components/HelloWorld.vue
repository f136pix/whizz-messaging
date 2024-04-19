<template>
  <v-container class="bg-blue-accent-1 w-100 d-flex">
    <v-btn class="mx-auto my-auto" @click="handleLogin">login</v-btn>
    <v-btn class="mx-auto my-auto" @click="handleLogout">logout</v-btn>
    <v-btn class="mx-auto my-auto" @click="handleRegister">register</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import AuthService from '../services/auth.service';


const handleLogin = () => {
  const user = {
    email: 'testefilipe@gmail.com',
    password: '123456'

  };

  AuthService.login(user).then(data => {
    console.log(data);
  });
};

const handleLogout = async () => {
  const res = await AuthService.logout();
  console.log(res);
};

const handleRegister = async () => {
  const user = {
    email: 'teste23@mail.com',
    password: "123456",
    role: 0
  };
  const res = await AuthService.register(user);
  console.log(res);
};

</script>
