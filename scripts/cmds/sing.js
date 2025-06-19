const axios = require("axios");
const fs = require("fs");
const yts = require("yt-search");
const path = require("path");
const cacheDir = path.join(__dirname, "cache");

module.exports = {
 config: {
 name: "sing",
 aliases: ["song", "music"],
 version: "3.1",
 author: "GoatMart",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Search & download song"
 },
 longDescription: {
 en: "Search and download audio from YouTube with lyrics"
 },
 category: "media",
 guide: {
 en: "{pn} <song name>\n\nExample:\n{pn} dil"
 },
 },

 onStart: async ({ api, args, event }) => {
 if (!args[0]) return api.sendMessage("❌ Please provide a song name.", event.threadID, event.messageID);
 api.setMessageReaction("🎶", event.messageID, () => {}, true);

 try {
 const searchQuery = args.join(" ");
 const { videos } = await yts(searchQuery);
 if (!videos[0]) return api.sendMessage("❌ No results found on YouTube.", event.threadID, event.messageID);

 const video = videos[0];
 const audioApiUrl = `https://musicapiz.vercel.app/music?url=${encodeURIComponent(video.url)}`;
 const audioRes = await axios.get(audioApiUrl);
 const audioData = audioRes.data;

 if (!audioData?.download_url) return api.sendMessage("❌ Failed to get audio link.", event.threadID, event.messageID);

 const filePath = path.join(cacheDir, `${video.videoId}.mp3`);
 const audioStream = await axios.get(audioData.download_url, { responseType: 'stream' });
 audioStream.data.pipe(fs.createWriteStream(filePath)).on("finish", async () => {

 let lyricsText = "";
 try {
 const lyricsRes = await axios.get(`https://lyricstx.vercel.app/lyrics?title=${encodeURIComponent(searchQuery)}`);
 const { artist_name, track_name, lyrics } = lyricsRes.data;
 if (lyrics) {
 lyricsText = `${lyrics.length > 1000 ? lyrics.slice(0, 1000) + "..." : lyrics}`;
 } else {
 lyricsText = "\n\n❗ No lyrics found.";
 }
 } catch (err) {
 lyricsText = "\n\n⚠️ Couldn't fetch lyrics.";
 }

 api.sendMessage({
 body: `🎵 𝗧𝗶𝘁𝗹𝗲: ${audioData.title}\n\n📝 𝗟𝘆𝗿𝗶𝗰𝘀\n${lyricsText}\n𝗘𝗻𝗷𝗼𝘆 𝘆𝗼𝘂𝗿 𝘀𝗼𝗻𝗴. ❣️`,
 attachment: fs.createReadStream(filePath)
 }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

 api.setMessageReaction("✅", event.messageID, () => {}, true);
 });

 } catch (e) {
 console.error("❌ Error in sing command:", e.message);
 api.sendMessage("❌ An unexpected error occurred.", event.threadID, event.messageID);
 api.setMessageReaction("❌", event.messageID, () => {}, true);
 }
 }
};