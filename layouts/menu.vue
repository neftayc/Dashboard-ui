<template>
  <div class="ed-grid s-grid-12 xl-grid-9 m-gap-2 s-cross-center full">
    <header
      v-if="!isHideDrawer"
      class="s-cols-12 s-bg-white s-w-full s-fixed s-left-0 s-top-0 s-z-fixed s-cross-center navigator-header-dashboard"
      height="75px"
    >
      <div class="ed-grid full s-px-1">
        <div class="content s-cross-center">
          <div class="ed-grid s-grid-12">
            <div class="s-cols-6 s-cross-center s-mr-4">
              <div class="s-pr-1" style="border-right: 1px solid #edf1f7">
                <el-button
                  icon="el-icon-s-fold"
                  type="primary"
                  plain
                  circle
                  @click="
                    isHideDrawer
                      ? collapseMenu(isCollapse)
                      : ((drawer = true), (isCollapse = false))
                  "
                ></el-button>
              </div>
              <div v-if="isHideDrawer" class="s-pl-1">
                Administración General
              </div>
            </div>
            <div class="s-cols-6 s-cross-center s-main-end nowrap">
              <template v-if="isHideDrawer">
                <el-avatar
                  :src="require('@/assets/images/user.png')"
                  class="s-mr-2"
                ></el-avatar>
                <el-dropdown class="s-mr-2">
                  <span>
                    Rosbel Ccana
                    <i class="el-icon-arrow-down el-icon--right black"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <el-dropdown v-else class="s-mr-1">
                <el-avatar
                  :src="require('@/assets/images/user.png')"
                ></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Perfil del usuario</el-dropdown-item>
                  <el-dropdown-item>Configuraciones</el-dropdown-item>
                  <el-dropdown-item>Cambiar contraseña</el-dropdown-item>
                  <el-dropdown-item divided>
                    <span @click="$router.push('/dashboard')">
                      Ver Módulos
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item divided>Cerrar Sesión</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>

    <el-drawer
      v-if="!isHideDrawer"
      :visible.sync="drawer"
      :with-header="false"
      size="300px"
      direction="ltr"
      title="Administración General"
    >
      <div class="side-dashboard">
        <div class="side-dashboard--header">
          <el-avatar
            style="background: transparent"
            shape="square"
            :size="60"
            :src="require('@/assets/images/logo.png')"
          ></el-avatar>
          <h2 style="font-size: 1rem; color: black" class="s-pt-2">
            Universidad de Madrid
          </h2>
        </div>
        <div class="side-dashboard--body">
          <el-avatar
            style="background: transparent"
            :size="50"
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
    </el-drawer>
    <div
      class="main-dashboard"
      :class="
        isHideDrawer
          ? 's-cols-8 lg-cols-9 xl-cols-7 s-pxy-4'
          : 's-cols-12 s-py-4 s-px-2 main-dashboard-movil'
      "
    >
      <div v-if="!isHideDrawer" class="header-navbar-shadow"></div>
      <Nuxt />
    </div>
    <div
      v-if="isHideDrawer"
      class="s-cols-4 lg-cols-3 xl-cols-2 bg-primary side-dashboard"
    >
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
  middleware: ['auth'],

  data: () => ({
    defaultActive: '1',
    drawer: false,
  }),
  computed: {
    ...mapState(['itemsMenu']),
    isHideDrawer() {
      return this.$breakpoints.lMd
    },
  },
}
</script>
<style lang="scss">
.navigator-header-dashboard {
  background: #fff;
  position: fixed;
  width: calc(100% - 2rem);
  z-index: 12;
  min-height: 4.45rem;
  transition: all 0.2s ease, background 0s;
  margin: 1.3rem 1rem 0;
  border-radius: 0.428rem;
  right: 0;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
.main-dashboard {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;
  position: relative;
  &.main-dashboard-movil {
    padding-top: 7.75rem !important;
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100%;
  }

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
