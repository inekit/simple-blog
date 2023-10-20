import { createStore } from 'vuex';

export default createStore({
  state: {
    showLogin: false,
    showReg: false,
    searchingArchive: '',
    publicPath: 'https://gmi.pics',
    nightMode: false,
    isMobile: false,
    searchRequestData: {
      query: '',
      tagsArray: [],
      projectName: null,
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
