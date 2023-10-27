<template>
  <div class="card-body text-left">
    <p class="card-text">
      <span class="card-text small">
        {{ dateFormatter(postData.publication_date) }}
        <span class="far fa-calendar-alt mr-2"></span>
      </span>
    </p>
    <h3 cMlass="h4 card-title mb-1">{{ postData.title }}</h3>
    <router-link class="btn btn-primary btn-sm mr-3 post-button"
      :to="`/article/${postData.id}-${translit(postData.title)}.html`">Читать
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
    translit(str) {

      var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', ' ': '-'
      }, n_str = [];

      str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

      for (var i = 0; i < str.length; ++i) {
        n_str.push(
          ru[str[i]]
          || ru[str[i].toLowerCase()] == undefined && str[i]
          || ru[str[i].toLowerCase()].toUpperCase()
        );
      }

      return n_str.join('');
    }
  },

};
</script>
