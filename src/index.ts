import client from "~client";
import {
  ready,
  voiceStateUpdate,
  interactionCreate,
  messageCreate,
  messageReactionAdd,
  channelCreate,
  guildMemberAdd,
} from "~events";
import "dotenv/config";

client.on("ready", ready);
client.on("voiceStateUpdate", voiceStateUpdate);
client.on("interactionCreate", interactionCreate);
client.on("messageCreate", messageCreate);
client.on("messageReactionAdd", messageReactionAdd);
client.on("channelCreate", channelCreate);
client.on("guildMemberAdd", guildMemberAdd);

client.login(process.env.CLIENT_TOKEN);
