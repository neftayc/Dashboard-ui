<template>
  <div>
    <BasicCrud
      v-model="search"
      title="Áreas de Enseñanza"
      :items="items"
      :loading="$fetchState.pending"
      :total="pagination.num_results || 0"
      :show-edit="false"
      :add-btn-text="!items.length ? 'Agregar' : 'Editar'"
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
      </template>
    </BasicCrud>

    <el-dialog
      :title="`${item.id ? 'Editando' : 'Seleccionado'} Áreas de Enseñanza`"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      @close="item = {}"
    >
      <el-transfer
        v-model="value"
        class="main-transfer"
        filterable
        :render-content="renderFunc"
        :titles="[
          'Áreas de Enseñanza disponible',
          'Áreas de Enseñanza elegidos',
        ]"
        :button-texts="['', '']"
        :data="teachingAreasGlobal"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
      >
      </el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Cancelar</el-button>
        <el-button type="primary" :loading="loading" @click="saveList()">
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
  data() {
    return {
      value: [1],
      teachingAreasGlobal: [],
      renderFunc(h, option) {
        return <span> {option.name}</span>
      },
    }
  },

  computed: {
    url() {
      return 'school1/core/teaching-areas/'
    },
  },
  watch: {
    items(v) {
      this.editList()
    },
  },
  async mounted() {
    this.item = { elements: [] }
    await this.$axios
      .get('master/teaching-areas/', { params: { page_size: 100 } })
      .then((x) => {
        this.teachingAreasGlobal = JSON.parse(
          JSON.stringify(
            x.data.results.map((x, i) => ({
              ...x,
              label: x.name,
              key: i + 1,
              disabled: false,
            }))
          )
        )
        setTimeout(() => {
          this.editList()
        }, 3000)
      })
      .catch((_) => {})
  },
  methods: {
    saveList() {
      for (let i = 0; i < this.value.length; i++) {
        const element = this.value[i]
        this.$axios
          .post(
            this.url,
            this.teachingAreasGlobal.find((x) => x.key === element)
          )
          .then((x) => {
            this.dialog = false
            this.clear()
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
    editList() {
      this.value = []
      this.items.forEach((element) => {
        const index = this.teachingAreasGlobal.find(
          (x) => x.id === element.global_id
        )
        this.value.push(index.key)
      })
    },
  },
}
</script>
<style lang="scss">
.main-transfer {
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
