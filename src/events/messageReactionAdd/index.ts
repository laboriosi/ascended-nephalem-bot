import _ from "lodash";
import { MessageReaction, User } from "~types";
import fs from "fs";

export default async (reaction: MessageReaction, user: User) => {
  // const isContestEmoji = reaction.emoji.name === "❌";
  // const isNumberOne = reaction.emoji.name === "1️⃣";
  // const isNumberTwo = reaction.emoji.name === "2️⃣";
  // const isNumberThree = reaction.emoji.name === "3️⃣";
  // const isNumberFour = reaction.emoji.name === "4️⃣";
  // const isNumberFive = reaction.emoji.name === "5️⃣";
  // const isNumberSix = reaction.emoji.name === "6️⃣";
  // const guild = reaction.message.guild;
  // const message = await reaction.message.fetch();
  // const isAMessageFromHammurabi = message.author.id === "1037736475074236467";
  // if (isAMessageFromHammurabi && user.id !== "1037736475074236467") {
  //   const memberWhoReacted = guild.members.cache.map((member) => member).find((member) => member.id === user.id);
  //   if (isNumberOne) {
  //     if (memberWhoReacted.roles.cache.has("1055170597967122502")) memberWhoReacted.roles.remove("1055170597967122502");
  //     else memberWhoReacted.roles.add("1055170597967122502");
  //   }
  //   if (isNumberTwo) {
  //     if (memberWhoReacted.roles.cache.has("1055170752900505670")) memberWhoReacted.roles.remove("1055170752900505670");
  //     else memberWhoReacted.roles.add("1055170752900505670");
  //   }
  //   if (isNumberThree) {
  //     if (memberWhoReacted.roles.cache.has("1055170920743981056")) memberWhoReacted.roles.remove("1055170920743981056");
  //     else memberWhoReacted.roles.add("1055170920743981056");
  //   }
  //   if (isNumberFour) {
  //     if (memberWhoReacted.roles.cache.has("1055171084980334684")) memberWhoReacted.roles.remove("1055171084980334684");
  //     else memberWhoReacted.roles.add("1055171084980334684");
  //   }
  //   if (isNumberFive) {
  //     if (memberWhoReacted.roles.cache.has("1055171331483770971")) memberWhoReacted.roles.remove("1055171331483770971");
  //     else memberWhoReacted.roles.add("1055171331483770971");
  //   }
  //   if (isNumberSix) {
  //     if (memberWhoReacted.roles.cache.has("1055171184733474957")) memberWhoReacted.roles.remove("1055171184733474957");
  //     else memberWhoReacted.roles.add("1055171184733474957");
  //   }
  //   if (isContestEmoji && user.id !== "1037736475074236467") {
  //     const [embed] = message.embeds;
  //     const rows = embed.description.split("\n");
  //     const isMatchResult = embed.title.includes("Resultado do Rankeamento");
  //     const typeOfGame = embed.title.includes("FFA") ? "freeForAll" : "teams";
  //     console.log("isMatchResult", isMatchResult);
  //     if (isMatchResult && !contestedMatches[reaction.message.id]) {
  //       for (const row of rows) {
  //         let [, points, playerId] = row.split(" ");
  //         playerId = playerId.replace(/[<|@|>]/g, "");
  //         points = points.replace(/[\[|+|\]|\`>]/g, "");
  //         playersDatabase[playerId].ranking[typeOfGame].mu -= Number(points);
  //         fs.writeFile("src/database/players.json", JSON.stringify(playersDatabase), (err) => {
  //           console.log(err);
  //         });
  //       }
  //       contestedMatches[reaction.message.id] = true;
  //       fs.writeFile("src/database/contested_matches.json", JSON.stringify(contestedMatches), (err) => {
  //         console.log(err);
  //       });
  //     }
  //   }
  // }
};
