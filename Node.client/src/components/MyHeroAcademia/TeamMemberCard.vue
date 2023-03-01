<template>
  <div class="containerBorder">
    <div class="heroNameContainer text-center">
      <h6>{{ hero.heroName }}</h6>
    </div>
    <div class="heroImage" v-bind:style="{ backgroundImage: `url(${hero.image})` }">
    </div>
    <div class="descriptionContainer">
      <div v-bind="hero.quirk" class="">
        <p>
          Quirk: {{ hero.quirk?.name }}
        </p>
        <p>
          Type: {{ hero.quirk?.type }}
        </p>
        <p>
          Range: {{ hero.quirk?.quirkRange }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: { hero: { type: Object, required: true } },


  setup() {



    return {

    }
  }
}
</script>

<style scoped>
.heroImage {
  height: 70%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.heroNameContainer {
  height: 5%;
  font-family: Futura Display BQ;
  text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
  color: white;
}

.containerBorder {
  background-image: url(https://wallpaperaccess.com/full/2075384.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 98%;
  height: 90%;
}

.descriptionContainer {
  height: 25%;
  background-color: rgba(128, 128, 128, 0.722);
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  color: white;
  border: black 1px solid;
}

p {
  padding: 0;
  margin: 0;
  margin-left: 5px;
  font-size: .9rem
}
</style>
