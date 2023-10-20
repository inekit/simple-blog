<template>
  <CButton color="primary" @click="() => { visible = true }">Добавить пользователя</CButton>
  <CModal alignment="center" :visible="visible" @close="() => { visible = false }">
    <CModalHeader>
      <CModalTitle>Add user</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <form class="add-user" style="display:'none'">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">@</CInputGroupText>
          <CFormInput v-model="nick" placeholder="Никнейм" aria-label="Username" aria-describedby="basic-addon1" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CFormInput v-model="email" placeholder="mail" aria-label="Email" />
        </CInputGroup>

        <CFormInput v-model="password" class="mb-3" placeholder="Пароль" aria-label="Password" />

        <CFormInput v-model="password2" placeholder="Повторите пароль" aria-label="Password2" />
      </form>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visible = false }">
        Отменить
      </CButton>
      <CButton color="primary" @click="saveUser">Добавить пользователя</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import eventBus from '../eventBus'

export default ({
  props: {
    visible: false,
    formData: {
      email: '',
      password: '',
      password2: '',
      nick: '',
    }

  },
  methods: {
    addUser() {

      if (!this.formData.email || !this.formData.password ||
        this.formData.password2 !== this.formData.password || !this.formData.nick)
        return eventBus.$emit('wrongInputData', this.formData)


      this.$store.myApi.put(this.$store.state.publicPath + '/api/users/add', this.formData)
        .then((res) => {
          eventBus.emit('userAdded', res)
        })
        .catch((error) => {
          eventBus.emit('noresponse', error)
        })

    }
  }
})
</script>
