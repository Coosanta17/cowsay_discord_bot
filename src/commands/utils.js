import { exec } from "child_process";

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

export async function runCommandWithOutput(command) {
    exec(command, (error, stdout, stderr) => {

        console.debug(`executing console command: ${command}`);

        if (error) {
            console.error(`Error: ${error.message}`);
            return 'error';
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return 'stderr';
        }

        // return output
        return stdout;
    });
}