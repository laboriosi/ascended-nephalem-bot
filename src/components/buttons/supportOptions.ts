import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder().setCustomId("suggestion").setLabel("Sugestão").setStyle(ButtonStyle.Secondary).setEmoji("💡"),
  new ButtonBuilder().setCustomId("denounce").setLabel("Denúncia").setStyle(ButtonStyle.Secondary).setEmoji("🚫")
);
