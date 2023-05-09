import { Message, UserType } from "guilded.js";
import { Event } from "../types/index.js";
import { GuildedClient } from "../index.js";

const event: Event = {
  name: "messageCreated",
  description: "something",
  options: {
    rest: false,
    once: false,
  },
  execute: async (message: Message, client: GuildedClient) => {
    const prefix = client.config.prefix || "owo";
    if (
      !message.content.startsWith(prefix) ||
      message.author?.type === UserType.Bot
    )
      return;

    // Split the message content into command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    // Check if the command exists
    // Check if the command exists by name or aliases
    const command =
      client.commands.get(commandName) ||
      Array.from(client.commands.values()).find(
        (cmd) =>
          cmd.options.aliases && cmd.options.aliases.includes(commandName)
      );
    if (!command) return;

    try {
      // Execute the command
      command.execute(message, client, args);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while executing the command.");
    }
  },
};

export default event;
