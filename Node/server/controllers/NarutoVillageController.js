import { Auth0Provider } from "@bcwdev/auth0provider";
import { villageService } from "../services/Naruto/VillageService";
import BaseController from "../utils/BaseController";

export class NarutoVillageController extends BaseController {
  constructor() {
    super("api/naruto/village");
    this.router
      .get("", this.get)
      .get("/:id", this.getOne)
      // NINJA \\
      .get("/:id/ninja", this.getOneNinja)
      ///////////
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      // NINJA \\
      .post("/:id/ninja", this.joinVillage)
      .delete("/:id/ninja", this.leaveVillage);
    //
  }

  async get(req, res, next) {
    try {
      let villages = await villageService.get();
      return res.send(villages);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let village = await villageService.getOne(req.params.id);
      return res.send(village);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let villageBody = req.body;
      villageBody.creatorId = req.userInfo.id;
      let village = await villageService.create(villageBody);
      return res.send(village);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let villageBody = req.body;
      villageBody.creatorId = req.userInfo.id;
      let village = await villageService.edit(villageBody, req.params.id);
      return res.send(village);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let user = req.userInfo.id;
      let village = await villageService.delete(req.params.id, user);
      return res.send(village);
    } catch (error) {
      next(error);
    }
  }

  // /////////////////////////////////////////////////////////////////////////// NINJA ///////////////////////////////////////////////////////////

  async getOneNinja(req, res, next) {
    try {
      let ninja = villageService.getOneNinja(req.params.id);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }

  async joinVillage(req, res, next) {
    try {
      let ninjaBody = req.body;
      ninjaBody.CreatorId = req.UserInfo.id;
      ninjaBody.villageId = req.params.id;
      let ninja = await villageService.joinVillage(ninjaBody);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }

  async leaveVillage(req, res, next) {
    try {
      let userId = req.UserInfo.id;
      let ninja = await villageService.leaveVillage(req.params.id, userId);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }
}
