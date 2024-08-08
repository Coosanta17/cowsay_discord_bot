import 'dotenv/config';
import { ActivityType, Events } from "discord.js";

import { discordClient as client } from "./client.js";
import { getCommands } from './commands/handler.js';

await import("./commands/deploy.js"); // Deploys commands to Discord API.
client.commands = await getCommands();

client.on("ready", () => {
    client.user.setActivity("Cow Simulator", { type: ActivityType.Playing })
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on(Events.InteractionCreate, async (interaction) => {
	const command = interaction.client.commands.get(interaction.commandName);

	if (interaction.isAutocomplete()) {
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
		return;
	}

    if (interaction.isChatInputCommand()) {   
        if (!command) {
		    console.error(`No command matching ${interaction.commandName} was found.`);
		    return;
	    }

		try {
			await command.execute(interaction);
		} catch (error) {

			console.error(error);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
			} else {
				await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
			}
		}

    	return;
    }
});

client.login(process.env.TOKEN);
