import { ChannelType, Message, TextChannel } from "~types";
import {
  formInvalidBattleTag,
  formQuestionCellphone,
  formSuccess,
  formBattleTagCharacterLimit,
  formInvalidCellphone,
} from "~embeds";
import { visitantOptions } from "~components";
import { EmbedBuilder } from "discord.js";
import database from "~database";

export default async (message: Message) => {
  try {
    const {
      LOGS_TEXT_CHANNEL_ID: logsTextChannelId,
      FORM_CATEGORY_ID: formCategoryId,
      OWNER_ID: ownerId,
      PENDING_APPROVE_TEXT_CHANNEL_ID: pendingApproveTextChannelId,
      PENDING_APPROVE_ROLE_ID: pendingApproveRoleId,
      VISITANT_ROLE_ID: visitantRoleId,
    } = process.env;
    const messageChannel = await message.channel.fetch();
    const discordNicknameCharacterLimit = 32;
    const logsTextChannel = await message.guild.channels.fetch(logsTextChannelId);
    const memberDocumentReference = database.collection("members");

    if (logsTextChannel.type === ChannelType.GuildText && !message.author.bot) {
      const channel = await message.channel.fetch();

      await logsTextChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#da373c")
            .setAuthor({ iconURL: message.author.avatarURL(), name: message.author.username })
            .setTimestamp(message.createdTimestamp)
            .setDescription(message.content)
            .setFields({ name: "Canal", value: `${(channel as TextChannel).name}` }),
        ],
      });
    }

    if (
      messageChannel.type === ChannelType.GuildText &&
      messageChannel.parentId === formCategoryId &&
      !message.author.bot
    ) {
      const memberDocument = await memberDocumentReference.doc(message.author.id).get();

      if (memberDocument.exists) {
        const numbers = message.content.replace(/\D/gm, "");
        const data = memberDocument.data();
        if (numbers.length < 5) {
          messageChannel.send({
            embeds: [formInvalidCellphone],
          });
        } else {
          memberDocumentReference.doc(message.author.id).update({
            ...data,
            cellphone: message.content,
          });

          const member = await message.guild.members.fetch(message.author.id);
          if (member.id !== ownerId) await member.setNickname(data.battleTag);
          await member.roles.add(pendingApproveRoleId);
          await member.roles.remove(visitantRoleId);
          const pendingApproveTextChannel = await message.guild.channels.fetch(pendingApproveTextChannelId);

          if (pendingApproveTextChannel.type === ChannelType.GuildText) {
            pendingApproveTextChannel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor("#da373c")
                  .addFields(
                    { name: "BattleTag", value: data.battleTag },
                    { name: "Celular", value: message.content },
                    { name: "DiscordId", value: message.author.id }
                  )
                  .setThumbnail(
                    member.displayAvatarURL() || "https://i.ibb.co/SKMwMZv/1f0bfc0865d324c2587920a7d80c609b-1.png"
                  ),
              ],
              components: [visitantOptions],
            });
          }

          await messageChannel.send({
            embeds: [formSuccess],
          });

          setTimeout(() => message.channel.delete(), 5000);
        }
      } else {
        const battleTagRegex = /\S+#\d+/gm;
        const [battleTag] = message.content.match(battleTagRegex) || [];

        if (!battleTag) {
          messageChannel.send({
            embeds: [formInvalidBattleTag],
          });
        } else if (battleTag.length >= discordNicknameCharacterLimit) {
          messageChannel.send({
            embeds: [formBattleTagCharacterLimit],
          });
        } else {
          await memberDocumentReference.doc(message.author.id).set({
            battleTag,
          });

          await messageChannel.send({
            embeds: [formQuestionCellphone],
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
