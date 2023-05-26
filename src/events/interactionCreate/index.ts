import { GuildMember, PermissionsBitField } from "discord.js";
import { denounceInfo, suggestionInfo } from "~embeds";
import { ChannelType, Interaction } from "~types";
import { closeChannelButton } from "~components";

export default async (interaction: Interaction) => {
  try {
    const {
      FORM_CATEGORY_ID: formCategoryId,
      MEMBER_ROLE_ID: memberRoleId,
      LEVELING_ROLE_ID: levelingRoleId,
      PVP_ROLE_ID: pvpRoleId,
      BOUNTY_ROLE_ID: bountyRoleId,
      DUNGEON_ROLE_ID: dungeonRoleId,
      NIGHTMARE_DUNGEON_ROLE_ID: nightmareDungeonRoleId,
      TICKET_CATEGORY_ID: ticketCategoryId,
      OFFICER_ROLE_ID: officerRoleId,
      HELPER_ROLE_ID: helperRoleId,
    } = process.env;
    const member = interaction.member as GuildMember;
    const user = member.user;
    const guild = member.guild;

    if (interaction.isButton()) {
      if (interaction.customId === "leveling") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(levelingRoleId)) {
          member.roles.remove(levelingRoleId);
        } else {
          member.roles.add(levelingRoleId);
        }
      }

      if (interaction.customId === "pvp") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(pvpRoleId)) {
          member.roles.remove(pvpRoleId);
        } else {
          member.roles.add(pvpRoleId);
        }
      }

      if (interaction.customId === "bounty") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(bountyRoleId)) {
          member.roles.remove(bountyRoleId);
        } else {
          member.roles.add(bountyRoleId);
        }
      }

      if (interaction.customId === "dungeon") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(dungeonRoleId)) {
          member.roles.remove(dungeonRoleId);
        } else {
          member.roles.add(dungeonRoleId);
        }
      }

      if (interaction.customId === "nightmare_dungeon") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(nightmareDungeonRoleId)) {
          member.roles.remove(nightmareDungeonRoleId);
        } else {
          member.roles.add(nightmareDungeonRoleId);
        }
      }

      if (interaction.customId === "refuseRules") {
        interaction.reply({
          ephemeral: true,
          content: `Parece receber o cargo de <@&${memberRoleId}> você deve ler e concordar com as regras`,
        });
      }

      if (interaction.customId === "close") {
        const channel = await interaction.channel.fetch();
        await channel.delete();
      }

      if (interaction.customId === "denounce") {
        const channelName = `🎫┃denúncia-do-${user.username.toLowerCase()}`;

        const createdChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: ticketCategoryId,
          permissionOverwrites: [
            { id: member.id, allow: [PermissionsBitField.Default] },
            { id: officerRoleId, allow: [PermissionsBitField.Default] },
            { id: helperRoleId, allow: [PermissionsBitField.Default] },
            { id: guild.roles.everyone, deny: [PermissionsBitField.All] },
          ],
        });

        await createdChannel.send({ embeds: [denounceInfo], components: [closeChannelButton] });

        interaction.reply({
          ephemeral: true,
          content: `Foi iniciado um ticket de denúncia, clique aqui <#${createdChannel.id}>`,
        });
      }

      if (interaction.customId === "suggestion") {
        const channelName = `🎫┃sugestão-do-${user.username.toLowerCase()}`;

        const createdChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: ticketCategoryId,
          permissionOverwrites: [
            { id: member.id, allow: [PermissionsBitField.Default] },
            { id: officerRoleId, allow: [PermissionsBitField.Default] },
            { id: helperRoleId, allow: [PermissionsBitField.Default] },
            { id: guild.roles.everyone, deny: [PermissionsBitField.All] },
          ],
        });

        await createdChannel.send({ embeds: [suggestionInfo], components: [closeChannelButton] });

        interaction.reply({
          ephemeral: true,
          content: `Foi iniciado um ticket de sugestão, clique aqui <#${createdChannel.id}>`,
        });
      }

      if (interaction.customId === "readAndAgreeRules") {
        const channelName = `📝┃form-do-${user.username.toLowerCase()}`;
        const formChannel = guild.channels.cache.find((channel) => channel.name === channelName);

        if (formChannel) {
          interaction.reply({
            ephemeral: true,
            content: `Já existe um canal criado para seguir o próximo passo, clique aqui <#${formChannel.id}>`,
          });
        } else {
          const createdChannel = await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: formCategoryId,
            permissionOverwrites: [
              { id: member.id, allow: [PermissionsBitField.Default] },
              { id: guild.roles.everyone, deny: [PermissionsBitField.All] },
            ],
          });

          interaction.reply({
            ephemeral: true,
            content: `Foi iniciado um formulário para você prencher, clique aqui <#${createdChannel.id}>`,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
