import { ChannelType, Message, TextChannel } from "~types";
import { formInvalidBattleTag, formSuccess, formBattleTagCharacterLimit } from "~embeds";
import { EmbedBuilder } from "discord.js";

export default async (message: Message) => {
  const { LOGS_TEXT_CHANNEL_ID: logsTextChannelId } = process.env;

  const logsTextChannel = await message.guild.channels.fetch(logsTextChannelId);

  if (logsTextChannel.type === ChannelType.GuildText) {
    const channel = await message.channel.fetch();

    await logsTextChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#da373c")
          .setAuthor({ iconURL: message.author.avatarURL(), name: message.author.username })
          .setTimestamp(message.createdTimestamp)
          .setFields({ name: "Canal", value: `${(channel as TextChannel).name}` }),
      ],
    });
  }

  try {
    const {
      FORM_CATEGORY_ID,
      MEMBER_ROLE_ID,
      VISITANT_ROLE_ID,
      OWNER_ID,
      GENERAL_CHAT_ID,
      RECRUITMENT_PENDING_ROLE_ID,
    } = process.env;
    const messageChannel = await message.channel.fetch();
    const discordNicknameCharacterLimit = 32;
    if (
      messageChannel.type === ChannelType.GuildText &&
      messageChannel.parentId === FORM_CATEGORY_ID &&
      !message.author.bot
    ) {
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
        const member = await message.guild.members.fetch(message.author.id);
        if (member.id !== OWNER_ID) await member.setNickname(battleTag);
        await messageChannel.send({
          embeds: [formSuccess],
        });
        await member.roles.add(MEMBER_ROLE_ID);
        await member.roles.add(RECRUITMENT_PENDING_ROLE_ID);
        await member.roles.remove(VISITANT_ROLE_ID);
        const generalChat = await message.guild.channels.fetch(GENERAL_CHAT_ID);

        if (generalChat.type === ChannelType.GuildText) {
          generalChat.send({ content: `Bem vindo, nephalem <@${member.id}>!` });
        }
        setTimeout(() => message.channel.delete(), 3000);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
