<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="!hero" class="col-12 col-md-7 leftBar" :style="{ background: `url(${team?.coverImage})` }">
        <div class="row ">
          <div class="col-12 headerBg">
            <h1 class="text-center mt-2 px-3">{{ team?.name }}</h1>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 leftBarSmush"></div>
            <div class="col-11 col-md-7 leftBarBox d-flex justify-content-center">
              <div class="row ">
                <h1 v-if="team?.class" class="text-center mt-2 px-3">Class: {{ team?.class }}</h1>
                <h1 class="text-center mt-2 px-3" v-else>Description:</h1>
                <p class="text-center">{{ team?.description }}</p>
                <p @click="pushToRecipe(team?.id)" class="text-center getFont "><strong class="getTheRecipe">CLICK TO
                    LEARN MORE
                    ></strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="hero" class="col-12 col-md-7 leftBarHero" :style="{ background: `url(${hero?.image})` }">
        <div class="row ">
          <div class="col-12 headerBg">
            <h1 class="text-center mt-2 px-3">{{ hero?.heroName }}</h1>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 leftBarSmush"></div>
            <div class="col-11 col-md-7 leftBarBox d-flex justify-content-center">
              <div class="row ">
                <h1 v-if="hero.class" class="text-center mt-2 px-3">Class: {{ hero?.name }}</h1>
                <h1 class="text-center mt-2 px-3" v-else>Description:</h1>
                <p class="text-center">{{ hero?.bio }}</p>
                <p @click="pushToRecipe(team?.id)" class="text-center getFont "><strong class="getTheRecipe">CLICK TO
                    LEARN MORE
                    ></strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5 rightBar">
        <div class="row d-flex justify-content-around mt-3">
          <div class="col-9 rightBarTitle px-3"></div>
          <div v-for="h in heroes" key="h.id"
            class="col-8 col-md-5 my-3 mx-1 heroCardBorder d-flex align-items-center justify-content-center">
            <TeamMemberCard class="heroCardBorderContainer" :hero="h" />
          </div>
        </div>
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
      getTeamById()
    })

    async function getTeamById() {
      try {
        await heroTeamsService.getTeamById(route.params.teamId)
      } catch (error) {
        console.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }

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
      heroes: computed(() => AppState.heros),
      team: computed(() => AppState.activeTeam),
      hero: computed(() => AppState.activeHero)

    }
  },
  components: { TeamMemberCard }
}
</script>

<style scoped>
.headerBg {
  border-top: 5px solid rgb(244, 199, 106);
  border-bottom: 5px solid rgb(244, 199, 106);
  border-left: 5px solid rgb(244, 199, 106);
  background-color: rgba(255, 255, 255, 0.857);
  display: flex;
  justify-content: center;
}

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

.leftBar {
  height: 90vh;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  border-right: 5px solid rgb(244, 199, 106);
}

.leftBarHero {
  height: 90vh;
  background-size: contain !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-color: rgba(234, 230, 230, 0.857) !important;
  border-right: 5px solid rgb(244, 199, 106);
}

.leftBarSmush {
  height: 40vh;
}

.leftBarBox {
  border: 5px solid rgb(244, 199, 106);
  outline: 15px solid rgba(255, 255, 255, 0.857);
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.857);
  display: flex;
  justify-content: center;
  font-size: .55rem;
}

.getFont {
  padding: 0;
}

.rightBar {
  overflow-x: hidden;
  overflow-y: auto;
  height: 90vh;
  background-color: rgba(255, 255, 255, 0.857);
}

.rightBarTitle {
  height: 30VH;
  background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6c3bff9-74f2-4238-972f-83f54dffd3fe/dbd702g-c91c304a-b586-45bc-b633-5082c82cce41.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q2YzNiZmY5LTc0ZjItNDIzOC05NzJmLTgzZjU0ZGZmZDNmZVwvZGJkNzAyZy1jOTFjMzA0YS1iNTg2LTQ1YmMtYjYzMy01MDgyYzgyY2NlNDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSswD8e5A5_L3kk8knpi9gtVg3TdgHldwfuZ-9J0p6M);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
