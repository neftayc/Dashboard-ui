<template>
  <el-container>
    <el-header
      class="bg-primary"
      height="75px"
      width="100%"
      style="display: flex; align-items: center"
    >
      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        style="width: 100%"
      >
        <el-row type="flex" align="middle">
          <div style="padding-right: 1.25rem; border-right: 1px solid #edf1f7">
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
        </el-row>
        <el-row type="flex" align="middle">
          <img
            height="60px"
            :src="require('@/assets/images/user.png')"
            alt="user-logo"
          />
          <div class="header-main-info-user">
            Rosbel Ccana
            <div>Universidad - 2020</div>
          </div>
        </el-row>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px" style="height: calc(100vh - 75px)">
        <el-menu
          :default-active="defaultActive"
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
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],

  data: () => ({
    defaultActive: '1',
    isCollapse: false,
  }),
  computed: {
    ...mapState({
      menu: (s) => s.itemsMenu[0].children,
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
<style lang="scss" scoped>
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
.main-side-menu {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
