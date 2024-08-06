import { discordClient as client } from "./client.js";
import 'dotenv/config';

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
