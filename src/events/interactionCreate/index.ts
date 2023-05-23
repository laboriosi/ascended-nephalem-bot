import { GuildMember, PermissionsBitField } from "discord.js";
import { ChannelType, Interaction } from "~types";

export default async (interaction: Interaction) => {
  const {
    FORM_CATEGORY_ID,
    MEMBER_ROLE_ID,
    LEVELING_ROLE_ID,
    PVP_ROLE_ID,
    BOUNTY_ROLE_ID,
    DUNGEON_ROLE_ID,
    NIGHTMARE_DUNGEON_ROLE_ID,
  } = process.env;
  const member = interaction.member as GuildMember;
  const user = member.user;
  const guild = member.guild;

  if (interaction.isButton()) {
    if (interaction.customId === "leveling") {
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (member.roles.cache.has(LEVELING_ROLE_ID)) {
        member.roles.remove(LEVELING_ROLE_ID);
      } else {
        member.roles.add(LEVELING_ROLE_ID);
      }
    }
    if (interaction.customId === "pvp") {
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (member.roles.cache.has(PVP_ROLE_ID)) {
        member.roles.remove(PVP_ROLE_ID);
      } else {
        member.roles.add(PVP_ROLE_ID);
      }
    }
    if (interaction.customId === "bounty") {
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (member.roles.cache.has(BOUNTY_ROLE_ID)) {
        member.roles.remove(BOUNTY_ROLE_ID);
      } else {
        member.roles.add(BOUNTY_ROLE_ID);
      }
    }
    if (interaction.customId === "dungeon") {
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (member.roles.cache.has(DUNGEON_ROLE_ID)) {
        member.roles.remove(DUNGEON_ROLE_ID);
      } else {
        member.roles.add(DUNGEON_ROLE_ID);
      }
    }
    if (interaction.customId === "nightmare_dungeon") {
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (member.roles.cache.has(NIGHTMARE_DUNGEON_ROLE_ID)) {
        member.roles.remove(NIGHTMARE_DUNGEON_ROLE_ID);
      } else {
        member.roles.add(NIGHTMARE_DUNGEON_ROLE_ID);
      }
    }
    if (interaction.customId == "refuseRules") {
      interaction.reply({
        ephemeral: true,
        content: `Parece receber o cargo de <@&${MEMBER_ROLE_ID}> você deve ler e concordar com as regras`,
      });
    }

    if (interaction.customId == "readAndAgreeRules") {
      const channelName = `📝┃form-do-${user.username.toLowerCase()}`;
      const formChannel = guild.channels.cache.find((channel) => channel.name === channelName);

      if (formChannel) {
        interaction.reply({
          ephemeral: true,
          content: `Já existe um canal criado para seguir o próximo passo <#${formChannel.id}>`,
        });
      } else {
        const createdChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: FORM_CATEGORY_ID,
          permissionOverwrites: [
            { id: member.id, allow: [PermissionsBitField.Default] },
            { id: guild.roles.everyone, deny: [PermissionsBitField.All] },
          ],
        });

        interaction.reply({
          ephemeral: true,
          content: `O formulário foi iniciado no canal <#${createdChannel.id}>`,
        });
      }
    }
  }
  // const { FORM_CATEGORY_ID, MEMBER_ROLE_ID, WAITING_FORM_ROLE_ID, MEMBERS_TEXT_CHANNEL_ID, VISITANT_ROLE_ID } =
  //   process.env;
  // if (interaction.isButton() && interaction.customId === "recruitmentFormButton") {
  //   const member = interaction.member as GuildMember;
  //   const user = member.user;
  //   const guild = member.guild;
  //   const createdChannel = await guild.channels.create({
  //     name: `📝┃form-do-${user.username}`,
  //     type: ChannelType.GuildText,
  //     parent: FORM_CATEGORY_ID,
  //     permissionOverwrites: [
  //       { id: member.id, allow: [PermissionsBitField.Default] },
  //       { id: guild.roles.everyone, deny: [PermissionsBitField.All] },
  //     ],
  //   });
  //   interaction.reply({
  //     ephemeral: true,
  //     content: `O formulário foi iniciado no canal <#${createdChannel.id}>`,
  //   });
  // }
  // if (interaction.isButton() && interaction.customId === "formApprove") {
  //   interaction.deferUpdate();
  //   const embeds = interaction.message.embeds;
  //   const [embed] = embeds;
  //   const discordTag = embed.fields[1];
  //   const guild = (interaction.member as GuildMember).guild;
  //   const members = await guild.members.fetch();
  //   const member = members.find((member) => member.user.tag === discordTag.value);
  //   member.roles.remove(WAITING_FORM_ROLE_ID);
  //   member.roles.add(MEMBER_ROLE_ID);
  //   const membersChannel = (await guild.channels.fetch(MEMBERS_TEXT_CHANNEL_ID)) as TextChannel;
  //   await membersChannel.send({ embeds });
  //   await interaction.message.delete();
  // }
  // if (interaction.isButton() && interaction.customId === "formRefuse") {
  //   interaction.deferUpdate();
  //   const [embed] = interaction.message.embeds;
  //   const discordTag = embed.fields[1];
  //   const guild = (interaction.member as GuildMember).guild;
  //   const members = await guild.members.fetch();
  //   const member = members.find((member) => member.user.tag === discordTag.value);
  //   member.roles.remove(WAITING_FORM_ROLE_ID);
  //   member.roles.add(VISITANT_ROLE_ID);
  //   await interaction.message.delete();
  // }
  // if (interaction.isButton() && interaction.customId === "formBlock") {
  //   interaction.deferUpdate();
  //   const [embed] = interaction.message.embeds;
  //   const discordTag = embed.fields[1];
  //   const guild = (interaction.member as GuildMember).guild;
  //   const members = await guild.members.fetch();
  //   const member = members.find((member) => member.user.tag === discordTag.value);
  //   await interaction.message.delete();
  //   member.roles.remove(WAITING_FORM_ROLE_ID);
  // }
  // if (interaction.isButton() && interaction.customId === "choose") {
  //   interaction.deferUpdate();
  //   const [embed] = interaction.message.embeds;
  //   const teamOneColor = "#535353";
  //   const teamTwoColor = "#74a3f3";
  //   const pickIndex = picksDatabase.data.findIndex((pick) => pick.leaders.includes(interaction.user.id));
  //   const pick = picksDatabase.data[pickIndex];
  //   const hours = moment.duration(moment().diff(moment(pick.createdAt))).asHours();
  //   if (pick && hours < 1) {
  //     const teamPosition = pick.leaders.findIndex((leaderDiscordId) => leaderDiscordId === interaction.user.id) + 1;
  //     const clickedPlayerIndex = pick.players.findIndex((player) => player.name === embed.author.name);
  //     picksDatabase.data[pickIndex].players[clickedPlayerIndex] = {
  //       ...picksDatabase.data[pickIndex].players[clickedPlayerIndex],
  //       team: String(teamPosition),
  //     };
  //     interaction.message.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //           .setColor(teamPosition === 1 ? teamOneColor : teamTwoColor)
  //           .setAuthor({ name: embed.author.name, iconURL: embed.author.iconURL }),
  //       ],
  //       components: [],
  //     });
  //     fs.writeFile("src/database/picks.json", JSON.stringify(picksDatabase), (err) => {
  //       console.log(err);
  //     });
  //   }
  // }
};
