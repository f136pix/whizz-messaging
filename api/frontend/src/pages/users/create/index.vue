<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container class="bg-grey-darken-4 rounded elevation-15 mt-12 w-50">
      <Form @submit="handleRegister" :validation-schema="schema">
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
          <v-col cols="12">
            <Field name="role" v-slot="{ field, errors }">
              <v-select
                v-model="field.value"
                :error-messages="errors"
                :items="roles"
                item-text="title"
                item-value="value"
                label="Role"
                required
                v-bind="field"
              ></v-select>
            </Field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn :loading="loading" block class="bg-purple-darken-4" type="submit">Registrar</v-btn>
          </v-col>
        </v-row>
      </Form>
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
import {Field, Form} from "vee-validate";
import * as yup from "yup";
import AuthService from "@/services/auth.service";
import {useRouter} from "vue-router";

const route = useRouter();

export default {
  name: "Register",
  components: {
    Form,
    Field,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!").email("Email must be valid"),
      password: yup.string().required("Password is required!").min(6, "Password must be at least 6 characters"),
      role: yup.string().required("Role is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      roles: [{title: "Admin", value: 1}, {title: "User", "value": 0}],
    };
  },
  methods: {
    async handleRegister(user) {
      this.loading = true;

      try {
        const response = await AuthService.register(user);
        this.$router.push("/users");
      } catch (error) {
        this.loading = false;
        this.message = error.message || error.toString();
      }
    },
  },
};
</script>

<style scoped>
.mt-6pct {
  margin-top: 6%;
}
</style>
