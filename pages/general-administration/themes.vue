<template>
  <div>
    <BasicCrud
      v-model="search"
      title="Temas"
      :items="items"
      :loading="$fetchState.pending"
      :total="pagination.num_results || 0"
      :add-btn-text="!items.length ? 'Agregar' : 'Editar'"
      @add="
        dialogTranfer = true
        setSelects()
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
        <el-table-column prop="abbreviated_name" label="Nombre abreviado" />
        <el-table-column prop="duration" label="Duración" />
      </template>
    </BasicCrud>

    <ThemeForm
      v-if="dialog"
      :dialog.sync="dialog"
      :data="item"
      :loading="loading"
      @save="save({ ...$event })"
    ></ThemeForm>

    <el-dialog
      :title="`${item.id ? 'Editando' : 'Seleccionando'} Temas`"
      :visible.sync="dialogTranfer"
      :close-on-click-modal="false"
      append-to-body
      width="90%"
      @close="item = {}"
    >
      <el-button class="s-pb-3" size="small" @click="dialog = true">
        Crear
      </el-button>

      <ThemeForm
        v-if="dialog"
        :dialog.sync="dialog"
        :data="item"
        :loading="loading"
        @save="saveMaster"
      ></ThemeForm>

      <el-transfer
        v-model="selects"
        class="main-transfer"
        filterable
        :props="{
          key: 'id',
          label: 'name',
        }"
        :render-content="renderFunc"
        :titles="['disponible', 'Seleccionados']"
        :button-texts="['', '']"
        :data="items2"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
      >
      </el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTranfer = false">Cancelar</el-button>
        <el-button type="primary" :loading="loading" @click="saveList()">
          Guardar
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import crud from '@/mixins/crud-admin-g'
import transfers from '@/mixins/transfers'
import BasicCrud from '@/components/BasicCrud'
import ThemeForm from '@/components/forms/ThemeForm'
export default {
  components: { BasicCrud, ThemeForm },
  mixins: [crud, transfers],
  layout: 'general-administration',
  computed: {
    model() {
      return 'Topic'
    },
    masterUrl() {
      return 'master/topics/'
    },
    url() {
      return 'school1/core/topics/'
    },
  },
}
</script>
<style lang="scss">
.main-transfer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > .el-transfer-panel {
    width: 40% !important;
  }
  & > .el-transfer__buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & button {
      margin: 0 !important;
      width: 28px;
      padding-left: 6px;
    }
    button + button {
      margin-left: 2px !important;
    }
  }
}
</style>
