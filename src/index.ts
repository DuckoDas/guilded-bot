import { Client } from "guilded.js";
import "dotenv/config";
import { Command, ConfigInterface, Event } from "./types/index.js";

import { config } from "./config.js";

import { registerCommands, registerEvents } from "./handler.js";

export class GuildedClient extends Client {
  public commands: Map<string, Command>;
  public events: Map<string, Event>;
  public config: ConfigInterface;

  constructor() {
    super({
      token: process.env.GUILDED_TOKEN as string,
    });

    this.commands = new Map();
    this.events = new Map();
    this.config = config;
  }

  public initClient() {
    registerCommands(this);
    registerEvents(this);

    this.login();
  }
}

const GuildedBot = new GuildedClient
GuildedBot.initClient();

export { GuildedBot };