import { Auth0Provider } from "@bcwdev/auth0provider";
import { pirateCrewService } from "../services/OnePiece/PirateCrewService";
import BaseController from "../utils/BaseController";

export class OnePiecePirateCrewController extends BaseController {
  constructor() {
    super("/api/onePiece/pirateCrew");
    this.router
      .get("", this.get)
      .get("/:id", this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("", this.delete);
  }

  async get(req, res, next) {
    try {
      let crews = await pirateCrewService.get();
      return res.send(crews);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let crew = await pirateCrewService.getOne(req.params.id);
      return res.send(crew);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let crewData = req.body;
      crewData.creatorId = req.userInfo.id;
      let crew = await pirateCrewService.create(crewData);
      return res.send(crew);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let crewData = req.body;
      crewData.creatorId = req.userInfo.id;
      let crew = await pirateCrewService.edit(req.params.id, crewData);
      return res.send(crew);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let message = await pirateCrewService.delete(req.params.id, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}
