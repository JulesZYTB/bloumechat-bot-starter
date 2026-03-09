# BloumeChat Bot Example

This is a functional example bot for BloumeChat built using the official `bloumechat` SDK on npm.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   Copy `.env.sample` to `.env` and configure your bot's token.
```bash
cp .env.sample .env
```
   Edit the `.env` file and insert your token:
   `BLOUMECHAT_TOKEN=your_bot_token_here`

3. Run the bot using `ts-node` or compile it with TypeScript:
```bash
# Using ts-node (Recommended for dev)
npx ts-node index.ts

# Or compile and run
npx tsc
node dist/index.js
```

## Features & Commands

This example bot demonstrates core functionalities of the BloumeChat SDK, including reading messages, sending replies, embedding rich content, managing roles, managing channels, and handling message reactions.

### `!ping`
A simple command to check if the bot is responsive.
- **Usage:** `!ping`
- **Response:** "Pong! 🏓"

### `!say [message]`
Makes the bot repeat the message you provided.
- **Usage:** `!say Hello BloumeChat!`
- **Response:** "Hello BloumeChat!" (Deletes the original command message if it has permission, though the example just replies).

### `!embed`
Demonstrates how to use the `EmbedBuilder` to send rich messages with titles, descriptions, colors, fields, and footers.
- **Usage:** `!embed`
- **Response:** A richly formatted embed card.

### `!createrole [name]`
Creates a new role in the server with the generic `VIEW_CHANNELS` and `SEND_MESSAGES` permissions.
- **Usage:** `!createrole VIP Members`
- **Response:** "✅ Created role: **VIP Members** with VIEW and SEND permissions."
- **Requires:** The bot must have the `MANAGE_ROLES` permission in the server.

### `!createchannel [name] [roleId?]`
Creates a brand new Private Text Channel in the server. If a `roleId` is passed, it sets a permission overwrite allowing only that role (and server admins) to view it.
- **Usage:** `!createchannel secret-chat 1234567890`
- **Response:** "✅ Created private channel: **secret-chat**"
- **Requires:** The bot must have the `MANAGE_CHANNELS` permission in the server.

### `!poll [question]`
Demonstrates how to handle **Message Reactions**. It asks a question, automatically adds 👍 and 👎 reactions, waits 10 seconds for user votes, and then tally counts the results using `awaitReactions` and `fetchReactions`. Finally, it cleans up by removing the reactions using `clearReactions`.
- **Usage:** `!poll Do you like BloumeChat?`
- **Response:** A poll message, followed by the reaction results 10 seconds later.
- **Requires:** The bot must have `ADD_REACTION` to react, and `MANAGE_MESSAGES` to clear reactions at the end.

## SDK Documentation (`bloumechat`)

The bot relies heavily on the `bloumechat` package. Below are some of the highlighted features used in this example:

### `BloumeChat` Client
The main entry point to connect to the platform.
```typescript
import { BloumeChat } from "bloumechat";
const client = new BloumeChat();
client.login(process.env.BLOUMECHAT_TOKEN);
```

### `Message` Object
Contains data about messages sent in the server.
- `message.content`: The text content.
- `message.author`: The user who sent it.
- `message.reply(text)`: Reply directly to the message.
- `message.react(emoji)`: Add a reaction.
- `message.clearReactions()`: Remove all reactions (Requires `MANAGE_MESSAGES`).
- `message.awaitReactions({ max, time })`: Pause the execution and wait for users to react.

### `Guild` (Server) Management
Provides server-level actions.
- `message.guild.createRole({ name, color, permissions })`: Create a new role with specific Bitwise permissions.
- `message.guild.createChannel({ name, type, isPrivate, permissionOverwrites })`: Create a channel, optionally making it private and setting explicit `allow` and `deny` rules.

### `PermissionFlags`
A utility exported by the SDK containing all Bitwise Permission nodes.
```typescript
import { PermissionFlags } from "bloumechat";

const myPerms = PermissionFlags.VIEW_CHANNELS | PermissionFlags.SEND_MESSAGES;
```
