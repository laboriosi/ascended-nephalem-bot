import { ActionRowBuilder, SelectMenuBuilder } from "discord.js";

export default new ActionRowBuilder<SelectMenuBuilder>().addComponents(
  new SelectMenuBuilder()
    .setCustomId("timeOfDay")
    .setPlaceholder("Selecione os horários que você pretende jogar")
    .setMinValues(1)
    .setMaxValues(3)
    .addOptions(
      {
        label: "Manhã",
        value: "morning",
      },
      {
        label: "Tarde",
        value: "afternoon",
      },
      {
        label: "Noite",
        value: "night",
      }
    )
);
