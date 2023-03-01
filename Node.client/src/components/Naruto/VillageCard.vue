<template>
  <h5 class="text-center">{{ village.name }}</h5>
  <img class="villageImage" :src="village.coverImg" alt="" srcset="">
</template>

<script>

export default {
  props: { village: { type: Object, required: true } },


  setup() {



    return {

    }
  }
}
</script>

<style scoped>
.villageImage {
  height: 25vh;
  width: 100%;
}
</style>
