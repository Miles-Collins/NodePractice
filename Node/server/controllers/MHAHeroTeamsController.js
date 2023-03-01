import { Auth0Provider } from "@bcwdev/auth0provider";
import { heroTeamsService } from "../services/MyHeroAcademia/HeroTeamsService";
import BaseController from "../utils/BaseController";

export class MHAHeroTeamsController extends BaseController {
  constructor() {
    super("/api/mha/heroTeams");
    this.router
      .get("", this.get)
      .get("/:id", this.getOne)
      // TEAM MEMBER \\
      .get("/:id/teamMember", this.getTeamMember)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("", this.delete)
      // TEAM MEMBER \\
      .post("/:id/teamMember", this.createTeamMember);
  }

  async get(req, res, next) {
    try {
      let teams = await heroTeamsService.get();
      return res.send(teams);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let team = await heroTeamsService.getOne(req.params.id);
      return res.send(team);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let teamData = req.body;
      teamData.creatorId = req.userInfo.id;
      let team = await heroTeamsService.create(teamData);
      return res.send(team);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let teamData = req.body;
      teamData.creatorId = req.userInfo.id;
      let editedTeam = await heroTeamsService.edit(teamData, req.params.id);
      return res.send(editedTeam);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let teamId = req.params.id;
      let message = await heroTeamsService.delete(teamId, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  // TEAM MEMBER \\

  async getTeamMember(req, res, next) {
    try {
      let teamId = req.params.id;
      let teamMembers = await heroTeamsService.getTeamMembers(teamId);
      return res.send(teamMembers);
    } catch (error) {
      next(error);
    }
  }

  async createTeamMember(req, res, next) {
    try {
      let teamMemberBody = req.body;
      teamMemberBody.teamId = req.params.id;
      teamMemberBody.creatorId = req.userInfo.id;
      let teamMember = await heroTeamsService.createTeamMember(teamMemberBody);
      return res.send(teamMember);
    } catch (error) {
      next(error);
    }
  }
}
