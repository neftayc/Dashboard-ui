<template>
  <div>
    <BasicCrud
      v-model="search"
      :items="items"
      :loading="$fetchState.pending"
      :total="items.length"
      @add="dialog = true"
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
          :total="50"
          :current-page="page"
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
        <el-table-column prop="title" label="Nombre" />
        <el-table-column prop="countries" label="Estado" min-width="120" />
        <el-table-column prop="continent" label="Ciudad" min-width="120" />
        <el-table-column
          prop="height"
          label="Código postal"
          sortable
          min-width="140"
        />
      </template>
    </BasicCrud>

    <el-dialog
      title="Shipping address"
      :visible.sync="dialog"
      :close-on-click-modal="false"
    >
      <el-form :model="item">
        <el-form-item label="Promotion name">
          <el-input v-model="item.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Zones">
          <el-select v-model="item.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Cancelar</el-button>
        <el-button type="primary" :loading="loading" @click="save">
          Guardar
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import crud from '@/mixins/crud-admin-g'
import BasicCrud from '@/components/BasicCrud'
export default {
  components: { BasicCrud },
  mixins: [crud],
  layout: 'general-administration',
  computed: {
    url() {
      return 'https://api.nuxtjs.dev/posts'
    },
  },
}
</script>
