<template>
  <div class="archive">
    <FullArticle :article="article" />
  </div>
</template>

<script>
// @ is an alias to /src
import FullArticle from '@/components/FullArticle.vue';

export default {
  name: 'HomeView',
  components: {
    FullArticle,
  },
  data: () => {
    return {
      article: {},
    };
  },
  watch: {
    async $route() {
      await this.getArticle();
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    async getArticle(take, page) {
      await this.$root.myApi
        .get(this.$store.state.publicPath + '/api/posts/', {
          params: {
            id: this.$route.params.postId,
          },
        })
        .then((res) => {
          this.article = res.data;
        })
        .catch((error) => {
          eventBus.emit('noresponse', error);
        });
    },
  }
};
</script>
