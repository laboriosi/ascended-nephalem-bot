import { GuildMember, PermissionsBitField } from "discord.js";
import { denounceInfo, suggestionInfo } from "~embeds";
import { ChannelType, Interaction } from "~types";
import { closeChannelButton, groupDescriptionModal } from "~components";

const localState = {};

export default async (interaction: Interaction) => {
  try {
    const {
      FORM_CATEGORY_ID: formCategoryId,
      MEMBER_ROLE_ID: memberRoleId,
      LEVELING_ROLE_ID: levelingRoleId,
      PVP_ROLE_ID: pvpRoleId,
      HELLTIDE_ROLE_ID: helltideRoleId,
      DUNGEON_ROLE_ID: dungeonRoleId,
      NIGHTMARE_DUNGEON_ROLE_ID: nightmareDungeonRoleId,
      WORLD_BOSS_ROLE_ID: worldBossRoleId,
      HARDCORE_ROLE_ID: hardcoreRoleId,
      TICKET_CATEGORY_ID: ticketCategoryId,
      OFFICER_ROLE_ID: officerRoleId,
      HELPER_ROLE_ID: helperRoleId,
      RECRUITMENT_PENDING_ROLE_ID: recruitmentPendingRoleId,
      VISITANT_ROLE_ID: visitantRoleId,
      GENERAL_CHAT_ID: generalChatId,
      MEMBERS_TEXT_CHANNEL_ID: membersTextChannelId,
      GROUP_TEXT_CHANNEL_ID: groupTextChannelId,
      CREATE_VOICE_CHANNEL_ID: createVoiceChannelId,
      GROUPS_CATEGORY_ID: groupsCategoryId,
      PENDING_APPROVE_ROLE_ID: pendingApproveRoleId,
    } = process.env;
    const member = interaction.member as GuildMember;
    const user = member.user;
    const guild = member.guild;

    if (interaction.isModalSubmit()) {
      if (interaction.customId === "groupModal") {
        const groupDescription = interaction.fields.getTextInputValue("groupDescription");
        const groupTextChannel = await guild.channels.fetch(groupTextChannelId);

        if (member?.voice?.channel?.parent?.id === groupsCategoryId) {
          const invite = await member?.voice?.channel?.createInvite();

          if (groupTextChannel.type === ChannelType.GuildText) {
            await groupTextChannel.send({
              content: `${groupDescription}\n${invite.url} <@&${localState[member.id].selectedRole}>`,
            });
          }

          await interaction.reply({
            ephemeral: true,
            content: `Seu grupo foi compartilhado no canal <#${groupTextChannelId}>`,
          });
        } else {
          await interaction.reply({
            ephemeral: true,
            content: `Para compartilhar um grupo você precisa primeiro criar em <#${createVoiceChannelId}>`,
          });
        }
      }
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "role") {
        const [value] = interaction.values;

        localState[member.id] = {
          selectedRole: value,
        };

        await interaction.deferUpdate();
      }
    }
    if (interaction.isButton()) {
      if (interaction.customId === "shareGroup") {
        await interaction.showModal(groupDescriptionModal);
      }

      if (interaction.customId === "approve") {
        interaction.deferUpdate();
        const [embed] = interaction.message.embeds;
        const [, , discordId] = embed.fields;
        const member = await interaction.guild.members.fetch(discordId.value);
        await member.roles.add(memberRoleId);
        await member.roles.add(recruitmentPendingRoleId);
        await member.roles.remove(pendingApproveRoleId);

        const generalChat = await interaction.guild.channels.fetch(generalChatId);

        if (generalChat.type === ChannelType.GuildText) {
          await generalChat.send({
            content: `Bem vindo, nephalem <@${member.id}>!`,
          });
        }
        await interaction.message.delete();
      }

      if (interaction.customId === "deny") {
        interaction.deferUpdate();
        interaction.message.delete();
      }

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

      if (interaction.customId === "helltideRoleId") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(helltideRoleId)) {
          member.roles.remove(helltideRoleId);
        } else {
          member.roles.add(helltideRoleId);
        }
      }

      if (interaction.customId === "hardcore") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(hardcoreRoleId)) {
          member.roles.remove(hardcoreRoleId);
        } else {
          member.roles.add(hardcoreRoleId);
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

      if (interaction.customId === "world_boss") {
        interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(worldBossRoleId)) {
          member.roles.remove(worldBossRoleId);
        } else {
          member.roles.add(worldBossRoleId);
        }
      }

      if (interaction.customId === "refuseRules") {
        interaction.reply({
          ephemeral: true,
          content: `Para receber o cargo de <@&${memberRoleId}> você deve ler e concordar com as regras`,
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
