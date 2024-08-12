import { runCommandWithOutput } from "../util.js";

const choices =  [
    "apt", "bud-frogs", "bunny", "calvin", "cheese", "cock", "cow", "cower", "daemon",
    "default", "dragon", "dragon-and-cow", "duck", "elephant", "elephant-in-snake",
    "eyes", "flaming-sheep", "fox", "ghostbusters", "gnu", "hellokitty", "kangaroo",
    "kiss", "koala", "kosh", "luke-koala", "mech-and-cow", "milk", "moofasa", "moose",
    "pony", "pony-smaller", "ren", "sheep", "skeleton", "snowman", "stegosaurus",
    "stimpy", "suse", "three-eyes", "turkey", "turtle", "tux", "unipony", 
    "unipony-smaller", "vader", "vader-koala", "www"
];

export function autocompleteCowType(interaction) {
    const focusedValue = interaction.options.getFocused();
    const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 25);
    return filtered.map(choice => ({ name: choice, value: choice }));
}

export async function runConsoleCommandReturnForInteraction(command){

    const result = await runCommandWithOutput(command);
    
    if (result.status === 'error') {
        return { content: 'There was an error executing the command.', ephemeral: true };
    } else if (result.status === 'stderr') {
        return { content: 'There was an error with the command on the server.', ephemeral: true };
    } else {
        return { content: `\`\`\`\n${result.content}\`\`\``, ephemeral: false };
    }
}

