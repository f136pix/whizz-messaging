<template>
  <FullScreenWrapper>
    <MainHeader/>
    <v-container class="bg-grey-darken-4 rounded elevation-15 mt-12 w-50">
      <Form @submit="handleCreate" :validation-schema="schema">
        <v-row>
          <v-col cols="12">
            <Field name="textMsg" v-slot="{ field, errors }">
              <v-textarea
                v-model="field.value"
                :error-messages="errors"
                label="Message"
                required
                outlined
                v-bind="field"
              ></v-textarea>
            </Field>
          </v-col>
          <v-col cols="12">
            <Field name="whatsappNumber" v-slot="{ field, errors }">
              <v-text-field
                v-model="field.value"
                :error-messages="errors"
                label="Numero de celular"
                prefix="+55"
                required
                outlined
                type="tel"
                v-bind="field"
              ></v-text-field>
            </Field>
          </v-col>
          <v-container>
            <v-row justify="space-between">
              <v-col cols="6">
                <Field name="scheduleDateDay" v-slot="{ field, errors }">
                  <v-text-field
                    v-model="field.value"
                    :error-messages="errors"
                    label="Data de envio"
                    required
                    outlined
                    type="date"
                    v-bind="field"
                  ></v-text-field>
                </Field>
              </v-col>
              <v-col cols="6">
                <Field name="scheduleDateTime" v-slot="{ field, errors }">
                  <v-text-field
                    v-model="field.value"
                    :error-messages="errors"
                    label="Hora de envio"
                    required
                    outlined
                    type="time"
                    v-bind="field"
                  ></v-text-field>
                </Field>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn :loading="loading" block class="bg-purple-darken-4" type="submit">Criar</v-btn>
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
import {useRouter} from "vue-router";
import * as yup from "yup";

import MessageService from "@/services/message.service";
const route = useRouter();
const today = new Date();
const formattedToday = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
export default {
  name: "Register",
  components: {
    Form,
    Field,
  },
  data() {
    const schema = yup.object().shape({
      textMsg: yup.string().required("Mensagem não pode ser vazia!").max(200, "A mensagem deve ter até 200 caracteres!"),
      whatsappNumber: yup.string().required("O numero não pode ser vazio!").matches(/^\d{2}\d{8}$/, "Numero deve estar no formato +55 (dd)nnnnnnnn"),
      scheduleDateDay: yup.string().required("Data de envio não pode ser vazia!").test('is-future', 'O dia não pode ser anterior a hoje!', function (value) {
        // verificando se a data é maior ou igual a data de hoje
        const formattedValue = value.replace(/-/g, '');
        return formattedValue >= formattedToday;
      }),
      scheduleDateTime: yup.string().required("Hora de envio não pode ser vazia!")
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    async handleCreate(message) {
      // {
      //   "textMsg": "string",
      //   "whatsappNumber": "4384363961",
      //   "scheduleDateDay": "2024-04-22",
      //   "scheduleDateTime": "13:25"
      // }
      const scheduleDate = new Date(message.scheduleDateDay);
      const formattedSheduleDate = `${scheduleDate.getFullYear()}${String(scheduleDate.getMonth() + 1).padStart(2, '0')}${String(scheduleDate.getDate()).padStart(2, '0')}`;
      const formattedScheduledTime = message.scheduleDateTime.replace(/:/g, '') + "00";
      const formattedScheduledDateTime = `${formattedSheduleDate}${formattedScheduledTime}`;

      const now = new Date();
      const formattedNow = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

      const messageToSend = {
        textMsg: message.textMsg,
        whatsappNumber: "55" + message.whatsappNumber,
        scheduleDate: formattedScheduledDateTime,
        createDate: formattedNow
      };
      this.loading = true;

      try {
        const response = await MessageService.createMessage(messageToSend);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
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
