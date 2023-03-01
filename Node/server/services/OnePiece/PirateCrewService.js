import { dbContext } from "../../db/DbContext";
import { Forbidden } from "../../utils/Errors";

class PirateCrewService {
  async edit(id, crewData) {
    let originalCrew = await this.getOne(id);
    if (originalCrew.creatorId != crewData.creatorId) {
      throw new Forbidden(
        `You do not have permission to edit ${originalCrew.name}. You are not the Captain.`
      );
    }
    originalCrew.name = crewData.name || originalCrew.name;
    originalCrew.description = crewData.description || originalCrew.description;
    originalCrew.hasBoat = crewData.hasBoat;
    originalCrew.crewMembers = crewData.crewMembers || originalCrew.crewMembers;

    originalCrew.save();
    return originalCrew;
  }
  async create(crewData) {
    let crew = await dbContext.PirateCrew.create(crewData);
    await crew.populate("creator");
    return crew;
  }
  async getOne(id) {
    let crew = await dbContext.PirateCrew.findById(id).populate("creator");
    if (!crew) {
      throw new Forbidden("There is no Pirate Crew with that Id.");
    }
    return crew;
  }
  async delete(id, userId) {
    let crew = await this.getOne(id);
    if (crew.creatorId != userId) {
      throw new Forbidden(`You do not have permission to delete ${crew.name}`);
    }
    await crew.remove();
    return `You have successfully deleted the Pirate Crew ${crew.name}.`;
  }
  async get() {
    let crews = await dbContext.PirateCrew.find().populate("creator");
    return crews;
  }
}

export const pirateCrewService = new PirateCrewService();
