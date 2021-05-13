export default {
  asyncData({ query }) {
    return {
      page: query.page ? parseInt(query.page) : 1,
      search: query.search ?? '',
    }
  },
  async fetch() {
    this.items = await this.$axios
      .get(this.url, {
        params: {
          page: this.page,
          search: this.search,
        },
      })
      .then((x) => x.data)
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
  watch: {
    '$route.query': '$fetch',
    search(v) {
      if (v) {
        this.$router.push({ query: { search: v, page: this.page ?? 1 } })
      } else {
        this.$router.push({ query: { page: this.page ?? 1 } })
      }
    },
  },
  methods: {
    async save() {
      this.loading = true
      if (this.item.id) {
        await this.$axios
          .put(`${this.url}/${this.item.id}`, this.item)
          .then(() => {
            this.dialog = true
            this.clear()
          })
          .catch(() => {})
      } else {
        await this.$axios
          .post(`${this.url}`, this.item)
          .then(() => {
            this.dialog = true
            this.clear()
          })
          .catch(() => {})
      }
      this.loading = false
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
            .delete(`${this.url}/${id}`)
            .then(() => {
              this.$fetch()
              this.$message({
                type: 'success',
                message: 'Delete completed',
              })
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    clear() {
      this.item = {}
    },

    currentChange(v) {
      this.page = v
      this.$router.push({ query: { page: v } })
    },
  },
}
