<template>
  <div>
    <AddPostModal :visible="formVisible" :formData="formData" :mode="formMode" />
    <Table :fields="tableFieldNames" :postData="get" :actions="dataActions" :rows="rows" editMode="form" name="Посты" />
  </div>
</template>

<script>
import AddPostModal from '@/components/AddPostModal.vue'
import Table from '@/components/Table.vue'
import eventBus from '../eventBus'

import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
  credentials: 'include'

})

export default {
  name: 'Posts',
  components: {
    AddPostModal,
    Table,
  },
  props: ['tag', 'project'],
  data() {
    return {
      myApi: myApi,
      formVisible: false,
      formData: {},
      rows: [],
      dataActions: {
        Изменить: { action: this.change, color: 'warning' },
        Удалить: { action: this.delete, color: 'danger' },
      },
      tableFieldNames: [
        {
          name: 'title',
          title: 'Название',
        },
        {
          name: 'publication_date',
          title: 'Дата добавления',
        },
      ],
    }
  },
  created() {
    eventBus.$on('addNewPost', () => {
      this.formMode = 'new'
      this.formData = {
        project_name: this.$route.params.projectName,
        tags_array: this.$route.params.tag
          ? new Set([this.$route.params.tag])
          : new Set(),
      }
      this.formVisible = true
    })
    eventBus.$on('closeModal', () => {
      this.formVisible = false
      this.formData = {}
    })
    eventBus.$on('postAdded', () => {
      this.formVisible = false
      //this.rows.unshift(this.formData)
      this.get()
      this.formData = {}
    })
    eventBus.$on('postEdited', () => {
      this.formVisible = false
      this.formData = {}
    })
  },
  methods: {
    change(elObj) {
      this.formVisible = true
      elObj.tags_array = new Set(elObj.tags_array)
      this.formData = elObj
      console.log(elObj)
      this.formMode = 'edit'
    },
    get(take, page) {
      console.log(this.tag)
      return myApi
        .get(this.$store.state.publicPath + '/api/admin/posts/', {
          params: {
            take: take ?? 10,
            page: page ?? 1,
            tagsArray: this.$route.params.tag
              ? [this.$route.params.tag]
              : undefined,
            projectName: this.$route.params.projectName,
          },
        })
        .then((res) => {
          if (res.data?.length > 0) this.rows = res.data
          return res.data
        })
        .catch((error) => {
          eventBus.$emit('noresponse', error)
          return false
        })
    },
    delete(item) {
      const result = confirm('Вы действительно хотите удалить пост?')
      if (result)
        return myApi
          .delete(this.$store.state.publicPath + '/api/admin/posts/', {
            data: { id: item.id },
          })
          .then(() => {
            this.get()
            eventBus.$emit('postDeleted')
          })
          .catch((error) => {
            eventBus.$emit('noresponse', error)
          })
    },
  },
}
</script>

<style lang="scss">
button {
  margin-bottom: 20px;
}
</style>
