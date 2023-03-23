<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-8">
        <div class="row">
          <img class="img-fluid" :src="hero?.coverImage" alt="">
        </div>
      </div>
      <div class="col-4">
        <div class="row">
          <HeroInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
import HeroInfo from "../components/MyHeroAcademia/HeroInfo.vue";
import { heroTeamsService } from "../services/MyHeroAcademia/HeroTeamsService";
import Pop from "../utils/Pop";


export default {

  setup() {
    const route = useRoute()

    async function getHeroById() {
      try {
        await heroTeamsService.getHeroById(route.params.heroId)
      } catch (error) {
        console.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }


    onMounted(() => {
      getHeroById()
    })
    return {
      hero: computed(() => AppState.activeHero)
    };
  },
  components: { HeroInfo }
}
</script>


<style></style>
