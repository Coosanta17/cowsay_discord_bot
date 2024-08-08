import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

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
        .setName("cowlist")
        .setDescription("Shows the available cowsay types."),
    async execute(interaction) {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        const response = new EmbedBuilder()
            .setColor(0x969696)
            .setTitle("Available Cow Types:")
            .setDescription(choices.join(", "))
            .addFields(
                { name: "Example usage", value: `\`/cowsay 'Hello world!' ${randomChoice}\`` },
            );

        interaction.reply({ embeds: [response] })
    }
}
