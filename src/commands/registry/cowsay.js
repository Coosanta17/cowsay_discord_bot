import { SlashCommandBuilder } from "discord.js";

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
                .setDescription('The type of cow to use.')
                .setRequired(false)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices =  [
            "apt", "bud-frogs", "bunny", "calvin", "cheese", "cock", "cower", "daemon",
            "default", "dragon", "dragon-and-cow", "duck", "elephant", "elephant-in-snake",
            "eyes", "flaming-sheep", "fox", "ghostbusters", "gnu", "hellokitty", "kangaroo",
            "kiss", "koala", "kosh", "luke-koala", "mech-and-cow", "milk", "moofasa", "moose",
            "pony", "pony-smaller", "ren", "sheep", "skeleton", "snowman", "stegosaurus",
            "stimpy", "suse", "three-eyes", "turkey", "turtle", "tux", "unipony", 
            "unipony-smaller", "vader", "vader-koala", "www"
        ];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        // command code
    },
};
