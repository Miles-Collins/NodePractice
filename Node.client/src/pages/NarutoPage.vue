<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 my-5">
        <h1 class="text-center">Choose Your Village</h1>
      </div>
    </div>
    <div class="row">
      <div v-for="v in villages" class="col-8 col-md-3 my-3 px-2">
        <VillageCard :village="v" />
      </div>
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop"
import { villageService } from "../services/Naruto/VillageService"
import { onMounted, computed } from "vue"
import { AppState } from "../AppState"
import VillageCard from "../components/Naruto/VillageCard.vue"

export default {
  setup() {
    onMounted(() => {
      getVillages();
    });
    async function getVillages() {
      try {
        await villageService.getVillages();
      }
      catch (error) {
        console.error(error);
        // @ts-ignore
        Pop.error(("[ERROR]"), error.message);
      }
    }
    return {
      villages: computed(() => AppState.villages)
    };
  },
  components: { VillageCard }
}
</script>

<style></style>
