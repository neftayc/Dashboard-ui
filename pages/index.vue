<template>
  <div>
    <form autocomplete="off" style="max-width: 600px" class="mx-auto mt-10">
      <el-input placeholder="Email" v-model="user.email"></el-input>

      <el-input
        placeholder="Password"
        v-model="user.password"
        show-password
      ></el-input>

      <el-button type="primary" :loading="loading" @click="login">
        Ingresar
      </el-button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    hasVisiblePassword: false,
    loading: false,
    show: false,
  }),
  head: {
    title: 'Login',
  },
  computed: {
    formValid() {
      return !(this.user.email && this.user.password)
    },
  },
  methods: {
    async login() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', { data: this.user })
      } catch (_) {
        // this.user = {}
      }
      this.loading = false
    },
  },
}
</script>
