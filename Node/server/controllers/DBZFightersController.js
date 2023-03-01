import { Auth0Provider } from "@bcwdev/auth0provider";
import { fightersService } from "../services/DragonBallZ/FightersService";
import BaseController from "../utils/BaseController";

export class DBZFightersController extends BaseController {
  constructor() {
    super("/api/dbz/fighters");
    this.router
      .get("", this.get)
      .get("/:id", this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create);
  }

  async get(req, res, next) {
    try {
      let fighters = await fightersService.get();
      return res.send(fighters);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let fighter = await fightersService.getOne(req.params.id);
      return res.send(fighter);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let fighterData = req.body;
      fighterData.creatorId = req.UserInfo.id;
      let fighter = await fightersService.create(fighterData);
      return res.send(fighter);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let fighterData = req.body;
      fighterData.creatorId = req.UserInfo.id;
      let fighter = await fightersService.edit(req.params.id, fighterData);
      return res.send(fighter);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.UserInfo.id;
      let message = await fightersService.delete(req.params.id, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}
