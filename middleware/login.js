export default function (ctx) {
  const auth = ctx.$auth.$state

  if (auth.loggedIn) {
    ctx.redirect('/')
  }
}
