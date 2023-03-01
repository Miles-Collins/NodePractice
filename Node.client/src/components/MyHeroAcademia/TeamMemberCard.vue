<template>
  <div v-if="holo" class=" containerBorder" v-bind:style="{ backgroundImage: `url(${holo?.url})` }">
    <div class=" heroNameContainer text-center">
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
  <div v-else>Loading...</div>
</template>

<script>
import { AppState } from "../../AppState"
import { onMounted, computed } from "vue"
import { heroTeamsService } from "../../services/MyHeroAcademia/HeroTeamsService"
import { logger } from "../../utils/Logger"
import Pop from "../../utils/Pop"


export default {
  props: { hero: { type: Object, required: true } },



  setup() {
    async function getRandomHolo() {
      try {
        let newHolo = await heroTeamsService.getRandomHolo()
        return newHolo
      } catch (error) {
        console.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }
    let randomNumber = Math.round(Math.random() * AppState.holos.length)
    onMounted(() => {
      getRandomHolo()
    })
    return {
      holos: computed(() => AppState.holos),
      holo: computed(() => AppState.holos[Math.round(Math.random() * AppState.holos.length - .5)])

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
  /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3c54c95-8c44-4e5b-93ae-389fe559bcbf/d56obz7-3620e4aa-94d3-495a-9d3c-8876dd548ca4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IzYzU0Yzk1LThjNDQtNGU1Yi05M2FlLTM4OWZlNTU5YmNiZlwvZDU2b2J6Ny0zNjIwZTRhYS05NGQzLTQ5NWEtOWQzYy04ODc2ZGQ1NDhjYTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yRKqIdDb--XAMvTShkQbDqS2mn6-W5ynLrQwPJY0Bwk); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 98%;
  height: 90%;
}

.descriptionContainer {
  height: 25%;
  background-color: rgba(50, 45, 45, 0.931);
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
