<template>
  <div>
    <el-card style="border-radius: 5px">
      <div>
        <el-input v-model="search" placeholder="Search"></el-input>
      </div>

      <el-table
        v-loading="$fetchState.pending"
        :data="items"
        style="width: 100%"
        border
      >
        <el-table-column fixed prop="updatedAt" label="Fecha" min-width="150">
        </el-table-column>
        <el-table-column prop="title" label="Nombre" min-width="120">
        </el-table-column>
        <el-table-column prop="countries" label="Estado" min-width="120">
        </el-table-column>
        <el-table-column prop="continent" label="Ciudad" min-width="120">
        </el-table-column>
        <el-table-column prop="height" label="Código postal" min-width="120">
        </el-table-column>
        <el-table-column fixed="right" label="Operaciones" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">Editar</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteItem(scope.row.id)"
            >
              Eliminar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div>
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
