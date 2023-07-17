import client from "~client";
import { CronJob } from "cron";
import axiosRetry from "axios-retry";
import { ready, voiceStateUpdate, interactionCreate, messageCreate, channelCreate, guildMemberAdd } from "~events";
import "dotenv/config";
import { ChannelType } from "discord.js";
import axios from "axios";
import moment from "moment-timezone";
import worldBossNames from "~constants/worldBossNames";

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 1000,
});

async function helltideAnnounce() {
  const { GENERAL_CHAT_ID: generalChatId, HELLTIDE_ROLE_ID: helltideRoleId } = process.env;

  const response = await axios.get("https://d4armory.io/api/events/recent");

  if (response?.data?.helltide?.timestamp) {
    const date = moment
      .unix(response?.data?.helltide?.timestamp)
      .tz("America/Sao_Paulo")
      .add("2", "hours")
      .add("10", "minutes")
      .toDate();
    const helltideScheduledMessage = new CronJob(
      date,
      async () => {
        const generalChatTextChannel = await client.channels.fetch(generalChatId);

        if (generalChatTextChannel.type === ChannelType.GuildText) {
          generalChatTextChannel.send(`A helltide irá começar daqui 5 minutos. <@&${helltideRoleId}>`);
        }

        setTimeout(helltideAnnounce, 360000);
      },
      null,
      true,
      "America/Sao_Paulo"
    );

    helltideScheduledMessage.start();
  }
}

async function worldBossAnnounce() {
  const { GENERAL_CHAT_ID: generalChatId, WORLD_BOSS_ROLE_ID: worldBossRoleId } = process.env;

  const response = await axios.get("https://d4armory.io/api/events/recent");

  if (response?.data?.boss?.expected) {
    const { territory, zone, name } = response?.data?.boss;
    const date = moment.unix(response?.data?.boss?.expected).tz("America/Sao_Paulo").subtract("5", "minutes").toDate();
    const worldBossScheduledMessage = new CronJob(
      date,
      async () => {
        const generalChatTextChannel = await client.channels.fetch(generalChatId);

        if (generalChatTextChannel.type === ChannelType.GuildText) {
          generalChatTextChannel.send(
            `${worldBossNames[name]} irá spawnar em ${territory}, ${zone} daqui 5 minutos. <@&${worldBossRoleId}>`
          );
        }

        setTimeout(worldBossAnnounce, 360000);
      },
      null,
      true,
      "America/Sao_Paulo"
    );

    worldBossScheduledMessage.start();
  }
}

client.on("ready", ready);
client.on("voiceStateUpdate", voiceStateUpdate);
client.on("interactionCreate", interactionCreate);
client.on("messageCreate", messageCreate);
client.on("channelCreate", channelCreate);
client.on("guildMemberAdd", guildMemberAdd);

client.once("ready", async () => {
  try {
    await helltideAnnounce();
    await worldBossAnnounce();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.CLIENT_TOKEN);
