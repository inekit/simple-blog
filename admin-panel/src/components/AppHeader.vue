<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">

      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#" @click="logout">
            <CIcon class="mx-2" icon="cil-user" size="lg" />
            Выйти
          </CNavLink>
        </CNavItem>

      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,

})
import AppBreadcrumb from './AppBreadcrumb'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
  },
  setup() {
    return {
      logo,
    }
  },
  methods: {
    logout() {
      const requestAddr = this.$store.state.publicPath + '/api/admin/logout'

      myApi
        .get(requestAddr).then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          alert("Ошибка")
        })
    }
  }
}
</script>
