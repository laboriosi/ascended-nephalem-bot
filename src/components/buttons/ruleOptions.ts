import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("readAndAgreeRules")
    .setLabel("Li e concordo com as regras")
    .setStyle(ButtonStyle.Success),
  new ButtonBuilder().setCustomId("refuseRules").setLabel("Não concordo com as regras").setStyle(ButtonStyle.Danger)
);
