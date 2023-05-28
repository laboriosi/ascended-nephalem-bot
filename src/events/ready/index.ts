import { ChannelType, Client } from "~types";
import { rules, rolesDescription, supportMessage, shareGroupDescription } from "~embeds";
import {
  ruleOptions,
  rolesOptionsFirstRow,
  rolesOptionsSecondRow,
  supportOptions,
  roleSelect,
  shareGroup,
} from "~components";

export default async (client: Client) => {
  try {
    const {
      VISITANT_RULES_TEXT_CHANNEL_ID: visitantRulesTextChannelId,
      MEMBER_RULES_TEXT_CHANNEL_ID: memberRulesTextChannelId,
      ROLES_TEXT_CHANNEL_ID: rolesTextChannelId,
      SUPPORT_TEXT_CHANNEL_ID: supportTextChannelId,
      SHARE_GROUP_TEXT_CHANNEL_ID: shareGroupTextChannelId,
    } = process.env;

    const supportTextChannel = await client.channels.fetch(supportTextChannelId);
    const visitantRulesTextChannel = await client.channels.fetch(visitantRulesTextChannelId);
    const memberRulesTextChannel = await client.channels.fetch(memberRulesTextChannelId);
    const shareGroupTextChannel = await client.channels.fetch(shareGroupTextChannelId);

    if (shareGroupTextChannel.type === ChannelType.GuildText) {
      const messages = await shareGroupTextChannel.messages.fetch();
      const lastMessage = messages.last();

      if (lastMessage) {
        await lastMessage.fetch();
      } else {
        await shareGroupTextChannel.send({ embeds: [shareGroupDescription], components: [roleSelect, shareGroup] });
      }
    }

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

    if (supportTextChannel.type === ChannelType.GuildText) {
      const messages = await supportTextChannel.messages.fetch();
      const lastMessage = messages.last();

      if (lastMessage) {
        await lastMessage.fetch();
      } else {
        await supportTextChannel.send({ embeds: [supportMessage], components: [supportOptions] });
      }
    }

    const rolesTextChannel = await client.channels.fetch(rolesTextChannelId);

    if (rolesTextChannel.type === ChannelType.GuildText) {
      const messages = await rolesTextChannel.messages.fetch();
      const [firstMessage, lastMessage] = messages.map((message) => message);

      if (lastMessage) {
        await firstMessage.fetch();
        await lastMessage.fetch();
      } else {
        await rolesTextChannel.send({ embeds: [rolesDescription], components: [rolesOptionsFirstRow] });
        await rolesTextChannel.send({ components: [rolesOptionsSecondRow] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
