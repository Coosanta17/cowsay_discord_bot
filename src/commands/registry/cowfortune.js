import { SlashCommandBuilder } from "discord.js";

import { autocompleteCowType, runCommandWithOutput } from "../utils.js";

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

        const cowfortuneResult = await runCommandWithOutput(command);

        if (cowfortuneResult === 'error') {

            interaction.reply({ content: 'There was an error executing the cowfortune command from the bot.', ephemeral: true });

        } else if (cowfortuneResult === 'stderr') {

            interaction.reply({ content: 'There was an error with the cowfortune command on the server.', ephemeral: true });

        } else { // Send the cowsay output to Discord

            interaction.reply(`\`\`\`\n${cowfortuneResult}\n\`\`\``);
        }
    }
}