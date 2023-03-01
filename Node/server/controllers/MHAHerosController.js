import { Auth0Provider } from "@bcwdev/auth0provider";
import { heroService } from "../services/MyHeroAcademia/HeroService";
import BaseController from "../utils/BaseController";

export class MHAHerosController extends BaseController {
  constructor() {
    super("api/mha/heros");
    this.router
      .get("/holo", this.getHolos)
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("/holo", this.createHolo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("", this.delete)
      // QUIRK \\
      .post("/:id/quirk", this.createQuirk)
      // STATUS \\
      .post("/:id/status", this.createStatus)
      // PERSONALS \\
      .post("/:id/personals", this.createPersonals);
  }

  async getAll(req, res, next) {
    try {
      let heroes = await heroService.getAll();
      return res.send(heroes);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let hero = await heroService.getOne(req.params.id);
      return res.send(hero);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let heroBody = req.body;
      heroBody.creatorId = req.userInfo.id;
      let hero = await heroService.create(heroBody);
      return res.send(hero);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let heroBody = req.body;
      heroBody.creatorId = req.userInfo.id;
      heroBody.id = req.params.id;
      let editedHero = await heroService.edit(heroBody);
      return res.send(editedHero);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let heroBody = req.body;
      heroBody.creatorId = req.userInfo.id;
      let message = await heroService.delete(heroBody);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  // QUIRK \\

  async createQuirk(req, res, next) {
    try {
      let quirkBody = req.body;
      quirkBody.creatorId = req.userInfo.id;
      quirkBody.heroId = req.params.id;
      let quirk = await heroService.createQuirk(quirkBody);
      return res.send(quirk);
    } catch (error) {
      next(error);
    }
  }

  // STATUS \\

  async createStatus(req, res, next) {
    try {
      let statusBody = req.body;
      statusBody.creatorId = req.userInfo.id;
      statusBody.heroId = req.params.id;
      let status = await heroService.createStatus(statusBody);
      return res.send(status);
    } catch (error) {
      next(error);
    }
  }

  // PERSONALS \\

  async createPersonals(req, res, next) {
    try {
      let personalsBody = req.body;
      personalsBody.heroId = req.params.id;
      personalsBody.creatorId = req.userInfo.id;
      let personals = await heroService.createPersonals(personalsBody);
      return res.send(personals);
    } catch (error) {
      next(error);
    }
  }

  // HOLO \\
  async getHolos(req, res, next) {
    try {
      let holos = await heroService.getHolos();
      return res.send(holos);
    } catch (error) {
      next(error);
    }
  }

  async createHolo(req, res, next) {
    try {
      let holoBody = req.body;
      let holo = await heroService.createHolo(holoBody);
      return res.send(holo);
    } catch (error) {
      next(error);
    }
  }
}
