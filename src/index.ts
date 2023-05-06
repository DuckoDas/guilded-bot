import { Client, Embed, Message, MessageType } from "guilded.ts";
import "dotenv/config";
import { config } from "./config.js";

const client = new Client({ token: process.env.GUILDED_TOKEN });

client.once("ready", () => console.log(`Logged in as ${client.user?.name}!`));
client.on("disconnect", () => console.log("Disconnected from Guilded"));

client.on("messageCreate", async (message: Message) => {
  if (!message.content?.startsWith(config.prefix)) return;
  const [commandName, ...args] = message.content
    .slice(config.prefix.length)
    .split(/\s+/);

  switch (commandName) {
    case "referral":
      message.reply({
        content: [
          `Please invite your friends with our referral link!`,
          `[Referral Link](https://www.guilded.gg?r=o4PyG3Zd)`,
        ].join("\n"),
      });
      break;
    case "ping":
      message.reply({ content: "Pong!" });
      break;
    case "echo":
      message.reply({ content: args.join(" ") });
      break;
  }
});

/**
 * Auto React on message
 */
client.on("messageCreate", async (message: Message) => {
  if (message.author?.user.isBot) return;

  if (
    message.content?.includes("hi") ||
    message.content?.includes("hey") ||
    message.content?.includes("hello") ||
    message.content?.includes("hei") ||
    message.content?.includes("heyo")
  ) {
    return message.react(90002554);
  } else if (
    message.content?.includes("sus") ||
    message.content?.includes("oreo") ||
    message.content?.includes("bozo") ||
    message.content?.includes("ratio") ||
    message.content?.includes("daddy") ||
    message.content?.includes("mommy")
  ) {
    return message.react(90002579);
  }
});

client.login();
