<template>
  <div>
    <el-row class="content">
      <el-col class="image" :xs="0" :sm="0" :md="16">
        <el-image
          style="width: 600px"
          src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/login-v2.72cd8a26.svg"
          fit
        ></el-image>
      </el-col>
      <el-col :xs="24" :md="8" class="form">
        <form
          autocomplete="off"
          style="max-width: 320px"
          class="mx-auto mt-10"
          @submit.prevent
        >
          <h1 class="title">Welcome to SGA! 👋</h1>

          <p>Please sign-in to your account and start the adventure</p>
          <div class="s-pb-1">
            <small>Email</small>
          </div>
          <el-input
            v-model="user.email"
            label="Email"
            placeholder="Email"
            @keypress.enter="login"
          ></el-input>

          <div class="password s-pt-3 s-pb-1">
            <small>Password</small>
            <small><nuxt-link to="/">Forgot Password?</nuxt-link></small>
          </div>
          <el-input
            v-model="user.password"
            class="s-pb-2"
            label="Password"
            placeholder="Password"
            show-password
            @keypress.enter="login"
          ></el-input>

          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click="login"
          >
            Ingresar
          </el-button>
        </form>
      </el-col>
    </el-row>
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

<style scoped lang="scss">
.content {
  height: 100vh;
  background-repeat: no-repeat;

  .image {
    height: 100%;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    background-color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .password {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
