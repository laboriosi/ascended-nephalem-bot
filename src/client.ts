import { Client, Partials } from "discord.js";
import intents from "~config/intents";

export default new Client({
  intents,
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent,
  ],
});
