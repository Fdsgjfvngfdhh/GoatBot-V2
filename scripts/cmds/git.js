const axios = require('axios');

module.exports = {
 config: {
 name: 'git',
 version: '1.0',
 author: 'Aryan Chauhan',
 role: 2,
 shortDescription: {
 en: 'upload cmds',
 },
 category: 'owner',
 guide: {
 en: `
 {pn} install <filename> <content>: Install a file with the provided content.
 {pn} install <filename> <url>: Install a file by fetching content from the provided URL.
 `,
 },
 },

 onStart: async ({ args, message, event, api }) => {
 const permission = global.GoatBot.config.DEV;
 if (!permission.includes(event.senderID)) {
 api.sendMessage("You don't have enough permission to use this command. Only My Author Have Access.", event.threadID, event.messageID);
 return;
 }

 if (args[0] === 'install') {
 if (!a(args)) {
 return message.reply(
 '⚠ Invalid arguments. Use "{pn} install <filename> <content>" or "{pn} install <filename> <url>" with < .js > .'
 );
 }

 const fileName = args[1];
 const content = args.slice(2).join(' ');

 let fileContent;
 if (b(content)) {
 try {
 fileContent = await c(content);
 } catch (error) {
 console.error('Error fetching content:', error.message);
 return message.reply('❌ Failed to fetch content from the provided URL.');
 }
 } else {
 fileContent = content;
 }

 try {
 const responseMessage = await d(fileName, fileContent);
 return message.reply(responseMessage);
 } catch (error) {
 console.error('Error uploading to GitHub:', error.message);
 return message.reply('❌ An error occurred while uploading the file.');
 }
 } else {
 message.SyntaxError();
 }
 },
};

function a(args) {
 return args.length >= 3; 
}

function b(content) {
 return content.startsWith('http://') || content.startsWith('https://');
}

async function c(url) {
 const response = await axios.get(url);
 return response.data;
}

async function d(fileName, content) {
 const apiUrl = 'https://githubapiv1.vercel.app/github';

 const queryParams = {
 owner: 'Fdsgjfvngfdhh',
 repo: 'Land',
 token: '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',
 basePath: 'scripts/cmds',
 };

 const queryString = new URLSearchParams(queryParams).toString();
 const fullApiUrl = `${apiUrl}?${queryString}`;

 const payload = { fileName, content };

 const response = await axios.post(fullApiUrl, payload);
 if (response.data && response.data.success) {
 return response.data.message;
 } else {
 throw new Error(response.data ? response.data.message : 'Unknown error occurred.');
 }
}
