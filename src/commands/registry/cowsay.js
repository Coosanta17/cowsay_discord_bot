import { SlashCommandBuilder } from "discord.js";

import { autocompleteCowType, runCommandWithOutput } from "../utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('cowsay')
        .setDescription("Shows the available commands.")

        .addStringOption(option =>
            option
                .setName('content')
                .setDescription("What the cow will say.")
                .setRequired(true))

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
        
        const cowsayResult = await runCommandWithOutput(command);

        if (cowsayResult === 'error') {

            interaction.reply({ content: 'There was an error executing the cowsay command from the bot.', ephemeral: true });

        } else if (cowsayResult === 'stderr') {

            interaction.reply({ content: 'There was an error with the cowsay command on the server.', ephemeral: true });

        } else { // Send the cowsay output to Discord

            interaction.reply(`\`\`\`\n${cowsayResult}\n\`\`\``);
        }
    },
};
