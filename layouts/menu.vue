<template>
  <el-container>
    <el-main class="main-dashboard">
      <Nuxt />
    </el-main>
    <el-aside width="300px" class="bg-primary side-dashboard">
      <div class="side-dashboard--header">
        <span>Logo</span>
      </div>
      <div class="side-dashboard--body">
        <img
          class="side-dashboard--body-image"
          :src="require('@/assets/images/user.png')"
          alt="User"
        />
        <p class="side-dashboard--body-name">User name</p>
        <p class="side-dashboard--body-inst">Institución</p>
        <div class="side-dashboard--body-actions">
          <el-button type="warning" round @click="$auth.logout()">
            Cerrar Sesión</el-button
          >
          <span>Cambiar contraseña</span>
        </div>
      </div>
      <div class="side-dashboard--footer"></div>
    </el-aside>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],

  data: () => ({
    defaultActive: '1',
  }),
  computed: {
    ...mapState(['itemsMenu']),
  },
}
</script>
<style lang="scss">
html,
* {
  padding: 0;
  margin: 0;
}
.bg-primary {
  background-color: #545c64;
}
.main-dashboard {
  background-image: url('./assets/images/fondo.jpg');
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.side-dashboard {
  background: linear-gradient(to bottom right, #222b45, #000);
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
  color: #fff;
  font-family: Open Sans, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  &--header {
    padding: 50px 0;
    span {
      font-size: 3rem;
    }
  }
  &--body {
    &-image {
      width: 50%;
      height: auto;
    }
    &-name {
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 2rem;
    }
    &-inst {
      font-size: 0.9375rem;
      font-weight: 400;
      line-height: 1.25rem;
    }

    &-actions {
      margin-top: 30px;
      & > span {
        display: block;
        margin-top: 10px;
        font-size: 0.6rem;
        line-height: 1.25rem;
      }
    }
  }
}
</style>
