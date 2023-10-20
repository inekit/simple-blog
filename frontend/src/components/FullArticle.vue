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
    }
  },
  watch: {
    'article.text': function (newVal, oldVal) {
      this.parsedText = DOMPurify.sanitize(marked.parse(this.article.text))?.replaceAll(
        '<pre>',
        "<pre class='language-csharp'>"
      );
    },
  },
  mounted() {
    if (this.$route.name === "about")
      this.parsedText = DOMPurify.sanitize(marked.parse(this.article.text ?? " "));
  },
  updated() {
    if (this.$route.name === "about")
      this.parsedText = DOMPurify.sanitize(marked.parse(this.article.text ?? " "));
  },
  methods: {
    dateFormatter,
  },
}
</script>
  