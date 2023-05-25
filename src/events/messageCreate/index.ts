import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { ChannelType, Message } from "~types";
import { rate, Rating } from "ts-trueskill";
import fs from "fs";
import { Player } from "~interfaces/player";
import moment from "moment";
import _, { pick } from "lodash";
import client from "~client";
import { formInvalidBattleTag, formSuccess, formBattleTagCharacterLimit } from "~embeds";
// function addPlayerToDatabase(playerDiscordId: string, updatedData) {
//   const user = client.users.cache.get(playerDiscordId);
//   playersDatabase[playerDiscordId] = {
//     discordId: user.id,
//     steamId: "",
//     leaderPlayedTimes: {},
//     totalOfPlayedGames: 1,
//     timesReplacing: 0,
//     timesReplaced: 0,
//     ranking: {
//       freeForAll: {
//         totalOfMatchInFirstPlace: 0,
//         wins: 0,
//         loses: 0,
//         mu: INITIAL_MU,
//         sigma: INITIAL_SIGMA,
//       },
//       teams: {
//         wins: 0,
//         loses: 0,
//         mu: INITIAL_MU,
//         sigma: INITIAL_SIGMA,
//       },
//     },
//     createdAt: moment().format(),
//   };
//   const newData = _.merge(playersDatabase[playerDiscordId], updatedData);
//   playersDatabase[playerDiscordId] = newData;
//   fs.writeFile("src/database/players.json", JSON.stringify(playersDatabase), (err) => {
//     console.log(err);
//   });
// }
// function updatePlayer(playerDiscordId: string, updatedData) {
//   const newData = _.merge(playersDatabase[playerDiscordId], updatedData);
//   playersDatabase[playerDiscordId] = newData;
//   fs.writeFile("src/database/players.json", JSON.stringify(playersDatabase), (err) => {
//     console.log(err);
//   });
// }
// function getDataFromRow(row: string) {
//   return row.replace(/\s/g, "").replace("><", "> <").split(" ");
// }
export default async (message: Message) => {
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
  //   const isChannelAllowed = CHANNELS_ALLOWED.some((channelId) => channelId === message.channelId);
  //   if (message.content === "!flip") {
  //     const oneOrTwo = Math.floor(Math.random() * 2) + 1;
  //     message.reply({
  //       content: oneOrTwo === 1 ? "<:cara:1043703511562604660>" : "<:coroa:1043703509931003914>",
  //     });
  //   }
  //   if (message.content.includes("!iniciar") && message.member.voice.channel) {
  //     const currentVoiceChannel = await message.member.voice.channel.fetch();
  //     const captains = message.content.match(/<@\d+>/gm);
  //     if (captains && message.member.voice.channel.parent.name.includes("TIMES")) {
  //       const [captainOne, captainTwo] = captains;
  //       await message.channel.send({
  //         embeds: [new EmbedBuilder().setColor("#2f3136").setTitle("Escolha de Time")],
  //       });
  //       const players = [];
  //       const members = currentVoiceChannel.members.map((member) => member);
  //       for await (const member of members) {
  //         const userMessage = await message.channel.send({
  //           embeds: [
  //             new EmbedBuilder()
  //               .setColor("#2f3136")
  //               .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() }),
  //           ],
  //           components: [
  //             new ActionRowBuilder<ButtonBuilder>().addComponents(
  //               new ButtonBuilder().setCustomId("choose").setLabel("Escolher").setStyle(ButtonStyle.Primary)
  //             ),
  //           ],
  //         });
  //         players.push({
  //           name: member.displayName,
  //           messageId: userMessage.id,
  //           id: member.id.replace(/[^0-9]+/g, ""),
  //           team: "not-selected",
  //         });
  //       }
  //       picksDatabase.data = [
  //         {
  //           leaders: [captainOne.replace(/[^0-9]+/g, ""), captainTwo.replace(/[^0-9]+/g, "")],
  //           players,
  //           createdAt: moment().format(),
  //         },
  //         ...picksDatabase.data,
  //       ];
  //       fs.writeFile("src/database/picks.json", JSON.stringify(picksDatabase), (error) => {
  //         if (error) console.error(error);
  //       });
  //       await message.channel.send({
  //         components: [
  //           new ActionRowBuilder<ButtonBuilder>().addComponents(
  //             new ButtonBuilder().setCustomId("confirm").setLabel("Confirmar").setStyle(ButtonStyle.Success),
  //             new ButtonBuilder().setCustomId("cancel").setLabel("Cancelar").setStyle(ButtonStyle.Danger)
  //           ),
  //         ],
  //       });
  //     }
  //   }
  //   if (isChannelAllowed) {
  //     const registerGameCommandKeys = ["tipo", "host"];
  //     const isAMatchRecord = registerGameCommandKeys.every((commandKey) =>
  //       message.content.toLowerCase().includes(commandKey)
  //     );
  //     if (isAMatchRecord) {
  //       const rows = message.content.split("\n").filter((row) => row);
  //       let [gameTypeRow, hostRow, ...playersRows] = rows;
  //       const typeOfGame = gameTypeRow.toLowerCase().includes("times") ? "teams" : "freeForAll";
  //       if (typeOfGame === "teams") {
  //         playersRows = playersRows.join("").split(/(?=\<@)/g);
  //       }
  //       let playersSkill = playersRows.map((row) => {
  //         const [discordTag] = getDataFromRow(row);
  //         const discordId = getOnlyNumbers(discordTag);
  //         const player = playersDatabase[discordId];
  //         const mu = player ? player.ranking[typeOfGame].mu : INITIAL_MU;
  //         const sigma = player ? player.ranking[typeOfGame].sigma : INITIAL_SIGMA;
  //         return typeOfGame === "freeForAll" ? [new Rating(mu, sigma)] : new Rating(mu, sigma);
  //       });
  //       const teamOne = playersSkill.slice(0, playersSkill.length / 2);
  //       const teamTwo = playersSkill.slice(playersSkill.length / 2);
  //       console.log("test", typeOfGame === "freeForAll" ? playersSkill : [teamOne, teamTwo]);
  //       const formattedPlayersSkill = rate(typeOfGame === "freeForAll" ? playersSkill : [teamOne, teamTwo]).map(
  //         (playerSkill) => {
  //           if (typeOfGame === "freeForAll")
  //             return playerSkill
  //               .toString()
  //               .replace(/[^0-9\.\,]/gm, "")
  //               .split(",")
  //               .map((value) => Number(value));
  //           else {
  //             return playerSkill.map((skill) =>
  //               skill
  //                 .toString()
  //                 .replace(/[^0-9\.\,]/gm, "")
  //                 .split(",")
  //                 .map((value) => Number(value))
  //             );
  //           }
  //         }
  //       );
  //       const playersReportMessage = playersRows.map((row, index) => {
  //         const [discordTag, leaderEmoji] = getDataFromRow(row);
  //         const discordId = getOnlyNumbers(discordTag);
  //         const matchPosition = index + 1;
  //         const leaderName = leaderNamesByEmoji[leaderEmoji];
  //         const teamSize = playersRows.length / 2;
  //         const hasTeamWinned = matchPosition <= teamSize;
  //         const [newMuValue, newSigmaValue] =
  //           typeOfGame === "freeForAll"
  //             ? (formattedPlayersSkill[index] as number[])
  //             : (formattedPlayersSkill[hasTeamWinned ? 0 : 1][hasTeamWinned ? index : index - 4] as number[]);
  //         const playerNewRank = getRank(newMuValue, newSigmaValue);
  //         let oldMuValue = INITIAL_MU;
  //         let oldSigmaValue = INITIAL_SIGMA;
  //         if (playersDatabase[discordId]) {
  //           oldMuValue = playersDatabase[discordId].ranking[typeOfGame].mu;
  //           oldSigmaValue = playersDatabase[discordId].ranking[typeOfGame].sigma;
  //         }
  //         const playerOldRank = getRank(oldMuValue, oldSigmaValue);
  //         const rankPointsEarned = playerNewRank - playerOldRank;
  //         if (!playersDatabase[discordId]) {
  //           const wins = typeOfGame === "freeForAll" ? playersRows.length - matchPosition : teamSize;
  //           const loses = typeOfGame === "freeForAll" ? playersRows.length - wins - 1 : hasTeamWinned ? 0 : teamSize;
  //           const data: Player = {
  //             leaderPlayedTimes: {
  //               [leaderName]: 1,
  //             },
  //             ranking: {
  //               [typeOfGame]: {
  //                 wins,
  //                 loses,
  //                 mu: newMuValue,
  //                 sigma: newSigmaValue,
  //               },
  //             },
  //           };
  //           if (matchPosition === 1 && typeOfGame === "freeForAll") {
  //             data.ranking.freeForAll.totalOfMatchInFirstPlace = 1;
  //           }
  //           addPlayerToDatabase(discordId, data);
  //         } else {
  //           const wins = typeOfGame === "freeForAll" ? playersRows.length - matchPosition : teamSize;
  //           const loses = typeOfGame === "freeForAll" ? playersRows.length - wins - 1 : hasTeamWinned ? 0 : teamSize;
  //           const data: Player = {
  //             leaderPlayedTimes: {
  //               [leaderName]: playersDatabase[discordId].leaderPlayedTimes[leaderName] + 1,
  //             },
  //             ranking: {
  //               [typeOfGame]: {
  //                 wins: playersDatabase[discordId].ranking[typeOfGame].wins + wins,
  //                 loses: playersDatabase[discordId].ranking[typeOfGame].loses + loses,
  //                 mu: newMuValue,
  //                 sigma: newSigmaValue,
  //               },
  //             },
  //           };
  //           if (matchPosition === 1 && typeOfGame === "freeForAll") {
  //             data.ranking.freeForAll.totalOfMatchInFirstPlace =
  //               playersDatabase[discordId].ranking[typeOfGame].totalOfMatchInFirstPlace + 1;
  //           }
  //           updatePlayer(discordId, data);
  //         }
  //         return `\`${matchPosition}: [${
  //           rankPointsEarned > 0 ? "+" : ""
  //         }${rankPointsEarned}]\` ${discordTag} ${leaderName} ${leaderEmoji}`;
  //       });
  //       const pointsEmbed = new EmbedBuilder()
  //         .setColor("#00FF00")
  //         .setTitle(`Resultado do Rankeamento ${typeOfGame === "freeForAll" ? "FFA" : "Times"}`)
  //         .setDescription(playersReportMessage.join("\n"));
  //       const reportMessage = await message.reply({ embeds: [pointsEmbed] });
  //       reportMessage.react("❌");
  //     }
  //   }
};
