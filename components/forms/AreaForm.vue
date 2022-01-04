<template>
  <el-dialog
    :title="`${item.id ? 'Editando' : 'Creando'} Área`"
    :visible="dialog"
    :close-on-click-modal="false"
    append-to-body
    @close="
      item = {}
      $emit('update:dialog', false)
    "
  >
    <el-form ref="form" :model="item" :rules="rules" label-position="top">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
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
    rules: {
      name: [required],
    },
  }),

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
  },
}
</script>
