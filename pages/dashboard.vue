<template>
  <div class="ed-grid rows-gap m-gap-4 s-grid-12">
    <div
      v-for="(menu, i) in itemsMenu"
      :key="i"
      class="s-cols-12 m-cols-6 lg-cols-4 xl-cols-3"
    >
      <div class="menu-dashboard-card" @click="goRouter(menu)">
        <div class="menu-dashboard-card--content-icon">
          <i :class="menu.icon" class="menu-dashboard-card--icon"></i>
        </div>
        <h2 class="menu-dashboard-card--name">{{ menu.name }}</h2>
      </div>
    </div>
  </div>
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
.menu-dashboard-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  height: calc(45vh - 0.8rem);
  background: #fff;
  border: thin solid #0b2c2c05;
  box-shadow: 0 40px 35px -30px #0f38385c;
  border-radius: 0.428rem;
  background-clip: border-box;
  cursor: pointer;
  &--icon {
    font-size: 40px;
  }
  &--content-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-items: center;
    text-align: center;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
    background-color: rgb(0, 128, 128, 0.12);
    color: var(--primary);
    margin-bottom: 15px;
  }
  &--name {
    font-weight: 600;
    line-height: 1.2;
    font-size: 0.9rem;
    color: #5e5873;
  }
}
.main-dashboard-movil {
  .menu-dashboard-card {
    height: 120px;
    padding-top: 10px;
    padding-bottom: 10px;
    &--content-icon {
      width: 40px;
      height: 40px;
    }
    &--icon {
      font-size: 20px;
    }
  }
}
</style>
