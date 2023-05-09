import { Embed, Message, UserType } from "guilded.js";
import { Command } from "../types/index.js";
import { GuildedClient } from "../index.js";

const command: Command = {
  name: "userinfo",
  description: "Get information about a user",
  options: { aliases: ["ui"] },
  execute: async (message: Message, client: GuildedClient, args: any) => {
    const mentionedUser = message.mentions?.users?.[0]?.id as string;
    if (!mentionedUser) {
      return message.reply({
        content: "Please mention a user.",
        isPrivate: true,
      });
    }

    const targetUser = await client.members.fetch(
      message.serverId!,
      mentionedUser,
      true
    );

    let badges: string = "";
    if (targetUser.user?.id == "o4PyG3Zd") {
      badges += "🦆";
    }

    let hasBanner: boolean;
    if (targetUser.user?.banner!) {
      hasBanner = true;
    } else {
      hasBanner = false;
    }

    const embed = new Embed()
      .setColor("#efc10d")
      .setAuthor(`${targetUser.username}'s Info`)
      .setThumbnail(targetUser.user?.avatar!)
      .setDescription(
        [
          `**User**`,
          `**Username:** ${targetUser.username}`,
          `**Display Name:** ${targetUser.displayName}`,
          `**Nickname:** ${targetUser.nickname || "none"}`,
          `**Badges:** ${badges}`,
          `**IsOwner:** ${targetUser.isOwner ? true : false}`,
          `**IsBot:** ${targetUser.user?.type === UserType.Bot}`
        ].join("\n")
      );

    if (hasBanner) {
      embed.setImage(targetUser.user?.banner!);
    }

    message.reply({
      embeds: [embed],
    });
  },
};

export default command;
