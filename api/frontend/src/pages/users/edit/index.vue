<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container class="bg-grey-darken-4 rounded elevation-15 mt-12 w-50">
      <v-form @submit="submitForm">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              label="Email"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="user.role"
              :items="roles"
              item-text="title"
              item-value="value"
              label="Role"
              required
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn :loading="loading" block class="bg-purple-darken-4" type="submit">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
      <v-row v-if="message" class="w-screen mt-7">
        <v-col cols="12">
          <v-alert type="error" class="w-50 mx-auto">
            {{ message }}
          </v-alert>
        </v-col>
      </v-row>
  </FullScreenWrapper>
</template>

<script>
import * as yup from 'yup';
import UserService from '@/services/user.service';

export default {
  components: {},
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!").email("Email must be valid"),
      password: yup.string().required("Password is required!").min(6, "Password must be at least 6 characters"),
    });

    return {
      user: {
        email: this.user?.email || '',
        password: '',
      },
      roles: [{title: "Admin", value: "admin"}, {title: "User", "value": "common"}],
      schema,
      loading: false,
      message: '',
    };
  },
  setup() {
  },
  async created() {
    const id = this.$route.query.value;
    UserService.getUser(id)
      .then(user => {
        this.user = user;
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  },
  methods: {
    isValidEmail(email) {
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return regex.test(email);
    },
    // validando manualmente
    async submitForm(e) {
      e.preventDefault();
      if (!this.user.email) {
        this.message = "Email é obrigatorio!";
        return;
      } else if (!this.isValidEmail(this.user.email)) {
        this.message = "Endereço de email inválido!";
        return;
      }
      this.loading = true;
      const id = this.$route.query.value;
      console.log(this.user);
      try {
        await UserService.updateUser(id, this.user);
        this.$router.push("/users");
      } catch (error) {
        this.loading = false;
        this.message = error.message || error.toString();
      }
      // this.$store.dispatch("auth/update").then(
      //   () => {
      //     console.log("--> ok")
      //     },
      //   (error) => {
      //     console.log(error)
      //   }
      // );
    },
  },
};
</script>

<style scoped>
/* component styles go here */
</style>
