import { dbContext } from "../../db/DbContext";
import { BadRequest, Forbidden } from "../../utils/Errors";

class HeroService {
  async delete(heroBody) {
    let hero = await this.getOne(heroBody.id);
    if (hero.creatorId != heroBody.creatorId) {
      throw new Forbidden(`You do not have permission to delete ${hero.name}.`);
    }
    await hero.remove();
    return `You successfully deleted ${hero.name}.`;
  }
  async edit(heroBody) {
    let originalHero = await this.getOne(heroBody.id);
    if (originalHero.creatorId != heroBody.creatorId) {
      throw new Forbidden(
        `You do not have permission to edit ${originalHero.name}.`
      );
    }
    originalHero.name = heroBody.name || originalHero.name;
    originalHero.bio = heroBody.bio || originalHero.bio;
    await originalHero.save();
    return originalHero;
  }
  async create(heroBody) {
    let hero = await dbContext.Hero.create(heroBody);
    await hero.populate("creator");
    await hero.populate("quirk");
    await hero.populate("team");
    await hero.populate("personals");
    return hero;
  }
  async getOne(heroId) {
    let hero = await dbContext.Hero.findById(heroId)
      .populate("creator")
      .populate("quirk")
      .populate("team")
      .populate("status")
      .populate("personals");
    if (hero == null) {
      throw new BadRequest("That Hero does not exist.");
    }
    return hero;
  }
  async getAll() {
    let heroes = await dbContext.Hero.find()
      .populate("creator")
      .populate("quirk")
      .populate("team")
      .populate("status")
      .populate("personals");
    return heroes;
  }

  // QUIRK \\

  async createQuirk(quirkBody) {
    let hero = await this.getOne(quirkBody.heroId);
    if (hero.creatorId != quirkBody.creatorId) {
      throw new Forbidden(
        `You do not have permission to manifest this quirk onto ${hero.name}.`
      );
    }
    let quirk = await (
      await (await dbContext.Quirk.create(quirkBody)).populate("hero")
    ).populate("creator");
    return quirk;
  }

  // STATUS \\

  async createStatus(statusBody) {
    let hero = await this.getOne(statusBody.heroId);
    if (hero.creatorId != statusBody.creatorId) {
      throw new Forbidden(
        `You do not have permission to update the status of ${hero.name}.`
      );
    }
    let status = await dbContext.Status.create(statusBody);
    return status;
  }

  // PERSONALS \\

  async createPersonals(personalsBody) {
    let hero = await this.getOne(personalsBody.heroId);
    if (hero.creatorId != personalsBody.creatorId) {
      throw new Forbidden(`You do not have permission to edit ${hero.name}.`);
    }
    let personals = await dbContext.Personals.create(personalsBody);
    return personals;
  }

  // HOLOS \\

  async getHolos() {
    let holos = await dbContext.Holo.find();
    return holos;
  }

  async createHolo(holoBody) {
    let holo = await dbContext.Holo.create(holoBody);
    return holo;
  }
}

export const heroService = new HeroService();
