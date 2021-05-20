<template>
  <el-container>
    <el-drawer
      v-if="!isHideDrawer"
      :visible.sync="drawer"
      :with-header="false"
      size="300px"
      direction="ltr"
      title="Administración General"
      ><el-aside
        :width="isCollapse ? 'auto' : '300px'"
        class="navigator-aside to-lg"
      >
        <div class="s-pt-4 s-pb-2 s-center">
          <el-avatar
            class="s-block-center"
            :class="isCollapse ? '' : 's-mb-2'"
            :size="isCollapse ? 40 : 70"
            shape="square"
            :src="require('@/assets/images/logo.png')"
            alt=""
            style="background: transparent"
          ></el-avatar>
          <div
            v-if="!isCollapse"
            style="
              color: var(--primary);
              font-weight: 600;
              font-size: 0.8rem;
              line-height: 2;
            "
          >
            Universidad de Madrid
          </div>
        </div>
        <div class="s-mb-3 s-border-bottom"></div>
        <div class="s-center s-mb-4" style="font-weight: 600">
          Módulo <br />
          Administración del Sistema
        </div>
        <el-menu
          :default-active="defaultActive"
          router
          class="main-side-menu"
          text-color="#000"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item
            v-for="(item, index) in menu"
            :key="index"
            :index="`${index}`"
            :route="item.path"
            :class="isCollapse ? 'is-collapse' : ''"
            @click="drawer = false"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-drawer>

    <el-aside
      v-if="isHideDrawer"
      :width="isCollapse ? 'auto' : '300px'"
      class="navigator-aside"
    >
      <div class="s-pt-4 s-pb-2 s-center">
        <el-avatar
          class="s-block-center"
          :class="isCollapse ? '' : 's-mb-2'"
          :size="isCollapse ? 40 : 70"
          shape="square"
          :src="require('@/assets/images/logo.png')"
          alt=""
          style="background: transparent"
        ></el-avatar>
        <div
          v-if="!isCollapse"
          style="
            color: var(--primary);
            font-weight: 600;
            font-size: 0.8rem;
            line-height: 2;
          "
        >
          Universidad de Madrid
        </div>
      </div>
      <div class="s-mb-4 s-border-bottom"></div>
      <el-menu
        :default-active="defaultActive"
        router
        class="main-side-menu"
        text-color="#000"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :index="`${index}`"
          :route="item.path"
          :class="isCollapse ? 'is-collapse' : ''"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <header
      class="s-bg-white s-w-full s-fixed s-left-0 s-top-0 s-z-fixed s-cross-center navigator-header"
      :class="
        !isHideDrawer
          ? 'navigator-header-extra-full'
          : isCollapse
          ? 'navigator-header-full'
          : ''
      "
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
                Administración del Sistema
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
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Ver Modulos"
                  placement="bottom"
                >
                  <i
                    class="el-icon-s-grid"
                    style="
                      font-size: 1.8rem;
                      color: var(--primary);
                      cursor: pointer;
                    "
                    @click="$router.push('/dashboard')"
                  ></i>
                </el-tooltip>
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
    <el-main
      class="navigator-main full"
      :class="
        !isHideDrawer
          ? 'navigator-main-extra-full'
          : isCollapse
          ? 'navigator-main-full'
          : ''
      "
    >
      <div class="header-navbar-shadow"></div>
      <Nuxt />
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],
  data: () => ({
    defaultActive: '0',
    isCollapse: false,
    drawer: true,
  }),
  computed: {
    ...mapState({
      menu: (s) => s.itemsMenu[0].children,
    }),
    isHideDrawer() {
      return this.$breakpoints.lMd
    },
  },
  methods: {
    collapseMenu() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
<style lang="scss">
:root {
  --sidebar-collapse-width: calc(300px + 1rem);
}
.header-navbar-shadow {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(44%, hsla(0, 0%, 97.3%, 0.95)),
    color-stop(73%, hsla(0, 0%, 97.3%, 0.46)),
    to(hsla(0, 0%, 100%, 0))
  );
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 97.3%, 0.95) 44%,
    hsla(0, 0%, 97.3%, 0.46) 73%,
    hsla(0, 0%, 100%, 0)
  );
  left: 0;
  display: block;
  width: 100%;
  height: 102px;
  position: fixed;
  top: 0;
  z-index: 11;
  padding-top: 2.2rem;
}

.navigator-header {
  position: fixed;
  width: calc(100% - 4rem - 300px);
  z-index: 12;
  min-height: 4.45rem;
  transition: all 0.2s ease, background 0s;
  margin: 1.3rem 2rem 0;
  border-radius: 0.428rem;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  &.navigator-header-full {
    width: calc(100% - 4rem - 64px);
  }
  &.navigator-header-extra-full {
    margin: 1.3rem 1rem 0;
    width: calc(100% - 2rem);
  }
}
.navigator-aside {
  position: fixed;
  z-index: 1031;
  display: table-cell;
  height: 100%;
  box-shadow: 0 0 15px 0 rgb(34 41 47 / 5%);
  background: #fff !important;
  & .el-menu {
    border-right: 0 !important;
    box-shadow: 0;
    background: transparent !important;
    & .is-active {
      outline: 0;
      font-weight: 500;
      margin-left: 10px;
      margin-right: 10px;
      padding: 0;
      color: #fff !important;
      padding-left: 10px !important;
      box-shadow: 0 0 10px 1px rgb(0, 128, 128, 0.7);
      border-radius: 4px;
      background: linear-gradient(
        118deg,
        var(--primary),
        rgba(0, 128, 128, 0.7)
      );
    }
    & .is-collapse.is-active .el-tooltip {
      padding-left: 10px !important;
    }
    .el-menu-item {
      transition: transform 0.25s ease, -webkit-transform 0.25s ease;
      &:hover {
        background-color: transparent;

        & > * {
          transition: transform 0.25s ease, -webkit-transform 0.25s ease;
          transform: translateX(5px);
        }
      }
    }
  }
}
.navigator-main {
  padding: 7.75rem 2rem 0 !important;
  margin-left: 300px;
  position: relative;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  min-height: calc(100% - 3.35rem);
  width: calc(100% - 4rem - 64px);
  &.navigator-main-full {
    margin-left: 64px;
    width: calc(100% - 4rem - 64px);
  }

  &.navigator-main-extra-full {
    padding: 7.75rem 1rem 0 !important;
    margin-left: 0;
    width: 100%;
  }
}
.main-logo {
  padding: 0 1.25rem;
  font-size: 1.75rem;
  white-space: nowrap;
  text-decoration: none;
  height: 60px;
  width: auto;
  img {
    height: 100%;
  }
}
.header-main-info-user {
  font-size: 1.1rem;
  padding-left: 10px;
  color: white;
  & > div {
    color: black;
    font-size: 0.8rem;
  }
}
.s-border-bottom {
  border-bottom: thin solid var(--primary);
  opacity: 0.2;
}
</style>
