import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("leveling")
    .setLabel("Leveling")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:experience:1110602399434936401>"),
  new ButtonBuilder()
    .setCustomId("pvp")
    .setLabel("PvP")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:pvp:1110604343830380574>"),
  new ButtonBuilder()
    .setCustomId("bounty")
    .setLabel("Bounty")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:bounty:1110635757565132901>")
);
