<template>
  <el-container>
    <el-row :gutter="20" align="center">
      <el-col
        v-for="(menu, i) in itemsMenu"
        :key="i"
        :span="6"
        style="padding-top: 10px; padding-bottom: 10px; display: flex"
      >
        <div class="menu-dashboard-card" @click="goRouter(menu)">
          <i :class="menu.icon" class="menu-dashboard-card--icon"></i>
          <div class="menu-dashboard-card--name">{{ menu.name }}</div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'menu',
  data: () => ({}),
  computed: {
    ...mapState(['itemsMenu']),
  },
  methods: {
    goRouter(item) {
      this.$router.push(item.path)
      console.log('click')
    },
  },
}
</script>
<style lang="scss">
$height: calc(50vh - 40px);
.menu-dashboard-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  background: #000;
  opacity: 0.7;
  border: 0 solid transparent;
  border-radius: 0.35rem;
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
  color: #fff;
  font-family: Open Sans, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  height: $height;
  cursor: pointer;
  &--icon {
    font-size: 50px;
  }
  &--name {
    margin-top: 10px;
    font-weight: 500;
  }
}
</style>
