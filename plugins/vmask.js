import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask, {
  placeholders: {
    z: /[0-2]/,
    y: /[0-3]/,
    q: /[0-5]/,
    x: /[0-9]/,
  },
})
