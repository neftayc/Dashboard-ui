export default {
  data: () => ({
    selects: [],
    dialogTranfer: false,
    items2: [],
    renderFunc(h, option) {
      return <span> {option.name}</span>
    },
  }),
  mounted() {
    this.getMaster()
  },
  methods: {
    async saveMaster(v) {
      await this.save({ ...v })
      await this.getMaster()
      setTimeout(() => {
        this.setSelects()
      }, 100)
    },
    async getMaster() {
      await this.$axios
        .get(this.masterUrl, { params: { page_size: 100 } })
        .then((x) => {
          this.items2 = x.data.results
        })
        .catch((_) => {})
    },
    async saveList() {
      this.loading = true
      await this.$axios
        .post(`/school1/core/list_update/`, {
          model: this.model,
          elem_list: this.selects.map((x) => ({
            id: x,
            ...this.items2.find((y) => y.id === x),
          })),
        })
        .then((x) => {
          this.dialogTranfer = false

          this.clear()
        })
        .catch((_) => {})
      this.loading = false
    },
    setSelects() {
      this.selects = this.items.map((x) => x.global_id)
    },
  },
}
