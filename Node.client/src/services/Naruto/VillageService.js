import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import { api } from "../AxiosService";

class VillageService {
  async getVillages() {
    let res = await api.get("api/naruto/village");
    logger.log("[GETTING VILLAGES]", res.data);
    AppState.villages = res.data;
  }
}

export const villageService = new VillageService();
