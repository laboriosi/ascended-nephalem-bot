import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export default new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("role")
    .setPlaceholder("Selecione o cargo que você quer notificar")
    .addOptions(
      {
        label: "Leveling",
        value: "1110662832846020650",
        emoji: "<:experience:1110602399434936401>",
      },
      {
        label: "PvP",
        value: "1110662937162555523",
        emoji: "<:pvp:1110604343830380574>",
      },
      {
        label: "Helltide",
        value: "1110663058654773379",
        emoji: "<:helltide:1127274346755391578>",
      },
      {
        label: "Dungeon",
        value: "1110663493784436807",
        emoji: "<:dungeon:1110583517114531870>",
      },
      {
        label: "Nightmare Dungeon",
        value: "1110663234765205626",
        emoji: "<:nightmare_dungeon:1110605351851659336>",
      },

      {
        label: "World Boss",
        value: "1112403692868616323",
        emoji: "<:world_boss2:1110889291279761428>",
      },
      {
        label: "Hardcore",
        value: "1112494172742619187",
        emoji: "<:hardcore:1112493800422654032>",
      }
    )
);
