import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { FighterSchema } from "../models/DragonBallZ/Fighter";
import { UniverseSchema } from "../models/DragonBallZ/Universe";
import { HoloSchema } from "../models/Holo/Holo";
import { HeroSchema } from "../models/MyHeroAcademia/Hero";
import { HeroTeamSchema } from "../models/MyHeroAcademia/HeroTeam";
import { PersonalsSchema } from "../models/MyHeroAcademia/Personals";
import { QuirkSchema } from "../models/MyHeroAcademia/Quirk";
import { StatusSchema } from "../models/MyHeroAcademia/Status";
import { TeamMemberSchema } from "../models/MyHeroAcademia/TeamMember";
import { MissingNinSchema } from "../models/Naruto/MissingNin";
import { NinjaSchema } from "../models/Naruto/Ninja";
import { VillageSchema } from "../models/Naruto/Village";
import { CrewMemberSchema } from "../models/OnePiece/CrewMember";
import { DevilFruitSchema } from "../models/OnePiece/DevilFruit";
import { PirateSchema } from "../models/OnePiece/Pirate";
import { PirateCrewSchema } from "../models/OnePiece/PirateCrew";
import { StatisticsSchema } from "../models/OnePiece/Statistics";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);

  ////////////// SECTION
  /////////////// Naruto \\\\\\\\\\\\\\\\\\\\\\

  Ninja = mongoose.model("Ninja", NinjaSchema);
  Village = mongoose.model("Village", VillageSchema);
  MissingNin = mongoose.model("MissingNin", MissingNinSchema);

  //////////////// SECTION
  /////////////// DragonBall \\\\\\\\\\\\\\\\\\\\\\

  Fighter = mongoose.model("Fighter", FighterSchema);
  Universe = mongoose.model("Universe", UniverseSchema);

  //////////////// SECTION
  /////////////// One Piece \\\\\\\\\\\\\\\\\\\\\\
  PirateCrew = mongoose.model("PirateCrew", PirateCrewSchema);
  Pirate = mongoose.model("Pirate", PirateSchema);
  CrewMember = mongoose.model("CrewMember", CrewMemberSchema);
  Statistics = mongoose.model("Statistics", StatisticsSchema);
  DevilFruit = mongoose.model("DevilFruit", DevilFruitSchema);

  /////////////////// SECTION
  /////////////// MY HERO ACADEMIA \\\\\\\\\\\\\\\\\\\\\\

  HeroTeam = mongoose.model("HeroTeam", HeroTeamSchema);
  Hero = mongoose.model("Hero", HeroSchema);
  TeamMember = mongoose.model("TeamMember", TeamMemberSchema);
  Quirk = mongoose.model("Quirk", QuirkSchema);
  Status = mongoose.model("Status", StatusSchema);
  Personals = mongoose.model("Personals", PersonalsSchema);

  /////////////////////////////////////////////////////////////

  Holo = mongoose.model("Holo", HoloSchema);
}

export const dbContext = new DbContext();
