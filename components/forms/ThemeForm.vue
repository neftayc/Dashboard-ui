<template>
  <el-dialog
    :title="`${item.id ? 'Editando' : 'Creando'} Theme`"
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

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item label="Nombre abreviado" prop="abbreviated_name">
            <el-input v-model="item.abbreviated_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-form-item label="Duración" prop="duration">
            <el-input
              v-model="item.duration"
              v-mask="'##d:zyh:qxm'"
              placeholder="días : horas : minutos"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="Duración" prop="duration">
            <el-time-select
              v-model="item.duration"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59',
              }"
            >
            </el-time-select>
          </el-form-item> -->
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
    rules: {
      name: [required],
      duration: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('Campo requerido'))
            } else if (
              value
                .replace('d', '')
                .replace('h', '')
                .replace('m', '')
                .replace(/,/g, ':')
                .replace(/:/g, '').length !== 6
            ) {
              callback(
                new Error('Formato inválido, debe ser días:horas:minutos')
              )
            } else {
              callback()
            }
          },
          trigger: 'blur',
        },
      ],

      abbreviated_name: [required],
    },
  }),

  computed: {},

  mounted() {
    this.item = JSON.parse(
      JSON.stringify({
        ...this.data,
        duration: this.timeToString(this.data.duration),
      })
    )
  },

  methods: {
    timeToString(value) {
      const onlyNumbers = value ? value.replace(/:/g, '') : ''
      if (onlyNumbers.length === 6) {
        const list = onlyNumbers.split('')
        let _hours = `00`
        let _days = `00`
        const hours = parseInt(`${list[0]}${list[1]}`)
        if (hours > 23) {
          _hours = parseInt(hours % 24)
          _days =
            hours % 24 === 0
              ? parseInt(hours / 24)
              : parseInt((hours - _hours) / 24)
        } else {
          _hours = hours
        }

        return `${this.twoNumber(_days)}d:${this.twoNumber(_hours)}h:${
          list[2]
        }${list[3]}m`
      }
      return ''
    },
    timeDateTime(value) {
      const onlyNumbers = value
        ? value
            .replace('d', '')
            .replace('h', '')
            .replace('m', '')
            .replace(/,/g, ':')
            .replace(/:/g, '')
        : ''

      if (onlyNumbers.length === 6) {
        const list = onlyNumbers.split('')
        const dias = parseInt(`${list[0]}${list[1]}`)
        const hours = parseInt(`${list[2]}${list[3]}`)
        const minutes = `${list[4]}${list[5]}`
        return `${this.twoNumber(hours + dias * 24)}:${minutes}:00`
      }
      return false
    },

    twoNumber(v) {
      return `${v}`.length === 1 ? `0${v}` : v
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('save', {
            ...this.item,
            duration: this.timeDateTime(this.item.duration),
          })
        }
      })
    },
  },
}
</script>
