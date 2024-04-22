<template>
  <v-footer fixed padless class="mt-auto">
    <v-card class="flex mx-auto" flat tile>
      <v-card-text class="white--text text-center w-100">
        <v-btn text small color="white" href="https://github.com/f136pix/whizz-messaging" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" size="2x"/>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGithub);

export default {
  components: {
    FontAwesomeIcon
  }
};
</script>

<style scoped>
.v-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
