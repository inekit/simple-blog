<template>
  <div class="article">
    <div class="row">
      <div class="col col-md-7">
        <div class="card-body text-left">
          <p class="card-text mt-4">
            <span class="card-text small">
              {{ dateFormatter(article.publication_date) }}
              <span class="far fa-calendar-alt mr-2"></span>
            </span>
          </p>
          <h1 class="h1 card-title mb-3">{{ article.title }}</h1>
        </div>
      </div>
    </div>
    <span v-if="parsedText" v-html="parsedText" class="article-text mt-4" v-highlight></span>
    <div class="images-container">
      <div v-for="image, i in imageList" :key="i">
        <img :src="image.src" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus';
import { dateFormatter } from '../utils/dateFormatter';
import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

export default {
  props: ['postId'],
  props: ['article'],
  data: () => {
    return {
      parsedText: '',
      imageList: [],
    }
  },
  watch: {
  },
  mounted() {
    this.parsedText = DOMPurify.sanitize(marked.parse(this.article.text ?? " "));

    this.imageList = this.article.image_list
      ?.filter((el) => el.file_name)
      ?.map(({ file_name, alt }) => {
        return { src: `${this.$store.state.imagesServer}/img/post-${this.article.id}/${file_name}`, alt };
      })

  },
  updated() {
    this.parsedText = DOMPurify.sanitize(marked.parse(this.article.text ?? " "));

    this.imageList = this.article.image_list
      ?.filter((el) => el.file_name)
      ?.map(({ file_name, alt }) => {
        return { src: `${this.$store.state.imagesServer}/img/post-${this.article.id}/${file_name}`, alt };
      })
  },
  methods: {
    dateFormatter,
  },
}
</script>

<style lang="scss">
.images-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &>div {
    flex: 1;
    max-width: 200px;
    position: relative;

    &>img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
  