<template>
  <FullScreenWrapper class="bg-black text-white">
    <AuthHeader/>
    <v-container class="bg-grey-lighten-2 rounded elevation-15 mt-10pct w-50">
    <h1 class="text-center mb-16"> Login </h1>
      <Form @submit="handleLogin" :validation-schema="schema">
        <v-row>
          <v-col cols="12">
            <Field name="email" v-slot="{ field, errors }">
              <v-text-field
                v-model="field.value"
                :error-messages="errors"
                label="Email"
                required
                outlined
                v-bind="field"
              ></v-text-field>
            </Field>
          </v-col>
          <v-col cols="12">
            <Field name="password" v-slot="{ field, errors }">
              <v-text-field
                v-model="field.value"
                :error-messages="errors"
                label="Password"
                required
                outlined
                type="password"
                v-bind="field"
              ></v-text-field>
            </Field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn :loading="loading" block class="bg-purple-darken-4" type="submit">Login</v-btn>
          </v-col>
        </v-row>
      </Form>
    </v-container>
    <v-row v-if="message" class="w-screen mt-7 bg-black">
      <v-col cols="12">
        <v-alert type="error" class="w-50 mx-auto">
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
  </FullScreenWrapper>
</template>

<script>
import {Field, Form} from "vee-validate";
import * as yup from "yup";

import AuthHeader from "../../../components/auth/AuthHeader.vue";

export default {
  name: "Login",
  components: {
    AuthHeader,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,

  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    // if user is logged in redirect to home
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          // se login for ok, redireciona para o dash
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.mt-10pct {
  margin-top: 8%;
}
</style>
