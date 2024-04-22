<template>
  <v-container class="header v-container d-flex align-center justify-center">
    <font-awesome-icon :icon="['fab', 'github']" size="3x" class="github-icon" @click="redirectToRepo"/>
  </v-container>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faGithub);

export default {
  components: {
    FontAwesomeIcon
  },
  methods: {
    redirectToRepo() {
      window.open('https://github.com/f136pix/whizz-messaging', '_blank');
    }
  }
};
</script>

<style scoped>
.header {
  padding: 7px;
}

.github-icon {
  transition: color 0.3s;
  cursor: pointer;
  padding-top: 10px;
}
.github-icon:hover {
  color: purple;
}
</style>
