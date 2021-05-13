<template>
  <div class="ed-grid s-grid-12 xl-grid-9 s-cross-center full">
    <div class="s-cols-8 lg-cols-9 xl-cols-7 main-dashboard s-pxy-4">
      <Nuxt />
    </div>
    <div class="s-cols-4 lg-cols-3 xl-cols-2 bg-primary side-dashboard">
      <div class="side-dashboard--header">
        <el-avatar
          style="background: transparent"
          shape="square"
          :size="130"
          :src="require('@/assets/images/logo.png')"
        ></el-avatar>
        <h2 style="font-size: 1rem; color: black" class="s-pt-2">
          Universidad de Madrid
        </h2>
      </div>
      <div class="side-dashboard--body">
        <el-avatar
          style="background: transparent"
          :size="80"
          :src="require('@/assets/images/user.png')"
        ></el-avatar>
        <div class="side-dashboard--body-name">Rosbel Ccana</div>
        <p class="side-dashboard--body-inst">rusbel.ccana@gmail.com</p>
        <div class="side-dashboard--body-actions s-pt-4">
          <el-button type="primary" round @click="$auth.logout()">
            Cerrar Sesión
          </el-button>
          <span>(Cambiar contraseña)</span>
        </div>
      </div>
      <div class="side-dashboard--footer"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: [],

  data: () => ({
    defaultActive: '1',
  }),
  computed: {
    ...mapState(['itemsMenu']),
  },
}
</script>
<style lang="scss">
.main-dashboard {
  width: 100%;
  overflow-y: auto;
  max-height: 100vh;
  position: relative;

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb(207, 207, 207);
    border-radius: 4px;
    height: 100px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgb(143, 143, 143);
    border-radius: 4px;
  }
}

.side-dashboard {
  background: linear-gradient(to bottom right, var(--primary), #1a1f33);
  box-shadow: 0 0.5rem 1rem 0 #083d3d;
  margin-left: auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
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
      font-size: 1.2rem;
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
        margin-top: 5px;
        font-size: 0.6rem;
        line-height: 1.25rem;
      }
    }
  }
}
</style>
