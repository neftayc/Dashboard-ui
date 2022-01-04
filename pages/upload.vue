<template>
  <form enctype="multipart/form-data">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">Clic para subir archivo</el-button>
      <div slot="tip" class="el-upload__tip">
        Solo archivos jpg/png con un tamaño menor de 500kb
      </div>
    </el-upload>
  </form>
</template>
<script>
import Compressor from 'compressorjs'
import { mapMutations } from 'vuex'
import Axios from 'axios'

export default {
  layout: 'system-administration',
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    dragText: {
      type: String,
      default: 'Drag photo here',
    },
    btnText: {
      type: String,
      default: 'Select a photo from your device',
    },
  },
  data: () => ({
    loading: false,
    showNotification: false,
    descriptionModal: null,
    loadingMessage: '',
    photo: '',
    fileList: [],
  }),
  watch: {
    async photo(v) {
      const formData = new FormData()
      formData.append('photo', v)
      console.log('files', v)
      const images = await Axios.post('/api/profile', formData)
        .then((x) => {
          console.log(x)
          console.log('images', images)
        })
        .catch((e) => console.log(e))
    },
  },
  async mounted() {
    const images = await Axios.get('/api/test')
    console.log('test', images)
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `El límite es 3, haz seleccionado ${
          files.length
        } archivos esta vez, añade hasta ${files.length + fileList.length}`
      )
    },
    ...mapMutations(['SHOW_SNACKBAR']),
    async onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      const formData = new FormData()
      formData.append('photo', files[0])

      console.log('files', files)
      const images = await Axios.post('/api/profile', formData)
        .then((x) => {
          console.log(x)
          console.log('images', images)
        })
        .catch((e) => console.log(e))

      console.log('images', images)
      return images
    },
    async onDropCover(e) {
      this.loading = true
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files

      if (files.length) {
        const _files = await this.mapImages(files)
        this.$emit(
          'change',
          this.multiple ? _files : _files.length ? _files[0] : null
        )
      }
      this.$refs.fileupload.value = null
      this.loading = false
    },

    async mapImages(files) {
      const list = []
      const imgsWithError = []

      console.time('total')
      const heicPromiseArray = []
      console.time('codification')
      this.loadingMessage = 'Coding Images...'
      let codificationCounter = 1
      for (let index = 0; index < files.length; index++) {
        heicPromiseArray.push(
          new Promise((resolve, reject) => {
            const file = files[index]
            if (file.name.endsWith('.heic')) {
              this.heicToJpg(file).then((file) => {
                this.loadingMessage = `Coded Images: ${codificationCounter++}/${
                  files.length
                }`
                resolve(file)
              })
            } else {
              resolve(file)
            }
          })
        )
      }

      const codedFiles = await Promise.all(heicPromiseArray)
      console.timeEnd('codification')

      let count = 0
      const compressPromiseArray = []
      this.loadingMessage = 'Compressing Images...'
      console.time('compression')
      let compressionCounter = 1
      for (let index = 0; index < files.length; index++) {
        compressPromiseArray.push(
          new Promise((resolve, reject) => {
            const file = codedFiles[index]

            if (!file.type.match('image.*')) {
              this.SHOW_SNACKBAR({
                color: 'error',
                message: 'Invalid image format, please select an image',
              })
            } else if (
              file.type.match('image.tiff') ||
              file.type.match('image.tif')
            ) {
              this.SHOW_SNACKBAR({
                color: 'error',
                message:
                  'Invalid image format, please select an image with format: png, jpg, jpeg, heic or svg',
              })
            } else {
              this.compressImagen(file).then((result) => {
                if (result) {
                  this.loadingMessage = `beginning compression ${compressionCounter++}/${
                    files.length
                  }`
                  resolve(result)
                  // list.push(result)
                } else {
                  resolve({ error: file.name })
                  // imgsWithError.push(file.name)
                  count = count + 1
                }
              })
            }
          })
        )
      }

      const compressedFiles = await Promise.all(compressPromiseArray)
      for (const i of compressedFiles) {
        if (i.error) imgsWithError.push(i.error)
        else list.push(i)
      }
      console.timeEnd('compression')

      console.timeEnd('total')

      const joinImgsWithError = imgsWithError.join(', ')

      if (count !== 0) {
        this.showNotification = true
        this.descriptionModal = `We apologize that <strong>${joinImgsWithError}</strong> contains an unknown file encoding and cannot be opened.`
      }

      return list
    },

    async heicToJpg(file) {
      // const blob = new Blob([new Uint8Array(file)], { type: 'heic' })
      const heic2any = require('heic2any')
      let convertedFile
      try {
        convertedFile = await heic2any({
          blob: file,
        })
      } catch (error) {
        this.loading = false
      }
      return convertedFile
    },

    compressImagen(file) {
      return new Promise((resolve, reject) => {
        Compressor(file, {
          quality: 0.6,
          maxWidth: 2200,
          convertSize: 3600,
          error: (e) => {
            this.loading = false
            resolve(null)
          },
          success: async (res) => {
            const imagen = await this.createImage(res)
            resolve(imagen)
          },
        })
      })
    },
    createImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
  },
}
</script>
<style scoped lang="scss">
.cover {
  margin: 10px;
  border: dashed 2px rgb(216, 216, 216);
  padding: 10px;
  .drag__container {
    height: 250px;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    .icon {
      font-size: 60px;
    }
    .file-select > .select-button {
      padding: 0.7rem 1rem;
      cursor: pointer;
      color: white;
      background-color: var(--v-primary-base);
      border-radius: 0.3rem;
      text-align: center;
      font-weight: bold;
    }

    /* Don't forget to hide the original file input! */
    .file-select > input[type='file'] {
      display: none;
    }
  }
}
</style>
