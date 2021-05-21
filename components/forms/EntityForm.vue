<template>
  <el-dialog
    :title="`${item.id ? 'Editando' : 'Creando'} Entidad`"
    :visible="dialog"
    :close-on-click-modal="false"
    @close="
      item = {}
      $emit('update:dialog', false)
    "
  >
    <el-form ref="form" :model="item" :rules="rules" label-position="top">
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
          <el-form-item label="Tipo" prop="type">
            <el-select
              v-model="item.type"
              value-key="id"
              :disabled="types.length == 0"
              placeholder=""
            >
              <el-option
                v-for="type in types"
                :key="type.id"
                :label="type.name"
                :value="type"
                :value-key="type.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-form-item label="Categoría" prop="category">
            <el-select
              v-model="item.category"
              value-key="id"
              :disabled="categories.length == 0"
              placeholder=""
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="
          $emit('update:dialog', false)
          item = {}
        "
      >
        Cancelar
      </el-button>
      <el-button type="primary" :loading="loading" @click="save">
        Guardar
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
const required = {
  required: true,
  message: 'Campo requerido',
  trigger: 'blur',
}
export default {
  name: 'EntityForm',
  props: {
    dialog: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    item: {},
    categories: [],
    types: [],
    rules: {
      name: [required],
      type: [required],
      cif: [required],
      acronym: [required],
      category: [required],
    },
  }),
  created() {
    this.getEntities()
    this.getCategories()
  },

  mounted() {
    this.item = JSON.parse(
      JSON.stringify({
        ...this.data,
      })
    )
  },

  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('save', this.item)
        }
      })
    },

    getEntities() {
      this.$axios
        .get(`constants/entities/`)
        .then((x) => {
          this.types = x.data
        })
        .catch(() => {})
    },
    getCategories() {
      this.$axios
        .get(`constants/categories/`)
        .then((x) => {
          this.categories = x.data
        })
        .catch(() => {})
    },
  },
}
</script>
