const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
 config: {
 name: "lyrics",
 version: "2.0",
 author: "GoatMart",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Get lyrics of a song"
 },
 longDescription: {
 en: "Fetch the lyrics of any song with its artist name and artwork using the song title."
 },
 category: "media",
 guide: {
 en: "{pn} <song name>\n\nExample:\n{pn} dil"
 }
 },

 onStart: async function ({ api, event, args }) {
 try {
 const songName = args.join(" ");
 if (!songName) {
 return api.sendMessage("❌ Please provide the name of the song.", event.threadID, event.messageID);
 }

 const response = await axios.get(`https://lyricstx.vercel.app/lyrics?title=${encodeURIComponent(songName)}`);
 const data = response.data;

 if (!data.lyrics) {
 return api.sendMessage("❌ No lyrics found for this song.", event.threadID, event.messageID);
 }

 const { artist_name, track_name, artwork_url, lyrics } = data;

 const tmpDir = path.join(__dirname, 'tmp');
 if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
 const imgPath = path.join(tmpDir, `${Date.now()}_cover.jpg`);
 const imgResponse = await axios.get(artwork_url, { responseType: 'arraybuffer' });
 fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

 api.sendMessage({
 body: `🎵 𝗧𝗶𝘁𝗹𝗲: ${track_name}\n🎤 𝗔𝗿𝘁𝗶𝘀𝘁: ${artist_name}\n\n📄 𝗟𝘆𝗿𝗶𝗰𝘀:\n${lyrics}`,
 attachment: fs.createReadStream(imgPath)
 }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

 } catch (err) {
 console.error("❌ | Error fetching lyrics:", err.message);
 return api.sendMessage(`❌ An error occurred: ${err.message}`, event.threadID, event.messageID);
 }
 }
};