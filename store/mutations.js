export default {
  SHOW_SNACKBAR(state, payload) {
    state.notification = JSON.parse(JSON.stringify(payload))
  },
}
