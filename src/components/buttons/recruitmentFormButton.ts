import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder().setCustomId("recruitmentFormButton").setLabel("📝 Iniciar!").setStyle(ButtonStyle.Danger)
);
