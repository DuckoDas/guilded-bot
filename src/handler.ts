import { GuildedClient } from "./index.js";
import { readdirSync } from "node:fs";
import { Command, Event } from "./types/index.js";
import { ClientEvents } from "guilded.js";

export async function registerCommands(client: GuildedClient) {
  const commandFiles = readdirSync("./dist/commands", { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".js"))
    .map((dirent) => dirent.name);

  for (const file of commandFiles) {
    const commandModule = await import(`./commands/${file}`);
    const command: Command = commandModule.default;

    client.commands.set(command.name, command);

    console.log(`Command loaded: ${command.name}`);
  }
}

export async function registerEvents(client: GuildedClient) {
  const eventFiles = readdirSync("./dist/events", { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".js"))
    .map((dirent) => dirent.name);

  for (const file of eventFiles) {
    const eventModule = await import(`./events/${file}`);
    const event: Event = eventModule.default;

    client.events.set(event.name, event);

    if (event.options.once) {
      client.once(event.name as keyof ClientEvents, (...args) => {
        event.execute(...args, client);
        console.log(`Once event loaded: ${event.name}`);
      });
    } else {
      client.on(event.name as keyof ClientEvents, (...args) => {
        event.execute(...args, client);
        console.log(`Event loaded: ${event.name}`);
      });
    }
  }
}
