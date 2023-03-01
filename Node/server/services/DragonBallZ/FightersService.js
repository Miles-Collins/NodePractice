import { dbContext } from "../../db/DbContext";
import { Forbidden } from "../../utils/Errors";

class FightersService {
  async delete(id, userId) {
    let fighter = await this.getOne(id);
    if (fighter.creatorId != userId) {
      throw new Forbidden(`You do not have permission to delete ${fighter}.`);
    }
    await fighter.remove();
    return `You have successfully removed ${fighter.name}.`;
  }
  async edit(id, fighterData) {
    let fighter = await this.getOne(id);
    if (fighter.creatorId != fighterData.creatorId) {
      throw new Forbidden(`You do not have permission to edit ${fighter}.`);
    }
    fighter.name = fighterData.name || fighter.name;
    fighter.bio = fighterData.bio || fighter.bio;
    await fighter.save();
    return fighter;
  }
  async create(body) {
    let fighter = await dbContext.Fighter.create(body);
    return fighter;
  }
  async getOne(id) {
    let fighter = await dbContext.Fighter.findById(id)
      .populate("creator")
      .populate("universe");
    if (!fighter) {
      throw new Forbidden(
        `There is no fighter with the ID of ${id} in our database. Please try again.`
      );
    }
    return fighter;
  }
  async get() {
    let fighter = await dbContext.Fighter.find()
      .populate("creator")
      .populate("universe");
    return fighter;
  }
}

export const fightersService = new FightersService();
