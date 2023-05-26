import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder().setCustomId("close").setLabel("Fechar Ticket").setStyle(ButtonStyle.Danger)
);
