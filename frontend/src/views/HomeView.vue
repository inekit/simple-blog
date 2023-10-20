<template>
  <div class="home">
    <PostArchive />
  </div>
</template>

<script>
// @ is an alias to /src
import PostArchive from '@/components/PostArchive.vue';

export default {
  name: 'HomeView',
  components: {
    PostArchive,
  },
};
</script>
