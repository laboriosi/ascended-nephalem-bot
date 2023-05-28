import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("shareGroup")
    .setLabel("Compartilhar")
    .setEmoji("<:send:1112419163768623224>")
    .setStyle(ButtonStyle.Secondary)
);
