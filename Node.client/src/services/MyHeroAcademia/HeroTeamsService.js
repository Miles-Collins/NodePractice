import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import { api } from "../AxiosService";

class HeroTeamsService {
  async getAll() {
    const res = await api.get("api/mha/heroTeams");
    console.log("[GETTING ALL HEROES]", res.data);
    AppState.heroTeams = res.data;
  }

  async getTeamHeroes(teamId) {
    const res = await api.get(`api/mha/heroTeams/${teamId}/teamMember`);
    logger.log(("[GETTING HEROES", res.data));
    let heroes = res.data;
    logger.log("[FILTERED HEROES]", heroes);
    AppState.heros = heroes;
  }
}

export const heroTeamsService = new HeroTeamsService();
