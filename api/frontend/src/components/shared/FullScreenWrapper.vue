<template>
  <div class="full-screen-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FullScreenWrapper',
};
</script>

<style scoped>
.full-screen-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
