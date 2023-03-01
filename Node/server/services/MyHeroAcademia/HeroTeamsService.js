import { dbContext } from "../../db/DbContext";
import { BadRequest, Forbidden } from "../../utils/Errors";

class HeroTeamsService {
  async delete(teamId, userId) {
    let deletedTeam = await this.getOne(teamId);
    if (deletedTeam.creatorId != userId) {
      throw new Forbidden(
        `You do not have permission to delete ${deletedTeam.name}.`
      );
    }
    await deletedTeam.remove();
    return `You have successfully deleted Team ${deletedTeam.name}.`;
  }
  async edit(teamData, teamId) {
    let originalTeam = await this.getOne(teamId);
    if (originalTeam.creatorId != teamData.creatorId) {
      throw new Forbidden(
        `You cannot edit ${originalTeam.name}, you do not have permission.`
      );
    }
    originalTeam.name = teamData.name || originalTeam.name;
    originalTeam.description = teamData.description || originalTeam.description;
    await originalTeam.save();
    return originalTeam;
  }
  async create(teamData) {
    let team = await dbContext.HeroTeam.create(teamData);
    await team.populate("creator");
    await team.populate("heroCount");
    await team.populate("heroes");
    return team;
  }
  async getOne(teamId) {
    let team = await dbContext.HeroTeam.findById(teamId)
      .populate("creator")
      .populate("heroCount")
      .populate("heroes");
    if (!team) {
      throw new BadRequest("That hero team no longer exist.");
    }
    return team;
  }
  async get() {
    let teams = await dbContext.HeroTeam.find()
      .populate("creator")
      .populate("heroCount")
      .populate("heroes");
    return teams;
  }

  // TEAM MEMBER \\

  async getTeamMembers(teamId) {
    let hero = await dbContext.Hero.find({ teamId })
      .populate("quirk")
      .populate("creator")
      .populate("team")
      .populate("personals")
      .populate("status");
    return hero;
  }

  async createTeamMember(teamMemberBody) {
    let teamMember = await dbContext.TeamMember.create(teamMemberBody);
    return teamMember;
  }
}

export const heroTeamsService = new HeroTeamsService();
