<template>
  <div class="s-pxy-2">
    <header
      class="s-bg-white s-w-full s-fixed s-left-0 s-top-0 s-z-fixed s-cross-center navigator-header"
      height="75px"
    >
      <div class="ed-grid full s-px-1">
        <div class="content s-cross-center">
          <div class="ed-grid s-grid-7">
            <div class="s-cols-2 s-cross-center s-mr-4">
              <div
                style="padding-right: 1.25rem; border-right: 1px solid #edf1f7"
              >
                <el-button
                  icon="el-icon-menu"
                  circle
                  @click="collapseMenu(isCollapse)"
                ></el-button>
              </div>
              <div>
                <div class="main-logo">
                  <nuxt-link to="/dashboard">
                    <img
                      :src="require('@/assets/images/main-logo.png')"
                      alt="main-logo"
                    />
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="s-cols-1 s-main-center"></div>
            <div class="s-cols-4 s-cross-center s-main-end nowrap">
              <el-avatar
                :src="require('@/assets/images/user.png')"
                class="s-mr-2"
              ></el-avatar>
              <el-dropdown>
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
            </div>
          </div>
        </div>
      </div>
    </header>
    <el-aside :width="isCollapse ? 'auto' : '300px'" class="navigator-aside">
      <el-menu
        :default-active="defaultActive"
        router
        class="main-side-menu"
        text-color="#000"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :index="`${index}`"
          :route="item.path"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main
      class="navigator-main full"
      :class="isCollapse ? 'navigator-main-full' : ''"
    >
      <Nuxt />
    </el-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    defaultActive: '1',
    isCollapse: false,
  }),
  computed: {
    ...mapState({
      menu: (s) => s.itemsMenu[1].children,
    }),
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
.navigator-header {
  box-shadow: -1px -10px 13px 5px #d1d0d0;
  border-radius: 0.5rem;
  position: fixed;
  width: calc(100% - 32px);
  z-index: 1;
}
.navigator-aside {
  position: fixed;
  height: calc(100vh - 75px - 1rem - 32px);
  padding-top: calc(75px + 1rem);
  border-radius: 0.5rem;
  .main-side-menu {
    border-radius: inherit;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.25rem;
    border-right: 0 !important;

    &:not(.el-menu--collapse) {
      width: 300px;
      min-height: 400px;
    }
  }
}
.navigator-main {
  padding: 0;
  margin-top: calc(75px + 1rem);
  border-radius: 5px;
  padding-left: var(--sidebar-collapse-width);
  height: calc(100vh - 75px - 2rem - 32px);
  overflow-y: scroll;
  transition: width 2s;
}
.navigator-main-full {
  padding-left: calc(64px + 1rem);
}

.el-aside {
  background: #edf1f7;
}
.main-content-app {
  background: #edf1f7;
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
</style>
