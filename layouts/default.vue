<template>
  <div>
    <el-container>
      <el-header class="bg-primary">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-submenu index="2">
            <template slot="title">Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >Orders</a
            ></el-menu-item
          >
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-submenu
              v-for="(item, index) in itemsMenu"
              :key="index"
              :index="`${index}`"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="(sub, i) in item.children"
                :key="i"
                index="1-1"
              >
                <template slot="title">
                  <i :class="sub.icon"></i>
                  <span>{{ sub.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <Nuxt />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
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
</style>
