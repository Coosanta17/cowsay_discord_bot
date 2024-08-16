import { SlashCommandBuilder } from "discord.js";

import { autocompleteCowType } from "../command_utils.js";
import { runConsoleCommandReturnForInteraction } from "../command_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('cowsay')
        .setDescription("Shows the available commands.")

        .addStringOption(option =>
            option
                .setName('content')
                .setDescription("What the cow will say.")
                .setRequired(true)
                .setMaxLength(1000))

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

        const content = interaction.options.getString('content');
        const cowType = interaction.options.getString('cow_type') || "default";

        // Command to execute cowsay
        const command = (cowType === "default" || cowType === "cow") ? `cowsay "${content}"` : `cowsay -f ${cowType} "${content}"`;
        
        const replyMessage = await runConsoleCommandReturnForInteraction(command);
        await interaction.reply(replyMessage);
    },
};
