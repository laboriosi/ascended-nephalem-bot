import { GuildMember } from "~types";

export default async (member: GuildMember) => {
  try {
    const { VISITANT_ROLE_ID, GUILD_ID } = process.env;
    if (member.guild.id === GUILD_ID) member.roles.add(VISITANT_ROLE_ID);
  } catch (error) {
    console.log(error);
  }
};
