import { Message } from "guilded.js";
import { Command } from "../types/index.js";
import { GuildedClient } from "../index.js";

const command: Command = {
  name: "ping",
  description: "Ping command",
  options: { aliases: ["p"] },
  execute(message: Message, client: GuildedClient, args: any) {
    message.reply({ content: `${client.ws.ping}ms`, isPrivate: true });
  },
};

export default command;
