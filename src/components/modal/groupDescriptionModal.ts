import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

const modal = new ModalBuilder().setCustomId("groupModal").setTitle("Grupo");

const groupDescriptionInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
  new TextInputBuilder()
    .setCustomId("groupDescription")
    .setLabel("Qual a descrição do seu grupo?")
    .setStyle(TextInputStyle.Paragraph)
);

export default modal.addComponents(groupDescriptionInputRow);
