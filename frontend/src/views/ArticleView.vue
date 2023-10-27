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
  },
  async beforeMount() {
    await this.getArticle();
  },
  methods: {
    async getArticle(take, page) {
      await this.$root.myApi
        .get(this.$store.state.publicPath + '/api/posts/', {
          params: {
            id: this.$route.params.postId?.split('-')?.[0],
          },
        })
        .then((res) => {
          this.article = res.data;
          document.title = this.article.title;

        })
        .catch((error) => {
          eventBus.emit('noresponse', error);
        });
    },
  }
};
</script>
