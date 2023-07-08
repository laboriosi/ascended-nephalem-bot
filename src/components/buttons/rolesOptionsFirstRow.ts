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
    .setCustomId("helltide")
    .setLabel("Helltide")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:helltide:1127274346755391578>"),
  new ButtonBuilder()
    .setCustomId("hardcore")
    .setLabel("Hardcore")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:hardcore:1112493800422654032>")
);
