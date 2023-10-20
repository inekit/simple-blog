<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="callAuth">
                  <h1>Вход</h1>
                  <p class="text-medium-emphasis">Войдите в аккаунт администратора</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Логин" autocomplete="username" v-model="login" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Пароль" autocomplete="current-password" v-model="password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" type="submit" class="px-4"> Войти </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,

})

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      isempty: true,
      iscorrect: '',
    }
  },
  methods: {
    callAuth() {
      const requestAddr = this.$store.state.publicPath + '/api/admin/login'
      if (this.iscorrect) this.iscorrect = false
      if (this.login && this.password) {
        this.isempty = false
        myApi
          .post(requestAddr, {
            login: this.login,
            password: this.password,
          }).then(() => {
            this.$router.push('/posts')
          })
          .catch(() => {
            alert("Неверные данные")
          })

      } else this.isempty = true
    },
  }
}
</script>
