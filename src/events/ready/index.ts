import { ChannelType, Client } from "~types";
import { rules, rolesDescription } from "~embeds";
import { ruleOptions, rolesOptions } from "~components";

export default async (client: Client) => {
  const { VISITANT_RULES_TEXT_CHANNEL_ID: visitantRulesTextChannelId, ROLES_TEXT_CHANNEL_ID: rolesTextChannelId } =
    process.env;

  const visitantRulesTextChannel = await client.channels.fetch(visitantRulesTextChannelId);

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
};
