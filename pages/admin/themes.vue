<template>
  <div>
    <BasicCrud
      v-model="search"
      title="Temas"
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
        <el-table-column prop="abbreviated_name" label="Nombre abreviado" />
        <el-table-column prop="duration" label="Nombre abreviado" />
      </template>
    </BasicCrud>

    <el-dialog
      :title="`${item.id ? 'Editando' : 'Creando'} Tema`"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      @close="item = {}"
    >
      <el-form ref="form" :model="item" :rules="rules">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :xs="24" :md="12">
            <el-form-item label="Nombre abreviado" prop="abbreviated_name">
              <el-input v-model="item.abbreviated_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Duración" prop="duration">
              <el-time-select
                v-model="item.duration"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:59',
                }"
              >
              </el-time-select>
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
  layout: 'system-administration',
  data: () => ({
    rules: {
      name: [required],
      duration: [required],
      abbreviated_name: [required],
    },
  }),
  computed: {
    url() {
      return 'master/topics/'
    },
  },
}
</script>
