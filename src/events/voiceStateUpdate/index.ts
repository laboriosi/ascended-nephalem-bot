import { ChannelType, VoiceState } from "~types";
import emoji from "~constants/emoji";
import { PermissionsBitField } from "discord.js";

function generateRandomNumber(limit: number): number {
  const randomNumber = Math.random() * limit;
  const roundedRandomNumber = Math.floor(randomNumber);

  return roundedRandomNumber;
}

function getRandomEmoji() {
  const randomIndex = generateRandomNumber(emoji.length);
  return emoji[randomIndex];
}

export default async (oldState: VoiceState, newState: VoiceState) => {
  try {
    const { CREATE_VOICE_CHANNEL_ID, GROUPS_CATEGORY_ID, MEMBER_ROLE_ID: memberRoleId } = process.env;
    const isJoiningCreateRoomChannel = newState.channelId === CREATE_VOICE_CHANNEL_ID;
    const isLastMemberLeavingTemporaryChannel =
      oldState.channelId !== CREATE_VOICE_CHANNEL_ID &&
      oldState.channel?.parent?.id === GROUPS_CATEGORY_ID &&
      oldState.channel.members.size === 0;

    const emoji = getRandomEmoji();

    if (isLastMemberLeavingTemporaryChannel) {
      await oldState.channel.delete();
    }

    if (isJoiningCreateRoomChannel) {
      const creator = newState.member;
      const creatorName = creator.displayName;
      const createdChannel = await newState.guild.channels.create({
        name: `「${emoji}」Grupo do ${creatorName}`,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parent,
        permissionOverwrites: [
          {
            id: creator.id,
            allow: [
              PermissionsBitField.Flags.MoveMembers,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.UseExternalSounds,
              PermissionsBitField.Flags.UseSoundboard,
            ],
          },
          { id: memberRoleId, allow: [PermissionsBitField.Default] },
          { id: newState.guild.roles.everyone, deny: [PermissionsBitField.All] },
        ],
      });
      await creator.voice.setChannel(createdChannel.id);
    }
  } catch (error) {
    console.log(error);
  }
};
