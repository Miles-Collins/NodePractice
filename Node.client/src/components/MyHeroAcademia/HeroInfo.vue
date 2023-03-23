<template>
  <div v-if="hero">
    <div class="col-12">
      Name: {{ hero?.name }}
    </div>
    <div class="col-12">
      Hero Name: {{ hero.heroName }}
    </div>
    <div class="col-12">
      Age: {{ hero.personals.age }}
    </div>
    <div class="col-12">
      Age: {{ hero.personals.birthday }}
    </div>
    <div class="col-12">
      Gender: {{ hero.personals.gender }}
    </div>
    <div class="col-12">
      Height: {{ Math.floor(inches / 12) }}' {{ inches % 12 }}"
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";


export default {



  setup() {



    return {
      hero: computed(() => AppState.activeHero),
      inches: computed(() => Math.round(AppState.activeHero.personals.height / 2.54))
    }
  }
}
</script>

<style></style>
