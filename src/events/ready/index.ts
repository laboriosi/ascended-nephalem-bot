import { ChannelType, Client } from "~types";
import { rules, rolesDescription } from "~embeds";
import { ruleOptions, rolesOptions } from "~components";

export default async (client: Client) => {
  try {
    const {
      VISITANT_RULES_TEXT_CHANNEL_ID: visitantRulesTextChannelId,
      MEMBER_RULES_TEXT_CHANNEL_ID: memberRulesTextChannelId,
      ROLES_TEXT_CHANNEL_ID: rolesTextChannelId,
    } = process.env;

    const visitantRulesTextChannel = await client.channels.fetch(visitantRulesTextChannelId);
    const memberRulesTextChannel = await client.channels.fetch(memberRulesTextChannelId);

    if (memberRulesTextChannel.type === ChannelType.GuildText) {
      const messages = await memberRulesTextChannel.messages.fetch();
      const lastMessage = messages.last();

      if (!lastMessage) {
        await memberRulesTextChannel.send({ embeds: [rules] });
      }
    }

    if (visitantRulesTextChannel.type === ChannelType.GuildText) {
      const messages = await visitantRulesTextChannel.messages.fetch();
      const lastMessage = messages.last();

      if (lastMessage) {
        await lastMessage.fetch();
      } else {
        await visitantRulesTextChannel.send({ embeds: [rules], components: [ruleOptions] });
      }
    }

    const rolesTextChannel = await client.channels.fetch(rolesTextChannelId);

    if (rolesTextChannel.type === ChannelType.GuildText) {
      const messages = await rolesTextChannel.messages.fetch();
      const lastMessage = messages.last();

      if (lastMessage) {
        await lastMessage.fetch();
      } else {
        await rolesTextChannel.send({ embeds: [rolesDescription], components: [rolesOptions] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
