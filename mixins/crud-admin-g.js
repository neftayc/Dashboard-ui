import { mapState } from 'vuex'

export default {
  asyncData({ query }) {
    return {
      page: query.page ? parseInt(query.page) : 1,
      search: query.search ?? '',
      size: query.size ?? '10',
    }
  },
  async fetch() {
    const { pagination, results } = await this.$axios
      .get(this.url, {
        params: {
          page: this.page,
          page_size: this.size || 10,
          search: this.search,
        },
      })
      .then((x) => x.data)
      .catch(() => null)

    this.items = results || []
    this.pagination = pagination || {}
  },
  fetchOnServer: false,
  data: () => ({
    page: 1,
    search: '',
    pagination: {},
    items: [],
    item: {},
    loading: false,
    size: 10,
    dLoading: false,
    dialog: false,
  }),
  computed: {
    ...mapState({
      notification: (state) => state.notification,
    }),
  },
  watch: {
    notification(v) {
      if (v.type === 'SUCCESS') {
        this.$notify.success({
          title: v.title,
          message: v.message,
        })
      } else if (v.type === 'ERROR') {
        this.$notify.error({
          title: v.title,
          message: v.message,
        })
      }
    },
    '$route.query': '$fetch',
    search(v) {
      if (v.length) {
        this.$router.push({
          query: { search: v, page: this.page ?? 1, size: this.size },
        })
      } else {
        this.$router.push({ query: { page: this.page ?? 1 } })
      }
    },
    size(v) {
      this.$router.push({
        query: { page: this.page ?? 1, size: v, search: this.search },
      })
    },
  },

  methods: {
    editItem(item) {
      this.dialog = true
      this.item = { ...item }
    },

    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          if (this.item.id) {
            await this.$axios
              .put(`${this.url}${this.item.id}`, this.item)
              .then(() => {
                this.dialog = false
                this.clear()
              })
              .catch(() => {})
          } else {
            await this.$axios
              .post(`${this.url}`, this.item)
              .then(() => {
                this.dialog = false
                this.clear()
              })
              .catch(() => {})
          }
          this.loading = false
        }
      })
    },
    deleteItem(id) {
      this.$confirm(
        'Ésto eliminará permanentemente el registro. Continuar?',
        'Alerta!',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        }
      )
        .then(async () => {
          await this.$axios
            .delete(`${this.url}${id}`)
            .then(() => {
              this.$fetch()
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    clear() {
      this.item = {}
      this.$fetch()
    },

    currentChange(v) {
      this.page = v
      this.$router.push({ query: { page: v } })
    },
  },
}
