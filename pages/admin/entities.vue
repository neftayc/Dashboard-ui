<template>
  <div>
    <BasicCrud
      v-model="search"
      title="Entidades"
      :items="items"
      :loading="$fetchState.pending"
      :total="pagination.num_results || 0"
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
        <el-table-column prop="cif" label="CIF" />
        <el-table-column prop="acronym" label="Acrónimo" />
        <el-table-column prop="category.name" label="Categoría" />
        <el-table-column prop="type.name" label="Tipo" />
      </template>
    </BasicCrud>

    <el-dialog
      :title="`${item.id ? 'Editando' : 'Creando'} Entidad`"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      @close="item = {}"
    >
      <el-form ref="form" :model="item" :rules="rules">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-row class="mt-10" :gutter="20">
          <el-col :xs="24" :md="12">
            <el-form-item label="CIF" prop="cif">
              <el-input v-model="item.cif"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Acrónimo" prop="acronym">
              <el-input v-model="item.acronym"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Tipo" prop="category">
              <el-select v-model="item.category" value-key="id">
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                  :value-key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Categoría" prop="category">
              <el-select v-model="item.type" value-key="id">
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
const required = {
  required: true,
  message: 'Campo requerido',
  trigger: 'blur',
}
export default {
  components: { BasicCrud },
  mixins: [crud],
  layout: 'general-administration',
  data: () => ({
    categories: [],
    rules: {
      name: [required],
      type: [required],
      cif: [required],
      acronym: [required],
      category: [required],
    },
  }),
  computed: {
    url() {
      return 'master/entities/'
    },
  },
  created() {
    this.getEntities()
  },
  methods: {
    getEntities() {
      this.$axios
        .get(`constants/entities/`)
        .then((x) => {
          this.categories = x.data
        })
        .catch(() => {})
    },
  },
}
</script>
