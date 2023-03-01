<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-around">
      <div v-for="h in heroes" key="h.id"
        class="col-8 col-md-2 my-3 heroCardBorder d-flex align-items-center justify-content-center">
        <TeamMemberCard class="heroCardBorderContainer" :hero="h" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue"
import { AppState } from "../AppState";
import { useRoute } from "vue-router"
import { heroTeamsService } from "../services/MyHeroAcademia/HeroTeamsService"
import TeamMemberCard from "../components/MyHeroAcademia/TeamMemberCard.vue";
import Pop from "../utils/Pop";


export default {




  setup() {
    const route = useRoute()
    onMounted(() => {
      getHeroes()
    })

    async function getHeroes() {
      try {
        await heroTeamsService.getTeamHeroes(route.params.teamId)
      } catch (error) {
        console.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }


    return {
      heroes: computed(() => AppState.heros)

    }
  },
  components: { TeamMemberCard }
}
</script>

<style scoped>
.heroCardBorder {
  background-color: black;
  border: 4px solid black;
  padding: 0px;
}

.heroCardBorderContainer {
  background-color: gold;
  border: 5px solid gold;
  border-radius: 5%;
  height: 45vh;
}
</style>
