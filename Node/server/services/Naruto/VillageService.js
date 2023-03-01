import { dbContext } from "../../db/DbContext";
import { BadRequest, Forbidden } from "../../utils/Errors";

class VillageService {
  async delete(id, user) {
    let village = await this.getOne(id);
    if (user != village.creatorId) {
      throw new Forbidden(
        `You are not the Kage of ${village.name}, you don't have permission to delete it.`
      );
    }
    await village.remove();
    return `You have successfully deleted ${village.name}. The Ninja world has 1 less Village.`;
  }
  async edit(villageBody, id) {
    let originalVillage = await this.getOne(id);
    if (villageBody.CreatorId != originalVillage.creatorId) {
      throw new Forbidden(
        `You are not the Kage, you cannot edit ${originalVillage.name}. Train harder, and one day you can become the Kage. BELIEVE IT!`
      );
    }
    originalVillage.name = villageBody.name || originalVillage.name;
    originalVillage.description =
      villageBody.description || originalVillage.description;
    originalVillage.population =
      villageBody.population || originalVillage.population;

    await originalVillage.save();
    return originalVillage;
  }
  async create(villageBody) {
    let village = await await dbContext.Village.create(villageBody);
    await village.populate("creator");
    return village;
  }
  async getOne(id) {
    let village = await dbContext.Village.findById(id).populate("creator");
    if (!village) {
      throw new Forbidden("That Village does not exist.");
    }
    return village;
  }
  async get() {
    let villages = await dbContext.Village.find().populate("creator");
    return villages;
  }

  ////////////////////// NINJA //////////////////////

  getOneNinja(villageId) {
    throw new Error("Method not implemented.");
  }
  async joinVillage(ninjaBody) {
    let ninja = await dbContext.Ninja.findById(ninjaBody.ninjaId);
    // Null Check
    if (ninja == null) {
      throw new BadRequest("That Ninja does not exist.");
    }
    let village = await dbContext.Village.findById(ninjaBody.villageId);
    // Null Check
    if (village == null) {
      throw new BadRequest("That Village does not exist.");
    }
    if (ninja.creatorId != ninjaBody.creatorId) {
      throw new Forbidden(
        `You are not ${ninja.name}, you do not have permission to join this ${village.name}.`
      );
    }
    return ninja;
  }
  async leaveVillage(villageId, userId) {
    let missingNin = await dbContext.MissingNin.findById({
      villageId,
    }).populate("ninja");
    // Null Check
    if (missingNin == null) {
      throw new BadRequest("That Ninja does not exist.");
    }
    let village = await dbContext.Village.findById(missingNin.villageId);
    if (village == null) {
      throw new BadRequest("That Village does not exist.");
    }
    let ninja = await dbContext.Ninja.findById(missingNin.ninjaId);
    // Null Check
    if (ninja == null) {
      throw new BadRequest("That Ninja does not exist.");
    }
    // Verify Permissions
    if (missingNin.creatorId != userId) {
      throw new Forbidden(`You do not have permission to leave the village.`);
    }
    await missingNin.remove();
    return `${ninja.name}, has successfully left ${village.name}. You are now a Missing Nin.`;
  }
}

export const villageService = new VillageService();
