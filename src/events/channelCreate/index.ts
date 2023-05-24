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

  // if (channel.type === ChannelType.GuildText) {
  //   if (channel.parentId === FORM_CATEGORY_ID) {
  //     await channel.send({ embeds: [formQuestionFullName] });
  //     const { content: name } = (await channel.awaitMessages({ max: 1, time: 600000 })).last();
  //     user.name = name;
  //     await channel.send({ embeds: [formQuestionCellphone] });
  //     const { content: cellphone } = (await channel.awaitMessages({ max: 1, time: 600000 })).last();
  //     user.cellphone = cellphone;
  //     await channel.send({ embeds: [formQuestionBattleTag] });
  //     const { content: battleTag } = (await channel.awaitMessages({ max: 1, time: 600000 })).last();
  //     user.battleTag = battleTag;
  //     const message = await channel.send({ embeds: [formQuestionTimeOfDay], components: [recruitmentFormTimeOfDay] });
  //     const collector = message.createMessageComponentCollector({
  //       componentType: ComponentType.SelectMenu,
  //       time: 30000,
  //       max: 1,
  //     });
  //     collector.on("collect", async (interaction) => {
  //       user.timeOfDay = interaction.values;
  //       const member = interaction.member as GuildMember;
  //       const guild = member.guild;
  //       interaction.reply({
  //         ephemeral: true,
  //         embeds: [formSuccess],
  //       });
  //       const updatedUsers = {
  //         ...users,
  //         [interaction.user.id]: {
  //           ...user,
  //           discordId: interaction.user.id,
  //           discordTag: interaction.user.tag,
  //           avatar: interaction.user.avatarURL() || "https://i.ibb.co/Cz3j2Fb/7ef9a610-b65a-48b7-ba4a-f4da081b90ad.jpg",
  //         },
  //       };
  //       fs.writeFile("src/database/users.json", JSON.stringify(updatedUsers), (err) => {
  //         console.log(err);
  //       });
  //       member.roles.add(WAITING_FORM_ROLE_ID);
  //       member.roles.remove(VISITANT_ROLE_ID);
  //       setTimeout(() => channel.delete(), 8000);
  //       const membersTextChannel = (await guild.channels.fetch(FORMS_TEXT_CHANNEL_ID)) as TextChannel;
  //       const timeOfDayPortuguese = {
  //         morning: "Manhã",
  //         afternoon: "Tarde",
  //         night: "Noite",
  //       };
  //       const timeOfDay = user.timeOfDay.map((time) => timeOfDayPortuguese[time]);
  //       membersTextChannel.send({
  //         embeds: [
  //           new EmbedBuilder()
  //             .setColor("#da373c")
  //             .setThumbnail(
  //               interaction.user.avatarURL() || "https://i.ibb.co/Cz3j2Fb/7ef9a610-b65a-48b7-ba4a-f4da081b90ad.jpg"
  //             )
  //             .addFields(
  //               { name: "Nome", value: user.name },
  //               { name: "Discord", value: interaction.user.tag },
  //               { name: "BattleTag", value: user.battleTag },
  //               { name: "Celular", value: user.cellphone },
  //               { name: "Horário", value: timeOfDay.join(", ") }
  //             ),
  //         ],
  //         components: [formOptions],
  //       });
  //     });
  //   }
  // }
};
