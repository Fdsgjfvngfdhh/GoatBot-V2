module.exports = {
 config: {
 name: "bet",
 version: "2.0",
 author: "Aryan Chauhan",
 countDown: 0,
 shortDescription: {
 en: "Place your bets and test your luck!",
 },
 longDescription: {
 en: "A thrilling betting game where you can risk your money and potentially win big!",
 },
 category: "game",
 },
 langs: {
 en: {
 invalid_amount: "%1, please enter a valid and positive bet amount.",
 not_enough_money: "%1, you don't have enough balance to place that bet.",
 start_message: "%1, you've bet $%2. Let's see if luck is on your side...",
 win_message: "🎉 %1, you won $%2! Your bet paid off!",
 lose_message: "😢 %1, you lost $%2. Better luck next time!",
 jackpot_message: "🎯 Jackpot! %1, you hit the jackpot and won $%2!",
 odd_win: "🎲 %1, the roll was odd (%2). You win $%3!",
 even_win: "🎲 %1, the roll was even (%2). You win $%3!",
 tie_message: "🤝 %1, it's a tie! Your bet of $%2 has been returned.",
 },
 },
 onStart: async function ({ args, message, event, usersData, getLang }) {
 const uid = event.senderID;
 const userData = await usersData.get(uid);
 const userName = userData.name || "Player";
 const betAmount = parseInt(args[0]);

 if (isNaN(betAmount) || betAmount <= 0) {
 return message.reply(getLang("invalid_amount", userName));
 }

 if (betAmount > userData.money) {
 return message.reply(getLang("not_enough_money", userName));
 }

 message.reply(getLang("start_message", userName, betAmount));

 const playerRoll = Math.floor(Math.random() * 12) + 1;
 const botRoll = Math.floor(Math.random() * 12) + 1;

 let winnings = 0;
 let resultMessage = "";

 if (playerRoll === botRoll) {
 resultMessage = getLang("tie_message", userName, betAmount);
 } else if (playerRoll > botRoll) {
 winnings = betAmount * (playerRoll === 12 ? 5 : 2); 
 resultMessage =
 playerRoll === 12
 ? getLang("jackpot_message", userName, winnings)
 : getLang("win_message", userName, winnings);
 } else {
 winnings = -betAmount;
 resultMessage = getLang("lose_message", userName, -winnings);
 }

 if (playerRoll % 2 === 0 && winnings > 0) {
 winnings *= 1.5; // 1.5x for even win
 resultMessage = getLang("even_win", userName, playerRoll, winnings);
 } else if (playerRoll % 2 !== 0 && winnings > 0) {
 winnings *= 1.25; // 1.25x for odd win
 resultMessage = getLang("odd_win", userName, playerRoll, winnings);
 }

 await usersData.set(uid, {
 money: userData.money + winnings,
 data: userData.data,
 });

 resultMessage += `\n🎲 Your Roll: ${playerRoll} | 🤖 Bot's Roll: ${botRoll}`;
 return message.reply(resultMessage);
 },
};
