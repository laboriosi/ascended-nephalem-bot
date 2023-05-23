import { ChannelType, Client } from "~types";
import { rules } from "~embeds";
import { ruleOptions } from "~components";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default async (client: Client) => {
  const { VISITANT_RULES_TEXT_CHANNEL_ID: visitantRulesTextChannelId } = process.env;

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

  const rolesTextChannel = await client.channels.fetch("1110597624882532433");

  if (rolesTextChannel.type === ChannelType.GuildText) {
    await rolesTextChannel.send({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("4")
            .setLabel("Leveling")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:experience:1110602399434936401>"),
          new ButtonBuilder()
            .setCustomId("1")
            .setLabel("PvP")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:pvp:1110604343830380574>"),
          new ButtonBuilder()
            .setCustomId("6")
            .setLabel("Bounty")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:bounty:1110635757565132901>"),
          new ButtonBuilder()
            .setCustomId("2")
            .setLabel("Dungeon")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:dungeon:1110583517114531870>"),
          new ButtonBuilder()
            .setCustomId("3")
            .setLabel("Nightmare Dungeon")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("<:nightmare_dungeon:1110605351851659336>")
        ),
      ],
    });

    // await rolesTextChannel.send({
    //   components: [
    //     new ActionRowBuilder<ButtonBuilder>().addComponents(
    //       new ButtonBuilder()
    //         .setCustomId("recruitmentFormButton")
    //         .setLabel("Dungeon")
    //         .setStyle(ButtonStyle.Danger)
    //         .setEmoji("<:dungeon:1110583517114531870>")
    //     ),
    //   ],
    // });

    // await rolesTextChannel.send({
    //   components: [
    //     new ActionRowBuilder<ButtonBuilder>().addComponents(
    //       new ButtonBuilder()
    //         .setCustomId("recruitmentFormButton")
    //         .setLabel("Nightmare Dungeon")
    //         .setStyle(ButtonStyle.Danger)
    //         .setEmoji("<:nightmare_dungeon:1110605351851659336>")
    //     ),
    //   ],
    // });

    // await rolesTextChannel.send({
    //   components: [
    //     new ActionRowBuilder<ButtonBuilder>().addComponents(
    //       new ButtonBuilder()
    //         .setCustomId("recruitmentFormButton")
    //         .setLabel("Leveling")
    //         .setStyle(ButtonStyle.Danger)
    //         .setEmoji("<:experience:1110602399434936401>")
    //     ),
    //   ],
    // });
  }
};
