<template>
  <div class="login">
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'login',
}
</script>

<style scoped>
.login {
  min-height: 100vh;
}
</style>
