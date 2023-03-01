<template>
  <div class="teamCard" @click="goToTeamPage()">
    <h1>{{ team.name }}</h1>
    <p>{{ team.description }}</p>
    <p>Hero Count: {{ team.heroCount }}</p>
    <div v-for="h in team.heroes">
      {{ h.heroName }}
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";


export default {
  props: { team: { type: Object, required: true } },



  setup(props) {
    const router = useRouter()



    return {

      goToTeamPage() {
        router.push({ name: "MHATeam", params: { teamId: props.team.id } })
      }
    }
  }
}
</script>

<style>
.teamCard {
  height: 40vh;
}

.teamCard p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
