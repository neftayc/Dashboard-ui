<template>
  <div>
    <BasicCrud
      v-model="search"
      title="Áreas de Conocimiento"
      :items="items"
      :loading="$fetchState.pending"
      :total="pagination.num_results || 0"
      @add="
        dialog = true
        item = {}
      "
      @edit="editItem($event.row)"
      @delete="deleteItem($event.row.id)"
    >
      <template #search>
        <el-input
          v-model="search"
          style="max-width: 200px"
          placeholder="Search"
        ></el-input>
      </template>
      <template #pagination>
        <el-pagination
          v-model="page"
          small
          layout="prev, pager, next"
          :total="pagination.num_results || 0"
          :page-size="pagination.page_size || 0"
          :current-page="page"
          :pager-count="5"
          @current-change="currentChange"
        >
        </el-pagination>
      </template>

      <template #size>
        <el-select v-model="size" style="width: 70px">
          <el-option label="10" value="10"></el-option>
          <el-option label="20" value="20"></el-option>
          <el-option label="30" value="30"></el-option>
        </el-select>
      </template>
      <template #columns>
        <el-table-column prop="name" label="Nombre" />
      </template>
    </BasicCrud>

    <AreaForm
      v-if="dialog"
      :dialog.sync="dialog"
      :data="item"
      :loading="loading"
      @save="save({ ...$event })"
    ></AreaForm>
  </div>
</template>

<script>
import crud from '@/mixins/crud-admin-g'
import BasicCrud from '@/components/BasicCrud'
import AreaForm from '@/components/forms/AreaForm'

export default {
  components: { BasicCrud, AreaForm },
  mixins: [crud],
  layout: 'system-administration',
  computed: {
    url() {
      return 'master/knowledge-areas/'
    },
  },
}
</script>
