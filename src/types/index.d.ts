import { ClientEvents } from "guilded.js";

export interface ConfigInterface {
  prefix: string;
}

export interface Command {
  name: string;
  description: string;
  options: {
    aliases: string[]
    userPermissions?: string[] // Not Working Yet
    botPermissions?: string[] // Not Working Yet
  }
  execute: (...args: any[]) => any;
}

export interface Event {
  name: keyof ClientEvents;
  description: string;
  options: { rest: boolean; once: boolean };
  execute: (...args: any[]) => any;
}
