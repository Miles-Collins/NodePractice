import { dbContext } from "../../db/DbContext";
import { BadRequest, Forbidden } from "../../utils/Errors";

class NarutoService {
  async delete(id, userId) {
    let ninja = await this.getOne(id);
    if (ninja.creatorId != userId) {
      throw new Forbidden(
        `You do not have permission to delete ${ninja.name}.`
      );
    }
    await ninja.remove();
    return `You have successfully deleted ${ninja.name}`;
  }
  async edit(ninjaBody, id) {
    let originalNinja = await this.getOne(id);
    if (originalNinja.creatorId != ninjaBody.creatorId) {
      throw new Forbidden(
        `You do not have permission to edit ${originalNinja.name}.`
      );
    }
    originalNinja.name = ninjaBody.name || originalNinja.name;
    originalNinja.bio = ninjaBody.bio || originalNinja.bio;
    originalNinja.image = ninjaBody.image || originalNinja.image;
    originalNinja.isKage = ninjaBody.isKage;
    await originalNinja.save();
    return originalNinja;
  }
  async create(ninjaBody) {
    let ninja = await dbContext.Ninja.create(ninjaBody);
    await ninja.populate("creator");
    return ninja;
  }
  async getOne(id) {
    let ninja = await dbContext.Ninja.findById(id)
      .populate("creator")
      .populate("village");
    if (!ninja) {
      throw new BadRequest(`There is no ninja with [ID: ${id}].`);
    }
    return ninja;
  }
  async get() {
    let ninjas = await dbContext.Ninja.find()
      .populate("creator")
      .populate("village");
    return ninjas;
  }
}

export const narutoService = new NarutoService();
