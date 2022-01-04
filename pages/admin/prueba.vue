<template>
  <div>
    <el-table
      v-loading="loading"
      :data="items"
      style="width: 100%"
      :default-sort="{ prop: 'height', order: 'descending' }"
    >
      <el-table-column prop="PropertyType" label="PropertyType" />
      <el-table-column prop="UnparsedAddress" label="Address" />
      <el-table-column prop="PostalCode" label="PostalCode" />
      <el-table-column
        prop="ListAgentStateLicense"
        label="ListAgentStateLicense"
      />
      <el-table-column prop="ParcelNumber" label="ParcelNumber" />
    </el-table>
    <el-pagination
      v-model="pageCount"
      small
      layout="prev, pager, next"
      :total="pagination || 0"
      :page-size="200 || 0"
      :current-page="pageCount"
      :pager-count="5"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  layout: 'system-administration',
  asyncData({ query }) {
    return {
      page: query.page ? parseInt(query.page) : 1,
      search: query.search ?? '',
      size: query.size ?? '10',
    }
  },
  fetchOnServer: false,
  data: () => ({
    page: 1,
    search: '',
    pagination: 0,
    items: [],
    item: {},
    loading: false,
    size: 10,
    dLoading: false,
    dialog: false,
    pageCount: 1,

    datos: [],
  }),
  async mounted() {
    const { bundle } = await Axios.get(
      'https://api.bridgedataoutput.com/api/v2/miamire/listings/',
      {
        params: {
          access_token: '58ac03a50942a54acd46b5612abaa69e',
          limit: 200,
          fields:
            'ListAgentStateLicense,Address,PostalCode,ParcelNumber,PropertyType',
        },
      }
    )
      .then((x) => x.data)
      .catch(() => null)

    this.items = bundle
    this.ejecute()
  },
  methods: {
    // 752155
    async currentChange(event) {
      console.log('primer event', event)
      let count = 0
      if (event !== 1) {
        count += 200
      }

      const { bundle } = await Axios.get(
        'https://api.bridgedataoutput.com/api/v2/miamire/listings/',
        {
          params: {
            access_token: '58ac03a50942a54acd46b5612abaa69e',
            limit: 200,
            offset: count,
            fields:
              'ListAgentStateLicense,Address,PostalCode,ParcelNumber,PropertyType',
          },
        }
      )
        .then((x) => x.data)
        .catch(() => null)

      this.datos.push(...bundle)
      console.log(this.datos)
    },

    async ejecute() {
      for (let i = 0; i < 100; i++) {
        await this.currentChange(i + 1)
        if (i + 1 === 100) {
          const groupBy = function (miarray, prop) {
            return miarray.reduce(function (groups, item) {
              const val = item[prop]
              groups[val] = groups[val] || {
                date: item.PropertyType,
                ListAgentStateLicense: '',
                Address: '',
              }
              groups[val].ListAgentStateLicense += item.ListAgentStateLicense
              groups[val].Address += item.Address
              return groups
            }, {})
          }

          console.log(groupBy(this.datos, 'PropertyType'))
        }
      }
    },
  },
}
</script>
