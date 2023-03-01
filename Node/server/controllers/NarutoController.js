import { narutoService } from "../services/Naruto/NarutoService";
import BaseController from "../utils/BaseController";

export class NarutoController extends BaseController {
  constructor() {
    super("api/naruto/ninja");
    this.router
      .get("", this.get)
      .get("/:id", this.getOne)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async get(req, res, next) {
    try {
      let ninjas = await narutoService.get();
      return res.send(ninjas);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const ninja = await narutoService.getOne(req.params.id);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let ninjaBody = req.body;
      ninjaBody.CreatorId = req.userInfo.id;
      const ninja = await narutoService.create(ninjaBody);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let ninjaBody = req.body;
      ninjaBody.CreatorId = req.userInfo.id;
      const ninja = await narutoService.edit(ninjaBody, req.params.id);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.UserInfo.id;
      const ninja = await narutoService.delete(req.params.id, userId);
      return res.send(ninja);
    } catch (error) {
      next(error);
    }
  }
}
