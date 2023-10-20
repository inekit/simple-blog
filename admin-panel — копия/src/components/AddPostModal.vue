<template>
  <CButton color="primary" @click="addNewPost">Добавить пост</CButton>
  <CModal size="xl" backdrop="static" alignment="center" :visible="visible" @close="closeModal">
    <CForm novalidate :validated="formValid" ref="add-file-form" @change="wregert"
      @submit.prevent="mode === 'new' ? addNewing() : editNewing()" class="add-user" style="display: 'none'">
      <CModalHeader>
        <CModalTitle>{{
          mode === 'new' ? 'Добавить пост' : 'Редактировать пост'
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput class="mb-3" v-model="formData.title" placeholder="Заголовок" id="inputHeader"
          aria-describedby="inputGroupPrepend" feedbackValid="Все ок" maxlength="255"
          feedbackInvalid="Введите корректный заголовок" required />

        <CFormTextarea :style="{ display: textEditMode === 'md2' ? 'block' : 'none' }" v-model="textMd2"
          label="Текст статьи" style="margin-bottom: 1rem" placeholder="Напишите что-нибудь" rows="20" id="inputText"
          aria-describedby="inputGroupPrepend" required />

      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal"> Отменить </CButton>
        <CButton v-show="mode === 'new'" color="primary" type="submit">Добавить пост</CButton>
        <CButton v-show="mode === 'edit'" color="primary" type="submit">Редактировать пост</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
})
import eventBus from '../eventBus'

export default {
  components: {},
  props: {
    mode: {
      required: true,
      type: String,
      validator: (value) => ['new', 'edit'].includes(value.toLowerCase()),
    },
    visible: false,
    formData: {
      title: '',
      text: '',
      description: '',
      preview_name: '',
      tags_array: new Set(),
    },
  },
  data() {
    return {
      textMd2: '',
      textEditMode: 'md2',
      formValid: false,
      preview: ""
    }
  },
  updated() {
    this.textMd2 = this.formData.text

    document.getElementsByClassName('ql-toolbar')?.[0].classList.add('hidden')
  },
  async mounted() {
  },
  methods: {
    addNewPost() {
      eventBus.$emit('addNewPost')
    },
    changeP(e) {
      console.log(e.target.value)
      this.formData.project_name = e.target.value
    },
    changeT(e) {
      console.log(e.target.checked)
      if (e.target.checked) this.formData.tags_array.add(e.target.value)
      else this.formData.tags_array.delete(e.target.value)
    },
    closeModal() {
      eventBus.$emit('closeModal')
    },
    constractFromData(isEdit) {
      if (!this.formData.title || !this.textMd2)
        throw new Error()

      var formData = new FormData()
      formData.append('title', this.formData.title)
      formData.append('text', this.textMd2)

      isEdit && formData.append('id', this.formData.id)

      return formData
    },
    addNewing() {
      console.log(this.$refs.postTextEditor.getHTML())
      try {
        const formData = this.constractFromData()

        myApi
          .post(this.$store.state.publicPath + '/api/admin/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            eventBus.$emit('postAdded')
          })
          .catch((e) => {
            eventBus.$emit('noresponse', e)
          })
      } catch (e) {
        this.formValid = true
        //eventBus.$emit('wrongInputData', e)
      }
    },
    editNewing() {
      try {
        const formData = this.constractFromData(true)

        myApi
          .put(this.$store.state.publicPath + '/api/admin/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            eventBus.$emit('postEdited')
          })
          .catch((e) => {
            eventBus.$emit('noresponse', e)
          })
      } catch (e) {
        this.formValid = true
        //eventBus.$emit('wrongInputData', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .hidden {
  display: none;
}

.tags-cloud,
.projects-list {
  display: flex;
  flex-wrap: wrap;

  &>* {
    margin-right: 20px;
  }

  &>span {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
}

.preview-container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  &>div {
    max-width: 24%;
    position: relative;

    button {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
