import { GuildMember } from "~types";

export default async (member: GuildMember) => {
  const { VISITANT_ROLE_ID, GUILD_ID } = process.env;
  if (member.guild.id === GUILD_ID) member.roles.add(VISITANT_ROLE_ID);
};
