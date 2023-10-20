<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm @submit.prevent="callAuth">
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Логин" autocomplete="username" v-model="login" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Пароль" autocomplete="new-password" v-model="password" />
                </CInputGroup>
                <div class="d-grid">
                  <CButton type="submit" color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
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
  name: 'Register',
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
      const requestAddr = this.$store.state.publicPath + '/api/admin/register'
      if (this.iscorrect) this.iscorrect = false
      if (this.login && this.password) {
        this.isempty = false
        myApi
          .put(requestAddr, {
            login: this.login,
            password: this.password,
          }).then(() => {
            this.$router.push('/')
          })
          .catch(() => {
            alert("Неверные данные")
          })

      } else this.isempty = true
    },
  }
}
</script>
