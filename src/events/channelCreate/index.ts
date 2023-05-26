import { NonThreadGuildBasedChannel, ComponentType, ChannelType, UserInfo, GuildMember, TextChannel } from "~types";
import { formQuestionBattleTag } from "~embeds";

export default async (channel: NonThreadGuildBasedChannel) => {
  try {
    const { FORM_CATEGORY_ID } = process.env;

    if (channel.type === ChannelType.GuildText && channel.parentId === FORM_CATEGORY_ID) {
      await channel.send({ embeds: [formQuestionBattleTag] });
    }
  } catch (error) {
    console.log(error);
  }
};
