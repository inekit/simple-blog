<template>
  <div class="card-body text-left">
    <p class="card-text">
      <span class="card-text small">
        {{ dateFormatter(postData.publication_date) }}
        <span class="far fa-calendar-alt mr-2"></span>
      </span>
    </p>
    <h3 cMlass="h4 card-title mb-1">{{ postData.title }}</h3>
    <router-link class="btn btn-primary btn-sm mr-3 post-button" :to="`/archive/${postData.id}`">Читать
      полностью
    </router-link>
  </div>
</template>

<script>
import { dateFormatter } from '../utils/dateFormatter';


export default {
  name: 'ArticleBlock',
  props: {
    postData: { default: new Object(), type: Object },
  },
  data: () => {
    return {
    };
  },
  mounted() {
  },
  methods: {
    dateFormatter,
  },

};
</script>
