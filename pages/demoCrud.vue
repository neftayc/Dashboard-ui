<template>
  <div>
    <el-card style="border-radius: 5px">
      <p>Crud demo</p>
      <div class="s-mb-2 header">
        <el-button type="primary" @click="dialog = true">Agregar</el-button>

        <div class="search">
          <small class="s-pr-2">Search</small>
          <el-input
            v-model="search"
            style="max-width: 200px"
            placeholder="Search"
          ></el-input>
        </div>
      </div>

      <el-table
        v-loading="$fetchState.pending"
        :data="items"
        style="width: 100%"
        height="450"
        :default-sort="{ prop: 'height', order: 'descending' }"
      >
        <el-table-column fixed prop="updatedAt" label="Fecha" min-width="150">
        </el-table-column>
        <el-table-column prop="title" label="Nombre" min-width="120">
        </el-table-column>
        <el-table-column prop="countries" label="Estado" min-width="120">
        </el-table-column>
        <el-table-column prop="continent" label="Ciudad" min-width="120">
        </el-table-column>
        <el-table-column
          prop="height"
          label="Código postal"
          sortable
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="Acciones"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="dialog = true"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteItem(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="s-pt-3 footer">
        <div class="size">
          <small class="s-pr-1">Rows per page</small>
          <el-select v-model="size" style="width: 70px">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="30" value="30"></el-option>
          </el-select>
          <small class="s-pl-1"> Total 110</small>
        </div>
        <el-pagination
          v-model="page"
          small
          layout="prev, pager, next"
          :total="50"
          :current-page="page"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>

      <el-dialog
        title="Shipping address"
        :visible.sync="dialog"
        :close-on-click-modal="false"
      >
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="item.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="item.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">Cancelar</el-button>
          <el-button type="primary" :loading="loading" @click="dialog = false">
            Guardar
          </el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import crud from '@/mixins/crud-admin-g'
export default {
  mixins: [crud],
  layout: 'general-administration',
  computed: {
    url() {
      return 'https://api.nuxtjs.dev/posts'
    },
  },
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    display: flex;
    align-items: center;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .size {
    display: flex;
    align-items: center;
  }
}
</style>
