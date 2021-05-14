export default function (ctx) {
  ctx.$axios.onError((e) => {
    const { config, data } = e.response
    // const url = config.url

    const detail = data.detail || ''

    switch (config.method) {
      case 'patch':
        ctx.store.commit('SHOW_SNACKBAR', {
          color: 'error',
          message: detail ?? 'Error editing!',
        })
        break

      case 'post':
        ctx.store.commit('SHOW_SNACKBAR', {
          color: 'error',
          message: detail ?? 'Error creating!',
        })
        break

      case 'delete':
        ctx.store.commit('SHOW_SNACKBAR', {
          color: 'error',
          message: detail ?? 'Error deleting!',
        })
        break

      default:
        break
    }
  })

  ctx.$axios.onResponse((x) => {
    const method = x.config.method
    const detail = x.data.detail
    // const url = x.config.url
    // const query = ctx.route.name
    const type = 'SUCCESS'
    const title = 'Success'
    switch (method) {
      case 'post':
        ctx.store.commit('SHOW_SNACKBAR', {
          type,
          title,
          message: detail ?? 'Successfully Created!',
        })
        break

      case 'put':
        ctx.store.commit('SHOW_SNACKBAR', {
          type,
          title,
          message: detail ?? 'Successfully Edit!',
        })
        break

      case 'delete':
        ctx.store.commit('SHOW_SNACKBAR', {
          type,
          title,
          message: detail ?? 'Successfully Deleted!',
        })
        break

      default:
        break
    }
  })
}
