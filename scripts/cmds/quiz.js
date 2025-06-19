const axios = require('axios');

const BASE_URL = 'https://qxi.vercel.app/api';

module.exports = {
  config: {
    name: "quiz",
    aliases: ["q"],
    version: "3.0",
    author: "GoatMart",
    countDown: 0, 
    role: 0,
    longDescription: { 
      en: "Advanced quiz game with social features, multiplayer, achievements, and comprehensive analytics" 
    },
    category: "game",
    guide: {
      en: `🎯 𝗤𝘂𝗶𝘇 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗚𝘂𝗶𝗱𝗲
━━━━━━━━━━━━━━━━━━━━

🎮 𝗚𝗮𝗺𝗲 𝗠𝗼𝗱𝗲𝘀:
{pn} <category> - Start quiz in specific category
{pn} random - Random category quiz
{pn} daily - Daily challenge (bonus XP)
{pn} torf - True/False quiz
{pn} flag - Flag guessing game
{pn} hard - Hard difficulty only
{pn} medium - Medium difficulty only
{pn} easy - Easy difficulty only

🏆 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗰𝘀 & 𝗣𝗿𝗼𝗳𝗶𝗹𝗲:
{pn} rank - Detailed player statistics
{pn} profile - Enhanced profile with badges
{pn} stats - Advanced analytics
{pn} progress - Progress tracking
{pn} history - Answer history
{pn} badges - Achievement badges
{pn} skills - Skill assessment
{pn} level - XP and level info

📊 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱𝘀:
{pn} leaderboard [page] - Global rankings
{pn} top - Top 10 players
{pn} weekly - Weekly leaderboard
{pn} monthly - Monthly rankings
{pn} category <name> - Category leaderboard

🎯 𝗔𝗻𝗮𝗹𝘆𝘁𝗶𝗰𝘀:
{pn} analytics - Personal analytics
{pn} categories - Category performance
{pn} trends - Performance trends
{pn} comparison - Compare with others
{pn} insights - AI insights

🌟 𝗦𝗼𝗰𝗶𝗮𝗹 & 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆:
{pn} feed - Social activity feed
{pn} tournaments - Active tournaments
{pn} competitions - Weekly competitions
{pn} challenges - Challenge friends

🎮 𝗠𝘂𝗹𝘁𝗶𝗽𝗹𝗮𝘆𝗲𝗿:
{pn} multiplayer - Available rooms
{pn} create <name> - Create room
{pn} join <roomId> - Join room

📚 𝗜𝗻𝗳𝗼 & 𝗛𝗲𝗹𝗽:
{pn} category - List all categories
{pn} help - Show this guide
{pn} global - Global statistics`
    }
  },

  langs: {
    en: {
      reply: "🎯 𝗤𝘂𝗶𝘇 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲\n━━━━━━━━━━━━━━━━\n\n📚 𝖢𝖺𝗍𝖾𝗀𝗈𝗋𝗒: {category}\n🎚️ 𝖣𝗂𝖿𝖿𝗂𝖼𝗎𝗅𝗍𝗒: {difficulty}\n❓ 𝗤𝘂𝗲𝘀𝗍𝗂𝗈𝗇: {question}\n\n{options}\n\n⏰ 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 30 𝗌𝖾𝖼𝗈𝗇𝖽𝗌 𝗍𝗈 𝖺𝗇𝗌𝗐𝖾𝗋 (A/B/C/D):",
      torfReply: "⚙ 𝗤𝘂𝗶𝘇 ( True/False )\n━━━━━━━━━━━━━━━━\n\n💭 𝗤𝘂𝗲𝘀𝗍𝗂𝗈𝗇: {question}\n\n😆: True\n😮: False\n\n⏰ 30 seconds to answer",
      correctMessage: "🎉 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗔𝗻𝘀𝘄𝗲𝗿!\n━━━━━━━━━━━━━━━━\n\n✅ 𝖲𝖼𝗈𝗋𝖾: {correct}/{total}\n🏆 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: {accuracy}%\n🔥 𝖢𝗎𝗋𝗋𝖾𝗇𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: {streak}\n⚡ 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖳𝗂𝗆𝖾: {time}s\n🎯 𝖷𝖯 𝖦𝖺𝗂𝗇𝖾𝖽: +{xp}",
      wrongMessage: "❌ 𝗜𝗻𝗰𝗼𝗿𝗿𝗲𝗰𝘁 𝗔𝗻𝘀𝘄𝗲𝗿\n━━━━━━━━━━━━━━━━\n\n🎯 𝖢𝗈𝗋𝗋𝖾𝖼𝗍: {correctAnswer}\n📊 𝖲𝖼𝗈𝗋𝖾: {correct}/{total}\n📈 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: {accuracy}%\n💔 𝖲𝗍𝗋𝖾𝖺𝗄 𝖱𝖾𝗌𝖾𝗍",
      timeoutMessage: "⏰ 𝖳𝗂𝗆𝖾'𝗌 𝖴𝗉! 𝖢𝗈𝗋𝗋𝖾𝖼𝗍 𝖺𝗇𝗌𝗐𝖾𝗋: {correctAnswer}",
      achievementUnlocked: "🏆 𝗔𝗰𝗵𝗶𝗲𝘃𝗲𝗺𝗲𝗻𝘁 𝗨𝗻𝗹𝗼𝗰𝗸𝗲𝗱!\n{achievement}\n💰 +{bonus} bonus coins!"
    }
  },

  generateProgressBar(percentile) {
    const filled = Math.round(percentile / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  },

  getUserTitle(correct) {
    if (correct >= 50000) return '🌟 Quiz Omniscient';
    if (correct >= 25000) return '👑 Quiz Deity';
    if (correct >= 15000) return '⚡ Quiz Titan';
    if (correct >= 10000) return '🏆 Quiz Legend';
    if (correct >= 7500) return '🎓 Grandmaster';
    if (correct >= 5000) return '👨‍🎓 Quiz Master';
    if (correct >= 2500) return '🔥 Quiz Expert';
    if (correct >= 1500) return '📚 Quiz Scholar';
    if (correct >= 1000) return '🎯 Quiz Apprentice';
    if (correct >= 750) return '🌟 Knowledge Seeker';
    if (correct >= 500) return '📖 Quick Learner';
    if (correct >= 250) return '🚀 Rising Star';
    if (correct >= 100) return '💡 Getting Started';
    if (correct >= 50) return '🎪 First Steps';
    if (correct >= 25) return '🌱 Newcomer';
    if (correct >= 10) return '🔰 Beginner';
    if (correct >= 1) return '👶 Rookie';
    return '🆕 New Player';
  },

  async getUserName(api, userId) {
    try {
      const userInfo = await api.getUserInfo(userId);
      return userInfo[userId]?.name || 'Anonymous Player';
    } catch (error) {
      console.warn("User info fetch failed for", userId, error);
      return 'Anonymous Player';
    }
  },

  onStart: async function ({ message, event, args, commandName, getLang, api, usersData }) {
    try {
      const command = args[0]?.toLowerCase();

      if (!args[0] || command === "help") {
        return await this.handleHelp(message, getLang);
      }

      switch (command) {
        case "rank":
        case "profile":
          return await this.handleRank(message, event, getLang, api);
        case "stats":
        case "analytics":
          return await this.handleStats(message, event, getLang, api);
        case "leaderboard":
        case "lb":
          return await this.handleLeaderboard(message, getLang, args.slice(1), api);
        case "top":
          return await this.handleTop(message, getLang, api);
        case "weekly":
          return await this.handleWeeklyLeaderboard(message, getLang, api);
        case "monthly":
          return await this.handleMonthlyLeaderboard(message, getLang, api);
        case "badges":
          return await this.handleBadges(message, event, getLang, api);
        case "skills":
          return await this.handleSkills(message, event, getLang, api);
        case "level":
          return await this.handleLevel(message, event, getLang, api);
        case "progress":
          return await this.handleProgress(message, event, getLang, api);
        case "history":
          return await this.handleHistory(message, event, getLang, api);
        case "category":
          if (args.length > 1) {
            return await this.handleCategoryLeaderboard(message, getLang, args.slice(1), api);
          }
          return await this.handleCategories(message, getLang);
        case "global":
          return await this.handleGlobalStats(message, getLang);
        case "feed":
          return await this.handleSocialFeed(message, getLang, api);
        case "tournaments":
          return await this.handleTournaments(message, getLang);
        case "competitions":
          return await this.handleCompetitions(message, getLang);
        case "multiplayer":
          return await this.handleMultiplayer(message, getLang);
        case "create":
          return await this.handleCreateRoom(message, event, args.slice(1), getLang);
        case "join":
          return await this.handleJoinRoom(message, event, args.slice(1), getLang);
        case "daily":
          return await this.handleDailyChallenge(message, event, commandName, api);
        case "torf":
          return await this.handleTrueOrFalse(message, event, commandName, api);
        case "flag":
          return await this.handleFlagQuiz(message, event, commandName, api);
        case "trends":
          return await this.handleTrends(message, event, getLang);
        case "comparison":
          return await this.handleComparison(message, event, getLang);
        case "insights":
          return await this.handleInsights(message, event, getLang);
        case "hard":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "hard");
        case "medium":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "medium");
        case "easy":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "easy");
        case "random":
          return await this.handleQuiz(message, event, [], commandName, getLang, api, usersData);
        default:
          return await this.handleQuiz(message, event, args, commandName, getLang, api, usersData);
      }
    } catch (err) {
      console.error("Quiz start error:", err);
      return message.reply("⚠️ Error occurred, try again.");
    }
  },

  async handleHelp(message, getLang) {
    return message.reply(`🎯 𝗤𝘂𝗶𝘇 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗛𝗲𝗹𝗽
━━━━━━━━━━━━━━━━━━━━

🎮 𝗚𝗮𝗺𝗲 𝗠𝗼𝗱𝗲𝘀:
• quiz <category> - Category quiz
• quiz random - Random quiz
• quiz daily - Daily challenge
• quiz torf - True/False
• quiz flag - Flag guessing
• quiz hard/medium/easy - Difficulty

🏆 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗰𝘀:
• quiz rank - Your profile
• quiz stats - Analytics
• quiz badges - Achievements
• quiz progress - Progress tracking

📊 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱𝘀:
• quiz leaderboard - Global
• quiz top - Top 10
• quiz weekly - This week

🌟 𝗦𝗼𝗰𝗶𝗮𝗹:
• quiz feed - Activity feed
• quiz multiplayer - Rooms
• quiz tournaments - Events

Use "quiz category" to see all available categories!`);
  },

  async handleRank(message, event, getLang, api) {
    try {
      // First, make sure user exists in database with proper name
      const userName = await this.getUserName(api, event.senderID);

      // Update user with name
      await axios.post(`${BASE_URL}/user/update`, {
        userId: event.senderID,
        name: userName
      });

      const res = await axios.get(`${BASE_URL}/user/${event.senderID}`);
      const user = res.data;

      if (!user || user.total === 0) {
        return message.reply(`❌ You haven't played any quiz yet! Use 'quiz random' to start.\n👤 Welcome, ${userName}!`);
      }

      const position = user.position ?? "N/A";
      const totalUser = user.totalUsers ?? "N/A";
      const progressBar = this.generateProgressBar(user.percentile ?? 0);
      const title = this.getUserTitle(user.correct || 0);

      const streakInfo = user.currentStreak > 0 ? 
        `🔥 𝖢𝗎𝗋𝗋𝖾𝗇𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: ${user.currentStreak}${user.currentStreak >= 5 ? ' 🚀' : ''}` :
        `🔥 𝖢𝗎𝗋𝗋𝖾𝗇𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: 0`;

      const bestStreakInfo = user.bestStreak > 0 ?
        `🏅 𝖡𝖾𝗌𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: ${user.bestStreak}${user.bestStreak >= 10 ? ' 👑' : user.bestStreak >= 5 ? ' ⭐' : ''}` :
        `🏅 𝖡𝖾𝗌𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: 0`;

      return message.reply(
        `🎮 𝗤𝘂𝗶𝘇 𝗣𝗿𝗼𝗳𝗂𝗹𝗲\n━━━━━━━━━━━━━━━━\n\n` +
        `👤 ${userName}\n` +
        `🎖️ ${title}\n` +
        `🏆 𝖦𝗅𝗈𝖻𝖺𝗅 𝖱𝖺𝗇𝗄: #${position}/${totalUser}\n` +
        `📈 𝖯𝖾𝗋𝖼𝖾𝗇𝗍𝗂𝗅𝖾: ${progressBar} ${user.percentile ?? 0}%\n\n` +
        `📊 𝗦𝘁𝗮𝘁𝗂𝘀𝘁𝗂𝗰𝘀\n` +
        `✅ 𝖢𝗈𝗋𝗋𝖾𝖼𝗍: ${user.correct ?? 0}\n` +
        `❌ 𝖶𝗋𝗈𝗇𝗀: ${user.wrong ?? 0}\n` +
        `📝 𝖳𝗈𝗍𝖺𝗅: ${user.total ?? 0}\n` +
        `🎯 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: ${user.accuracy ?? 0}%\n` +
        `⚡ 𝖠𝗏𝗀 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾: ${(user.avgResponseTime ?? 0).toFixed(1)}s\n\n` +
        `🎯 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝘀\n` +
        `${streakInfo}\n` +
        `${bestStreakInfo}\n` +
        `🌟 𝖫𝖾𝗏𝖾𝗅: ${user.level ?? 1}\n` +
        `✨ 𝖷𝖯: ${user.xp ?? 0}\n\n` +
        `🎯 𝖭𝖾𝗑𝗍 𝖬𝗂𝗅𝖾𝗌𝗍𝗈𝗇𝖾: ${user.nextMilestone || "Keep playing!"}`
      );
    } catch (err) {
      console.error("Rank error:", err);
      return message.reply("⚠️ Could not fetch rank. Please try again later.");
    }
  },

  async handleStats(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);

      await axios.post(`${BASE_URL}/user/update`, {
        userId: event.senderID,
        name: userName
      });

      const res = await axios.get(`${BASE_URL}/user/${event.senderID}/stats`);
      const stats = res.data;

      const efficiency = stats.advanced?.efficiency || 0;
      const hoursPlayed = stats.time?.hoursPlayed || 0;
      const avgResponseTime = stats.advanced?.avgResponseTime || 0;
      const fastestResponse = stats.advanced?.fastestResponse || 0;
      const slowestResponse = stats.advanced?.slowestResponse || 0;

      return message.reply(
        `📊 𝗔𝗱𝘃𝗮𝗻𝗰𝗲𝗱 𝗔𝗻𝗮𝗹𝘆𝘁𝗂𝗰𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 ${userName}\n\n` +
        `📈 𝗕𝗮𝘀𝗂𝗰 𝗦𝘁𝗮𝘁𝘀\n` +
        `✅ 𝖢𝗈𝗋𝗋𝖾𝖼𝗍: ${stats.basic?.correct ?? 0}\n` +
        `❌ 𝖶𝗋𝗈𝗇𝗀: ${stats.basic?.wrong ?? 0}\n` +
        `🎯 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: ${stats.basic?.accuracy ?? 0}%\n` +
        `🔥 𝖡𝖾𝗌𝗍 𝖲𝗍𝗋𝖾𝖺𝗄: ${stats.basic?.bestStreak ?? 0}\n\n` +
        `⚡ 𝗣𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲\n` +
        `🌟 𝖫𝖾𝗏𝖾𝗅: ${stats.advanced?.level ?? 1}\n` +
        `✨ 𝖷𝖯: ${stats.advanced?.xp ?? 0}\n` +
        `⏱️ 𝖠𝗏𝗀 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾: ${avgResponseTime.toFixed(1)}s\n` +
        `⚡ 𝖥𝖺𝗌𝗍𝖾𝗌𝗍: ${fastestResponse.toFixed(1)}s\n` +
        `🐌 𝖲𝗅𝗈𝗐𝖾𝗌𝗍: ${slowestResponse.toFixed(1)}s\n` +
        `🏃 𝖤𝖿𝖿𝗂𝖼𝗂𝖾𝗇𝖼𝗒: ${efficiency.toFixed(2)}\n\n` +
        `⏰ 𝗧𝗶𝗺𝗲 𝗦𝘁𝗮𝘁𝘀\n` +
        `🕒 𝖳𝗈𝗍𝖺𝗅 𝖯𝗅𝖺𝗒 𝖳𝗂𝗆𝖾: ${hoursPlayed.toFixed(1)}h\n` +
        `🎮 𝖦𝖺𝗆𝖾𝗌 𝖯𝗅𝖺𝗒𝖾𝖽: ${stats.time?.gamesPlayed ?? 0}\n` +
        `⏳ 𝖫𝗈𝗇𝗀𝖾𝗌𝗍 𝖲𝖾𝗌𝗌𝗂𝗈𝗇: ${Math.floor((stats.time?.longestSession ?? 0) / 60)}min\n\n` +
        `🏆 𝖠𝖼𝗁𝗂𝖾𝗏𝖾𝗆𝖾𝗇𝗍𝗌: ${stats.achievements?.perfectGames ?? 0} perfect games`
      );
    } catch (err) {
      console.error("Stats error:", err);
      return message.reply("⚠️ Could not fetch statistics.");
    }
  },

  async handleBadges(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);
      const res = await axios.get(`${BASE_URL}/badges/${event.senderID}`);
      const data = res.data;

      const unlockedBadges = data.badges.filter(badge => badge.unlocked);
      const lockedBadges = data.badges.filter(badge => !badge.unlocked);

      let badgeText = `🏆 𝗕𝗮𝗱𝗴𝗲 𝗖𝗼𝗹𝗹𝗲𝗰𝘁𝗶𝗼𝗻\n━━━━━━━━━━━━━━━━━━━━\n\n👤 ${userName}\n📊 ${data.summary.unlocked}/${data.summary.total} (${data.summary.completionRate}%)\n\n`;

      if (unlockedBadges.length > 0) {
        badgeText += `✨ 𝗨𝗻𝗹𝗼𝗰𝗸𝗲𝗱 𝗕𝗮𝗱𝗴𝗲𝘀\n`;
        unlockedBadges.forEach(badge => {
          badgeText += `${badge.icon} ${badge.name} (${badge.rarity})\n`;
        });
        badgeText += '\n';
      }

      if (lockedBadges.length > 0) {
        badgeText += `🔒 𝗡𝗲𝗮𝗿 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗶𝗼𝗻\n`;
        lockedBadges.slice(0, 3).forEach(badge => {
          badgeText += `${badge.icon} ${badge.name} - ${badge.progress}%\n`;
        });
      }

      if (data.summary.nextBadge) {
        badgeText += `\n🎯 𝗡𝗲𝘅𝘁: ${data.summary.nextBadge.name}`;
      }

      return message.reply(badgeText);
    } catch (err) {
      console.error("Badges error:", err);
      return message.reply("⚠️ Could not fetch badges.");
    }
  },

  async handleLeaderboard(message, getLang, args, api) {
    try {
      const page = parseInt(args?.[0]) || 1;
      const sortBy = args?.[1] || 'correct';

      const res = await axios.get(`${BASE_URL}/leaderboard/detailed?page=${page}&limit=10&sortBy=${sortBy}`);
      const { users, pagination } = res.data;

      if (!users || users.length === 0) {
        return message.reply("🏆 No players found in leaderboard. Start playing to be the first!");
      }

      // Get names for all users
      const usersWithNames = await Promise.all(users.map(async (u, i) => {
        let userName = u.name || 'Anonymous Player';
        if (u.userId && userName === 'Anonymous Player') {
          try {
            userName = await this.getUserName(api, u.userId);
          } catch (error) {
            userName = u.name || 'Anonymous Player';
          }
        }

        const position = (pagination.currentPage - 1) * 10 + i + 1;
        const crown = position === 1 ? "👑" : position === 2 ? "🥈" : position === 3 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);

        return `${crown} #${position} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0}/${u.total || 0} (${u.accuracy || 0}%)\n🔥 Streak: ${u.currentStreak || 0}`;
      }));

      const topPlayers = usersWithNames.join('\n\n');

      return message.reply(
        `🏆 𝗚𝗹𝗼𝗯𝗮𝗹 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱\n━━━━━━━━━━━━━━━━━━━━\n\n${topPlayers}\n\n` +
        `📖 Page ${pagination.currentPage}/${pagination.totalPages}\n` +
        `👥 Total Players: ${pagination.totalUsers}`
      );
    } catch (err) {
      console.error("Leaderboard error:", err);
      return message.reply("⚠️ Could not fetch leaderboard. Server may be busy, try again later.");
    }
  },

  async handleTop(message, getLang, api) {
    try {
      const res = await axios.get(`${BASE_URL}/leaderboard/detailed?page=1&limit=5&sortBy=correct`);
      const { users } = res.data;

      if (!users || users.length === 0) {
        return message.reply("🏆 No players found. Start playing to be the first!");
      }

      const topPlayersWithNames = await Promise.all(users.map(async (u, i) => {
        let userName = u.name || 'Anonymous Player';
        if (u.userId && userName === 'Anonymous Player') {
          try {
            userName = await this.getUserName(api, u.userId);
          } catch (error) {
            userName = u.name || 'Anonymous Player';
          }
        }

        const crown = i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);
        return `${crown} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0} correct (${u.accuracy || 0}%)`;
      }));

      const topPlayers = topPlayersWithNames.join('\n\n');

      return message.reply(`🏆 𝗧𝗼𝗽 𝟱 𝗣𝗹𝗮𝘆𝗲𝗿𝘀\n━━━━━━━━━━━━━━━━\n\n${topPlayers}`);
    } catch (err) {
      console.error("Top players error:", err);
      return message.reply("⚠️ Could not fetch top players. Server may be busy, try again later.");
    }
  },

  async handleGlobalStats(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/stats/global`);
      const stats = res.data;

      return message.reply(
        `🌍 𝗚𝗹𝗼𝗯𝗮𝗹 𝗦𝘁𝗮𝘁𝗂𝘀𝘁𝗂𝗰𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👥 𝖳𝗈𝗍𝖺𝗅 𝖯𝗅𝖺𝗒𝖾𝗋𝗌: ${stats.totalUsers?.toLocaleString() || 0}\n` +
        `📝 𝖳𝗈𝗍𝖺𝗅 𝖰𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌: ${stats.totalQuestions?.toLocaleString() || 0}\n` +
        `✅ 𝖳𝗈𝗍𝖺𝗅 𝖠𝗇𝗌𝗐𝖾𝗋𝗌: ${stats.totalAnswers?.toLocaleString() || 0}\n` +
        `🎯 𝖠𝗏𝖾𝗋𝖺𝗀𝖾 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: ${stats.averageAccuracy || 0}%\n\n` +
        `⚡ 𝗔𝗱𝘃𝗮𝗻𝗰𝗲𝗱 𝗦𝘁𝗮𝘁𝘀\n` +
        `🕒 𝖳𝗈𝗍𝖺𝗅 𝖯𝗅𝖺𝗒 𝖳𝗂𝗆𝖾: ${stats.advanced?.totalPlayTimeHours || 0}h\n` +
        `🎮 𝖳𝗈𝗍𝖺𝗅 𝖦𝖺𝗆𝖾𝗌: ${stats.advanced?.totalGames?.toLocaleString() || 0}\n` +
        `⏱️ 𝖠𝗏𝗀 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖳𝗂𝗆𝖾: ${stats.advanced?.avgGlobalResponseTime || 0}s\n` +
        `🌟 𝖧𝗂𝗀𝗁𝖾𝗌𝗍 𝖫𝖾𝗏𝖾𝗅: ${stats.advanced?.highestLevel || 1}\n` +
        `✨ 𝖳𝗈𝗍𝖺𝗅 𝖷𝖯: ${stats.advanced?.totalXPEarned?.toLocaleString() || 0}\n` +
        `📊 𝖰/𝖯𝗅𝖺𝗒𝖾𝗋: ${stats.advanced?.questionsPerUser || 0}`
      );
    } catch (err) {
      console.error("Global stats error:", err);
      return message.reply("⚠️ Could not fetch global statistics.");
    }
  },

  async handleSocialFeed(message, getLang, api) {
    try {
      const res = await axios.get(`${BASE_URL}/social/feed?limit=5`);
      const { activities } = res.data;

      if (!activities || activities.length === 0) {
        return message.reply("📰 No recent activity in the community feed.");
      }

      let feedText = `📰 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 𝗔𝗰𝘁𝗶𝘃𝗶𝘁𝘆\n━━━━━━━━━━━━━━━━━━━━\n\n`;

      const activitiesWithNames = await Promise.all(activities.map(async activity => {
        let userName = 'Player';
        if (activity.userId) {
          userName = await this.getUserName(api, activity.userId);
        }

        const timeAgo = new Date(activity.createdAt).toLocaleDateString();
        return `${activity.icon} ${userName}\n${activity.description}\n${activity.points > 0 ? `+${activity.points} XP` : ''} • ${timeAgo}`;
      }));

      feedText += activitiesWithNames.join('\n\n');

      return message.reply(feedText);
    } catch (err) {
      console.error("Social feed error:", err);
      return message.reply("⚠️ Could not fetch social feed.");
    }
  },

  async handleMultiplayer(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/multiplayer/rooms`);
      const rooms = res.data;

      if (!rooms || rooms.length === 0) {
        return message.reply("🎮 No active multiplayer rooms. Use 'quiz create <name>' to start one!");
      }

      let roomText = `🎮 𝗠𝘂𝗅𝘁𝗶𝗽𝗹𝗮𝘆𝗲𝗿 𝗥𝗼𝗼𝗺𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n`;

      rooms.forEach(room => {
        const statusEmoji = room.status === 'waiting' ? '🟢' : room.status === 'active' ? '🔴' : '🟡';
        roomText += `${statusEmoji} ${room.name}\n`;
        roomText += `👥 ${room.players}/${room.maxPlayers} players\n`;
        roomText += `📚 ${room.category} (${room.difficulty})\n`;
        roomText += `⏰ ${room.timeLimit}s per question\n`;
        roomText += `🆔 ID: ${room.id}\n\n`;
      });

      roomText += `Use 'quiz join <roomId>' to join a room!`;

      return message.reply(roomText);
    } catch (err) {
      console.error("Multiplayer error:", err);
      return message.reply("⚠️ Could not fetch multiplayer rooms.");
    }
  },

  async handleCategories(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      const categories = res.data;

      const catText = categories.map(c => `📍 ${c.charAt(0).toUpperCase() + c.slice(1)}`).join("\n");

      return message.reply(
        `📚 𝗤𝘂𝗶𝘇 𝗖𝗮𝘁𝗲𝗴𝗼𝗋𝗶𝗲𝘀\n━━━━━━━━━━━━━━━━\n\n${catText}\n\n` +
        `🎯 Use: quiz <category>\n` +
        `🎲 Random: quiz random\n` +
        `🏆 Daily: quiz daily\n` +
        `🌟 Special: quiz torf, quiz flag`
      );
    } catch (err) {
      console.error("Categories error:", err);
      return message.reply("⚠️ Could not fetch categories.");
    }
  },

  async handleDailyChallenge(message, event, commandName, api) {
    try {
      const res = await axios.get(`${BASE_URL}/challenge/daily?userId=${event.senderID}`);
      const { question, challengeDate, reward, streak } = res.data;

      const userName = await this.getUserName(api, event.senderID);

      const optText = question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n");

      const info = await message.reply(
        `🌟 𝗗𝗮𝗶𝗹𝘆 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `📅 ${challengeDate}\n` +
        `🎯 Bonus Reward: +${reward} XP\n` +
        `🔥 Daily Streak: ${streak}\n\n` +
        `❓ ${question.question}\n\n${optText}\n\n⏰ 30 seconds to answer!`
      );

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer: question.answer,
        questionId: question._id,
        startTime: Date.now(),
        isDailyChallenge: true,
        bonusReward: reward
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(`⏰ Time's up! The correct answer was: ${question.answer}`);
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Daily challenge error:", err);
      return message.reply("⚠️ Could not create daily challenge.");
    }
  },

  async handleTrueOrFalse(message, event, commandName, api) {
    try {
      const res = await axios.get(`${BASE_URL}/question?category=torf&userId=${event.senderID}`);
      const { _id, question, answer } = res.data;

      const info = await message.reply(this.langs.en.torfReply.replace("{question}", question));

      global.GoatBot.onReaction.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer: answer === "True",
        reacted: false,
        reward: this.envConfig.reward,
        questionId: _id,
        startTime: Date.now()
      });setTimeout(() => {
        const reaction = global.GoatBot.onReaction.get(info.messageID);
        if (reaction && !reaction.reacted) {
          message.reply(this.langs.en.timeoutMessage.replace("{correctAnswer}", answer));
          message.unsend(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("True/False error:", err);
      return message.reply("⚠️ Could not create True/False question.");
    }
  },

  async handleFlagQuiz(message, event, commandName, api) {
    try {
      const res = await axios.get(`${BASE_URL}/question?category=flag&userId=${event.senderID}`);
      const { _id, imageUrl, options, answer } = res.data;

      const flagEmbed = {
        body: "🏁 𝗙𝗹𝗮𝗴 𝗤𝘂𝗶𝘇\n━━━━━━━━━━━━━━━━\n\n🌍 Guess this country's flag:\n\n" +
              options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n") +
              "\n\n⏰ Time: 30 seconds",
        attachment: imageUrl ? await global.utils.getStreamFromURL(imageUrl) : null
      };

      const info = await message.reply(flagEmbed);

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer,
        questionId: _id,
        startTime: Date.now(),
        isFlag: true,
        reward: this.envConfig.flagReward
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(`⏰ Time's up! The correct answer was: ${answer}`);
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Flag quiz error:", err);
      return message.reply("⚠️ Could not create flag quiz.");
    }
  },

  async handleQuiz(message, event, args, commandName, getLang, api, usersData, forcedDifficulty = null) {
    try {
      const userName = await this.getUserName(api, event.senderID);

      // Update user name in database
      await axios.post(`${BASE_URL}/user/update`, {
        userId: event.senderID,
        name: userName
      });

      const category = args[0]?.toLowerCase() || "";

      let queryParams = {
        userId: event.senderID
      };
      if (category && category !== "random") {
        queryParams.category = category;
      }
      if (forcedDifficulty) {
        queryParams.difficulty = forcedDifficulty;
      }

      const res = await axios.get(`${BASE_URL}/question`, { params: queryParams });
      const { _id, question, options, answer, category: qCategory, difficulty } = res.data;

      const optText = options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n");

      const info = await message.reply(getLang("reply")
        .replace("{category}", qCategory?.charAt(0).toUpperCase() + qCategory?.slice(1) || "Random")
        .replace("{difficulty}", difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1) || "Medium")
        .replace("{question}", question)
        .replace("{options}", optText));

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer,
        questionId: _id,
        startTime: Date.now(),
        difficulty,
        category: qCategory
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(getLang("timeoutMessage").replace("{correctAnswer}", answer));
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Quiz error:", err);
      message.reply("⚠️ Could not get quiz question. Try 'quiz categories' to see available options.");
    }
  },

  async handleCategoryLeaderboard(message, getLang, args, api) {
    try {
      const category = args[0]?.toLowerCase();
      if (!category) {
        return message.reply("📚 Please specify a category to view the leaderboard for.");
      }

      const page = parseInt(args[1]) || 1;
      const res = await axios.get(`${BASE_URL}/leaderboard/category/${category}?page=${page}&limit=10`);
      const { users, pagination } = res.data;

      if (!users || users.length === 0) {
        return message.reply(`🏆 No players found for the category: ${category}.`);
      }

      const topPlayersWithNames = await Promise.all(users.map(async (u, i) => {
        let userName = 'Anonymous Player';
        if (u.userId) {
          userName = await this.getUserName(api, u.userId);
        }

        const position = (pagination.currentPage - 1) * 10 + i + 1;
        const crown = position === 1 ? "👑" : position === 2 ? "🥈" : position === 3 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);
        return `${crown} #${position} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0}/${u.total || 0} (${u.accuracy || 0}%)`;
      }));

      const topPlayers = topPlayersWithNames.join('\n\n');

      return message.reply(
        `🏆 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱: ${category.charAt(0).toUpperCase() + category.slice(1)}\n━━━━━━━━━━━━━━━━━━━━\n\n${topPlayers}\n\n` +
        `📖 Page ${pagination.currentPage}/${pagination.totalPages}\n` +
        `👥 Total Players: ${pagination.totalUsers}`
      );
    } catch (err) {
      console.error("Category leaderboard error:", err);
      return message.reply("⚠️ Could not fetch category leaderboard.");
    }
  },

  // Add placeholder handlers for other features
  async handleTournaments(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/tournaments/active`);
      const tournaments = res.data;

      if (!tournaments || tournaments.length === 0) {
        return message.reply("🏆 No active tournaments at the moment. Check back later!");
      }

      let tournamentText = `🏆 𝗔𝗰𝘁𝗶𝘃𝗲 𝗧𝗼𝘂𝗿𝗻𝗮𝗺𝗲𝗻𝘁𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n`;

      tournaments.forEach(tournament => {
        const endDate = new Date(tournament.endDate).toLocaleDateString();
        tournamentText += `🏆 ${tournament.title}\n`;
        tournamentText += `📝 ${tournament.description}\n`;
        tournamentText += `👥 ${tournament.participants?.length || 0} participants\n`;
        tournamentText += `🎁 Reward: ${tournament.reward} XP\n`;
        tournamentText += `📅 Ends: ${endDate}\n\n`;
      });

      return message.reply(tournamentText);
    } catch (err) {
      console.error("Tournaments error:", err);
      return message.reply("⚠️ Could not fetch tournaments.");
    }
  },

  async handleCompetitions(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/competitions/weekly`);
      const competitions = res.data;

      if (!competitions || competitions.length === 0) {
        return message.reply("🏁 No active competitions this week.");
      }

      let competitionText = `🏁 𝗪𝗲𝗲𝗸𝗹𝘆 𝗖𝗼𝗺𝗽𝗲𝘁𝗶𝘁𝗶𝗼𝗻𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n`;

      competitions.forEach(comp => {
        competitionText += `🏁 ${comp.name}\n`;
        competitionText += `📝 ${comp.description}\n`;
        competitionText += `👥 ${comp.participants} participants\n`;
        competitionText += `🎁 Prizes: ${comp.prizes.join(', ')}\n\n`;
      });

      return message.reply(competitionText);
    } catch (err) {
      console.error("Competitions error:", err);
      return message.reply("⚠️ Could not fetch competitions.");
    }
  },

  async handleProgress(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);
      const res = await axios.get(`${BASE_URL}/progress/detailed/${event.senderID}?timeframe=7d`);
      const progress = res.data;

      return message.reply(
        `📈 𝗪𝗲𝗲𝗸𝗹𝘆 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝘀\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 ${userName}\n\n` +
        `📊 𝗦𝘂𝗺𝗺𝗮𝗿𝘆 (𝗟𝗮𝘀𝘁 𝟳 𝗱𝗮𝘆𝘀)\n` +
        `✨ 𝖷𝖯 𝖦𝖺𝗂𝗇𝖾𝖽: ${progress.summary?.totalXPGained || 0}\n` +
        `🎯 𝖠𝗏𝗀 𝖠𝖼𝖼𝗎𝗋𝖺𝖼𝗒: ${progress.summary?.avgAccuracy || 0}%\n` +
        `⏰ 𝖳𝗂𝗆𝖾 𝖲𝗉𝖾𝗇𝗍: ${progress.summary?.totalTimeSpent || 0}min\n` +
        `📝 𝖰𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌: ${progress.summary?.questionsAnswered || 0}\n` +
        `📈 𝖳𝗋𝖾𝗇𝖽: ${progress.summary?.improvement || 'stable'}`
      );
    } catch (err) {
      console.error("Progress error:", err);
      return message.reply("⚠️ Could not fetch progress data.");
    }
  },

  async handleHistory(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);
      const res = await axios.get(`${BASE_URL}/user/${event.senderID}/history?limit=10`);
      const history = res.data;

      if (!history.history || history.history.length === 0) {
        return message.reply("📜 No quiz history found. Start playing to build your history!");
      }

      let historyText = `📜 𝗤𝘂𝗶𝘇 𝗛𝗂𝘀𝘁𝗈𝗋𝘆\n━━━━━━━━━━━━━━━━━━━━\n\n👤 ${userName}\n\n`;

      history.history.slice(0, 5).forEach((item, i) => {
        const result = item.correct ? "✅" : "❌";
        const timeAgo = new Date(item.date).toLocaleDateString();
        historyText += `${result} ${item.category} (${item.difficulty})\n`;
        historyText += `⏱️ ${item.timeSpent}s • ${item.xpGained} XP • ${timeAgo}\n\n`;
      });

      historyText += `📊 Recent Performance:\n`;
      historyText += `🎯 Accuracy: ${history.summary?.averageAccuracy || 0}%\n`;
      historyText += `✨ Total XP: ${history.summary?.totalXP || 0}\n`;
      historyText += `📈 Best Category: ${history.summary?.mostActiveCategory || 'N/A'}`;

      return message.reply(historyText);
    } catch (err) {
      console.error("History error:", err);
      return message.reply("⚠️ Could not fetch history data.");
    }
  },

  async handleSkills(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);
      const res = await axios.get(`${BASE_URL}/skills/assessment/${event.senderID}`);
      const skills = res.data;

      let skillText = `🎯 𝗦𝗸𝗶𝗹𝗹 𝗔𝘀𝘀𝗲𝘀𝘀𝗺𝗲𝗻𝘁\n━━━━━━━━━━━━━━━━━━━━\n\n👤 ${userName}\n🌟 Overall Level: ${skills.overallLevel}\n\n`;

      if (skills.skillBreakdown && skills.skillBreakdown.length > 0) {
        skillText += `📊 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 𝗕𝗿𝗲𝗮𝗸𝗱𝗼𝘄𝗇\n`;
        skills.skillBreakdown.slice(0, 5).forEach(skill => {
          const proficiencyBar = this.generateProgressBar(skill.proficiency);
          skillText += `📚 ${skill.category}: ${skill.level}\n`;
          skillText += `${proficiencyBar} ${skill.proficiency}%\n`;
          skillText += `⏱️ Avg Time: ${skill.averageTime}s\n\n`;
        });
      }

      if (skills.recommendations && skills.recommendations.length > 0) {
        skillText += `💡 𝗥𝗲𝗰𝗼𝗺𝗺𝗲𝗻𝗱𝗮𝘁𝗶𝗼𝗻𝘀\n`;
        skills.recommendations.slice(0, 2).forEach(rec => {
          skillText += `• ${rec}\n`;
        });
      }

      return message.reply(skillText);
    } catch (err) {
      console.error("Skills error:", err);
      return message.reply("⚠️ Could not fetch skill assessment.");
    }
  },

  async handleLevel(message, event, getLang, api) {
    try {
      const userName = await this.getUserName(api, event.senderID);
      const res = await axios.get(`${BASE_URL}/user/${event.senderID}/rank`);
      const user = res.data;

      const xpProgress = this.generateProgressBar((user.xp % 100));
      const title = this.getUserTitle(user.correct || 0);

      return message.reply(
        `🌟 𝗟𝗲𝘃𝗲𝗹 & 𝗫𝗣 𝗜𝗻𝗳𝗼\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 ${userName}\n` +
        `🎖️ ${title}\n\n` +
        `🌟 Current Level: ${user.level || 1}\n` +
        `✨ Total XP: ${user.xp || 0}\n` +
        `🎯 To Next Level: ${user.xpToNextLevel || 100} XP\n` +
        `${xpProgress} ${((user.xp || 0) % 100)}%\n\n` +
        `🏆 Achievements Unlocked: ${user.achievements?.length || 0}\n` +
        `🔥 Current Streak: ${user.currentStreak || 0}\n` +
        `🏅 Best Streak: ${user.bestStreak || 0}`
      );
    } catch (err) {
      console.error("Level error:", err);
      return message.reply("⚠️ Could not fetch level information.");
    }
  },

  // Additional placeholder handlers for remaining features
  async handleTrends(message, event, getLang) {
    return message.reply("📈 Trends analysis coming soon! Use 'quiz analytics' for current stats.");
  },

  async handleComparison(message, event, getLang) {
    return message.reply("⚖️ Player comparison feature coming soon! Use 'quiz leaderboard' to see rankings.");
  },

  async handleInsights(message, event, getLang) {
    return message.reply("🔍 AI insights coming soon! Use 'quiz skills' for current assessment.");
  },

  async handleWeeklyLeaderboard(message, getLang, api) {
    try {
      const res = await axios.get(`${BASE_URL}/leaderboard/weekly`);
      const users = res.data.users;

      if (!users || users.length === 0) {
        return message.reply("📅 No players in weekly leaderboard yet.");
      }

      const topPlayersWithNames = await Promise.all(users.slice(0, 5).map(async (u, i) => {
        let userName = 'Anonymous Player';
        if (u.userId) {
          userName = await this.getUserName(api, u.userId);
        }

        const crown = i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);
        return `${crown} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0} correct (${u.accuracy || 0}%)`;
      }));

      const topPlayers = topPlayersWithNames.join('\n\n');

      return message.reply(`📅 𝗪𝗲𝗲𝗸𝗹𝘆 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱\n━━━━━━━━━━━━━━━━\n\n${topPlayers}`);
    } catch (err) {
      console.error("Weekly leaderboard error:", err);
      return message.reply("⚠️ Could not fetch weekly leaderboard.");
    }
  },

  async handleMonthlyLeaderboard(message, getLang, api) {
    try {
      const res = await axios.get(`${BASE_URL}/leaderboard/monthly`);
      const users = res.data.users;

      if (!users || users.length === 0) {
        return message.reply("📅 No players in monthly leaderboard yet.");
      }

      const topPlayersWithNames = await Promise.all(users.slice(0, 5).map(async (u, i) => {
        let userName = 'Anonymous Player';
        if (u.userId) {
          userName = await this.getUserName(api, u.userId);
        }

        const crown = i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);
        return `${crown} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0} correct (${u.accuracy || 0}%)`;
      }));

      const topPlayers = topPlayersWithNames.join('\n\n');

      return message.reply(`📅 𝗠𝗼𝗻𝘁𝗵𝗹𝘆 𝗟𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱\n━━━━━━━━━━━━━━━━━━━━\n\n${topPlayers}`);
    } catch (err) {
      console.error("Monthly leaderboard error:", err);
      return message.reply("⚠️ Could not fetch monthly leaderboard.");
    }
  },

  async handleCreateRoom(message, event, args, getLang) {
    return message.reply("🎮 Room creation coming soon! Use 'quiz multiplayer' to see available rooms.");
  },

  async handleJoinRoom(message, event, args, getLang) {
    return message.reply("🎮 Room joining coming soon! Use 'quiz multiplayer' to see available rooms.");
  },

  onReaction: async function ({ message, event, Reaction, api, usersData }) {
    try {
      const { author, messageID, answer, reacted, reward } = Reaction;

      if (event.userID !== author || reacted) return;

      const userAnswer = event.reaction === '😆';
      const isCorrect = userAnswer === answer;

      const timeSpent = (Date.now() - Reaction.startTime) / 1000;
      if (timeSpent > 30) {
        return message.reply("⏰ Time's up!");
      }

      const userName = await this.getUserName(api, event.userID);

      const answerData = {
        userId: event.userID,
        questionId: Reaction.questionId,
        answer: userAnswer ? "True" : "False",
        timeSpent,
        userName
      };

      try {
        const res = await axios.post(`${BASE_URL}/answer`, answerData);
        const { user } = res.data;

        const userData = await usersData.get(event.userID);
        userData.money = (userData.money || 0) + (isCorrect ? reward : 0);
        await usersData.set(event.userID, userData);

        const successMsg = isCorrect ? 
          `🎉 Excellent ${userName}! +${reward} coins!\n🔥 Streak: ${user.currentStreak || 0}` :
          `💫 Good try ${userName}! Answer: ${answer}\n📊 Keep practicing!`;

        message.reply(successMsg);
      } catch (error) {
        console.error("Error updating score:", error);
      }

      global.GoatBot.onReaction.get(messageID).reacted = true;
      setTimeout(() => global.GoatBot.onReaction.delete(messageID), 1000);
    } catch (err) {
      console.error("Quiz reaction error:", err);
    }
  },

  onReply: async function ({ message, event, Reply, getLang, api, usersData }) {
    if (Reply.author !== event.senderID) return;

    try {
      const ans = event.body.trim().toUpperCase();
      if (!["A", "B", "C", "D"].includes(ans)) {
        return message.reply("❌ Please reply with A, B, C, or D only!");
      }

      const timeSpent = (Date.now() - Reply.startTime) / 1000;
      if (timeSpent > 30) {
        return message.reply("⏰ Time's up!");
      }

      const userName = await this.getUserName(api, event.senderID);

      const isCorrect = ans === Reply.answer;
      const answerData = {
        userId: event.senderID,
        questionId: Reply.questionId,
        answer: ans,
        timeSpent,
        userName
      };

      const res = await axios.post(`${BASE_URL}/answer`, answerData);
      const { result, user } = res.data;

      // Calculate rewards
      let baseReward = this.envConfig.reward;
      if (Reply.isFlag) baseReward = this.envConfig.flagReward;
      if (Reply.isDailyChallenge && isCorrect) baseReward += Reply.bonusReward;

      if (result === "correct") {
        const userData = await usersData.get(event.senderID);
        userData.money = (userData.money || 0) + baseReward;
        await usersData.set(event.senderID, userData);
      }

      // Enhanced response message
      const difficultyBonus = Reply.difficulty === 'hard' ? ' 🔥' : Reply.difficulty === 'easy' ? ' ⭐' : '';
      const streakBonus = (user.currentStreak || 0) >= 5 ? ` 🚀 ${user.currentStreak}x streak!` : '';

      let responseMsg;
      if (result === "correct") {
        responseMsg = getLang("correctMessage")
          .replace("{correct}", user.correct || 0)
          .replace("{total}", user.total || 0)
          .replace("{accuracy}", user.accuracy || 0)
          .replace("{streak}", user.currentStreak || 0)
          .replace("{time}", timeSpent.toFixed(1))
          .replace("{xp}", user.xp || 0);
        responseMsg += difficultyBonus + streakBonus;
      } else {
        responseMsg = getLang("wrongMessage")
          .replace("{correctAnswer}", Reply.answer)
          .replace("{correct}", user.correct || 0)
          .replace("{total}", user.total || 0)
          .replace("{accuracy}", user.accuracy || 0);
      }

      await message.reply(responseMsg);

      // Handle achievements
      if (user.achievements && user.achievements.length > 0) {
        const achievementMsg = user.achievements.map(ach => `🏆 ${ach}`).join('\n');
        await message.reply(getLang("achievementUnlocked")
          .replace("{achievement}", achievementMsg)
          .replace("{bonus}", this.envConfig.achievementReward));

        const userData = await usersData.get(event.senderID);
        userData.money = (userData.money || 0) + this.envConfig.achievementReward;
        await usersData.set(event.senderID, userData);
      }

      message.unsend(Reply.messageID);
      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (err) {
      console.error("Answer error:", err);
      message.reply("⚠️ Error processing your answer.");
    }
  },

  envConfig: {
    reward: 10000,
    achievementReward: 25000,
    streakReward: 5000,
    flagReward: 20000,
    dailyChallengeBonus: 15000
  }
};
