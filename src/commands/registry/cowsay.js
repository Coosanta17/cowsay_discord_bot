import { exec } from "child_process";
import { SlashCommandBuilder } from "discord.js";

const choices =  [
    "apt", "bud-frogs", "bunny", "calvin", "cheese", "cock", "cow", "cower", "daemon",
    "default", "dragon", "dragon-and-cow", "duck", "elephant", "elephant-in-snake",
    "eyes", "flaming-sheep", "fox", "ghostbusters", "gnu", "hellokitty", "kangaroo",
    "kiss", "koala", "kosh", "luke-koala", "mech-and-cow", "milk", "moofasa", "moose",
    "pony", "pony-smaller", "ren", "sheep", "skeleton", "snowman", "stegosaurus",
    "stimpy", "suse", "three-eyes", "turkey", "turtle", "tux", "unipony", 
    "unipony-smaller", "vader", "vader-koala", "www"
];

export default {
    data: new SlashCommandBuilder()
        .setName("cowsay")
        .setDescription("Shows the available commands.")
        .addStringOption(option =>
            option.setName('content')
                .setDescription('What the cow will say.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('cow_type')
                .setDescription('The type of cow to use. (use `/cowlist` to see all options)')
                .setRequired(false)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 25);
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 25);
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        const content = interaction.options.getString('content');
        const cowType = interaction.options.getString('cow_type') || "default";

        // Command to execute cowsay
        const command = (cowType === "default" || cowType === "cow") ? `cowsay -f ${cowType} "${content}"` : `cowsay "${content}"`;

        exec(command, (error, stdout, stderr) => {

            console.debug(`executing cowsay command: ${command}`);

            if (error) {
                console.error(`Error: ${error.message}`);
                interaction.reply({ content: 'There was an error executing the cowsay command from the bot.', ephemeral: true });
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                interaction.reply({ content: 'There was an error with the cowsay command on the server.', ephemeral: true });
                return;
            }

            // Send the cowsay output to Discord
            interaction.reply(`\`\`\`\n${stdout}\n\`\`\``);
        });
    },
};
