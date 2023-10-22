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

        <CFormInput type="file" accept="image/*" multiple="multiple" ref="file" @change="previewMultiImage" class="mb-3"
          label="Превью" placeholder="Изображения" />
        <div class="border p-2 mt-3 preview-container">
          <template v-if="preview_list?.length">
            <div v-for="item, index in preview_list" :key="index">
              <img :src="item.src" class="img-fluid" />
              <input v-model="preview_list[index].alt" />
              <button @click.prevent="dropImage(index)">Х</button>
            </div>
          </template>
        </div>
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
      image_list: [],
    },
  },
  data() {
    return {
      textMd2: '',
      textEditMode: 'md2',
      formValid: false,
      preview_list: [],

    }
  },
  updated() {
    this.textMd2 = this.formData.text
    this.preview_list = this.formData.image_list?.filter(el => el.file_name)?.map(({ file_name, alt }) => {
      return { file_name, src: `${this.$store.state.imagesServer}/img/post-${this.formData.id}/${file_name}`, alt }
    })

  },
  async mounted() {
  },
  methods: {
    addNewPost() {
      eventBus.$emit('addNewPost')
    },
    previewMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      this.formData.preview = input.files[0]
      if (!this.preview_list) this.preview_list = []
      if (!this.formData.image_list) this.formData.image_list = []

      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push({ src: e.target.result, alt: "" });
          }
          this.formData.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset() {
      this.formData.image_list = [];
      this.preview_list = [];
    },
    dropImage(index) {
      this.formData.image_list?.splice(index, 1);
      this.preview_list?.splice(index, 1);

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

      this.formData.image_list?.forEach(image => {
        formData.append('images[]', image?.file_name ?? image ?? null);
      });

      this.preview_list?.forEach(imageObj => {
        formData.append('alts[]', JSON.stringify(Object.assign(imageObj, { src: null })));
      });

      isEdit && formData.append('id', this.formData.id)

      return formData
    },
    addNewing() {
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
