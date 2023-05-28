import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("dungeon")
    .setLabel("Dungeon")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:dungeon:1110583517114531870>"),
  new ButtonBuilder()
    .setCustomId("nightmare_dungeon")
    .setLabel("Nightmare Dungeon")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:nightmare_dungeon:1110605351851659336>"),
  new ButtonBuilder()
    .setCustomId("world_boss")
    .setLabel("World Boss")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("<:world_boss2:1110889291279761428>")
);
