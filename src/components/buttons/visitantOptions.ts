import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder().setCustomId("approve").setLabel("Aprovar").setStyle(ButtonStyle.Success),
  new ButtonBuilder().setCustomId("deny").setLabel("Negar").setStyle(ButtonStyle.Danger)
);
