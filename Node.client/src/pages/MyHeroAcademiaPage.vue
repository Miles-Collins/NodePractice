<template>
  <section class="container-fluid">
    <div class="row d-flex justify-space-between">
      <div v-for="ht in heroTeams" class="col-8 col-md-3 my-3">
        <TeamCard :team="ht" />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, computed } from "vue";
import { AppState } from "../AppState";
import TeamCard from "../components/MyHeroAcademia/TeamCard.vue";
import { heroTeamsService } from "../services/MyHeroAcademia/HeroTeamsService"
import Pop from "../utils/Pop";

export default {
  setup() {
    onMounted(() => {
      getHeroTeams();
    });
    async function getHeroTeams() {
      try {
        await heroTeamsService.getAll();
      }
      catch (error) {
        console.error(error);
        // @ts-ignore
        Pop.error(("[ERROR]"), error.message);
      }
    }
    return {
      heroTeams: computed(() => AppState.heroTeams),
    };
  },
  components: { TeamCard }
}
</script>

<style scoped lang="scss"></style>
