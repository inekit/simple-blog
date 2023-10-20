<template>
  <div>
    <div class="feed">
      <ArticleBlock v-for="post in news" :key="`post-${post.id}`" :post-data="post" />
    </div>
  </div>
</template>

<script>
import ArticleBlock from '@/components/ArticleBlock.vue';

import axios from 'axios';
import eventBus from '../eventBus';

const myApi = axios.create({
  withCredentials: true,
});

export default {
  name: 'PostFeed',
  components: {
    ArticleBlock,
  },
  props: {
    category: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      news: [],
      page: 1,
      perPage: 9,
      isEnded: false,
      loadingUpdate: false,
    };
  },
  watch: {
    '$store.state.searchRequestData': async function () {
      this.page = 1;
      this.isEnded = false;
      this.news = await this.getArticles(this.$store.state.searchRequestData);
    },
    $route: async function (to, from) {

      this.perPage = 9;
      this.isEnded = false;
      this.loadingUpdate = false;
      if (this.$route.params.projectName) {
        this.$store.state.searchRequestData = {
          query: '',
          tagsArray: [],
          projectName: this.$route.params.projectName,
        }
      } else if (this.$route.params.tagName) {
        this.$store.state.searchRequestData = {
          query: '',
          tagsArray: [this.$route.params.tagName],
          projectName: null,
        }
      } else {
        this.$store.state.searchRequestData = {
          query: '',
          tagsArray: [],
          projectName: null,
        }
        //this.news = !this.loadingUpdate && await this.getArticles(this.$store.state.searchRequestData);
      }
    }
  },
  async mounted() {
    //this.scroll();

    if (this.$route.params.projectName) {
      this.$store.state.searchRequestData.projectName = this.$route.params.projectName;
    } else if (this.$route.params.tagName) {
      this.$store.state.searchRequestData.tagsArray = [this.$route.params.tagName];
    } else if (this.$route.name === 'home') {
      this.$store.state.searchRequestData = {
        query: '',
        tagsArray: [],
        projectName: null,
      };
      //this.news = !this.loadingUpdate && await this.getArticles(this.$store.state.searchRequestData);
    } else {
      this.news = !this.loadingUpdate && await this.getArticles(this.$store.state.searchRequestData);

    }
  },
  methods: {
    async getArticles({ take, page, query, projectName, tagsArray }) {
      this.loadingUpdate = true;

      const res = await myApi
        .get(this.$store.state.publicPath + '/api/posts/', {
          params: {
            searchQuery: query ?? this.$store.state.searchRequestData.query,
            projectName,
            tagsArray,
            take: this.perPage ?? perPage,
            page: page ?? this.page ?? 1,
          },
        })
        .catch((error) => {
          eventBus.emit('noresponse', error);
        });

      const newsUpd = res.data;

      if (newsUpd.length < (take ?? this.perPage)) this.isEnded = true;
      else this.page++;

      this.loadingUpdate = false;

      return newsUpd;
    },
    scroll() {
      window.onscroll = async () => {
        let bottomwindow = window.scrollY + window.innerHeight + 1000 > document.documentElement.scrollHeight;

        if (bottomwindow && !this.loadingUpdate && !this.isEnded) {
          this.loadingUpdate = true;
          const update = await this.getArticles(this.$store.state.searchRequestData);
          this.news = [...this.news, ...update];
        }
      };
    },

    async sendSearchRequest() {
      this.page = 1;
      this.news = await this.getArticles(this.$store.state.searchRequestData);
    },
    pushNewing(id) {
      this.$router.push('/post/' + id);
    },
    transformData(data) {
      return data?.map(this.transformDataEl)

    },
    transformDataEl(pair) {
      let pairFormed = [];
      for (let f of this.fields) {
        pairFormed.push(pair[f.name ?? f] ?? "")
      }
      return pairFormed;
    },
  },
}
  ;
</script>
