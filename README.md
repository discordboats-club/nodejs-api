# dboats API
Easily use the discordboats.club API from your NodeJS bots!

## Examples
```js
// Create the client
const { Client } = require('dboats-api');
const dboats = new Client('api key', 'optional base url, if you want to use a self hosted version of discordboats.club');

// Get stats about the list
await dboats.stats(); // Returns an object of stats

// Get information about the current bot user
await dboats.me(); // Returns an object of information about the current bot

// Get information about a specific bot
await dboats.botInfo('bot id'); // Returns general information about the requested bot

// Gets if a user has liked the bot on discordboats.club
await dboats.botLiked('user id'); // Returns the timestamp of when they voted if they have, otherwise false

// Post servers to discordboats.club
await dboats.postServers(100); // Returns true if it posts successfully

// Get information about a specific user
await dboats.userInfo('user id'); // Returns an object of user information
```