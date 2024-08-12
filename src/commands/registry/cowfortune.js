import { SlashCommandBuilder } from "discord.js";

import { autocompleteCowType } from "../command_utils.js";
import { runConsoleCommandReturnForInteraction } from "../command_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('cowfortune')
        .setDescription("Make the cow say a fortune.")
        .addStringOption(option =>
            option
                .setName('cow_type')
                .setDescription("The type of cow to use. (use `/cowlist` to see all options)")
                .setRequired(false)
                .setAutocomplete(true)),
    async autocomplete(interaction) {
        await interaction.respond(
            autocompleteCowType(interaction),
        );
    },
    async execute(interaction) {
        const cowType = interaction.options.getString('cow_type') || "default";

        const command = (cowType === "default" || cowType === "cow") ? `fortune | cowsay` : `fortune | cowsay -f ${cowType}`

        const replyMessage = await runConsoleCommandReturnForInteraction(command);
        await interaction.reply(replyMessage);
    }
}
