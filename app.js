require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
    const { type, id, data } = req.body;

    /**
     * Request de verificacion
     */
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        // "test" guild command
        if (name === 'test') {
            // Send a message into the channel where command was triggered from
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                // Fetches a random emoji to send from a helper function
                content: 'hello world ' + getRandomEmoji(),
                },
            });
        }
    }

    
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);

    // Check if guild commands from commands.json are installed (if not, install them)
    HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
        TEST_COMMAND,
        CHALLENGE_COMMAND,
    ]);
})