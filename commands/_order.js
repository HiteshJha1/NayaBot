/*CMD
  command: /order
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🚀 order
  group: 
CMD*/

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidLink(link) {
  return link.startsWith("https://x.com") || link.startsWith("https://twitter.com");
}

var input = message.trim();
var parts = input.split(' ').map(v => v.trim());

if (parts.length !== 5) {
  Api.sendMessage({
    text:`🚀 *Order Likes + Retweets*  

💲 *Price:* $0.03 per 1 Like + Retweet (includes both)  

**To Order:**
  
👉 */order <Quantity> <Tweet Link> <Current Likes> <Current Retweets>*  

*Examples:*
  
- */order 30 https://x.com/link 20 10*  
(_Adds 30 likes + 30 retweets. 20 & 10 are current likes/retweets_)
  
- */order 30+10 https://x.com/link 40 5*  
(_Adds 30 likes + 10 retweets. 40 & 5 are current likes/retweets_)

*❤️ Min/Max - 30/1500*
*🔃 Min/Max - 10/1500*

✅ *Completion* - Instant/Fast`,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}

var amountPart = parts[1];
var link = parts[2];
var startLikes = parseInt(parts[3]);
var startRetweets = parseInt(parts[4]);

var likes, retweets;

if (amountPart.includes('+')) {
  var amounts = amountPart.split('+').map(v => v.trim());
  likes = parseInt(amounts[0]);
  retweets = parseInt(amounts[1]);
} else {
  likes = retweets = parseInt(amountPart);
}

if (!isNumeric(likes) || !isNumeric(retweets) || !isValidLink(link) || !isNumeric(startLikes) || !isNumeric(startRetweets)) {
  Api.sendMessage({
    text: "❌ Invalid Input. Please ensure all values are numeric and the link is valid.\n\nExample: /order 100 https://x.com/link 50 20",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}

if (likes < 30) {
  Api.sendMessage({
    text: "⚠️ Minimum likes: 30",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}
if (likes > 1500) {
  Api.sendMessage({
    text: "⚠️ Maximum likes: 1500",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}
if (retweets < 10) {
  Api.sendMessage({
    text: "⚠️ Minimum retweets: 10",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}
if (retweets > 1500) {
  Api.sendMessage({
    text: "⚠️ Maximum retweets: 1500",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}
if (likes < retweets) {
  Api.sendMessage({
    text: "❌ Likes cannot be less than retweets.",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}

// Set user properties
User.setProperty("order", { likes: likes, retweets: retweets, link: link, startLikes: startLikes, startRetweets: startRetweets }, "json");

var cost = (30 / 1000) * likes;
var balance = Libs.ResourcesLib.userRes("balance");

var balance = Libs.ResourcesLib.userRes("balance");

if (balance.value() < cost) {
  Api.sendMessage({
    text: "⚠️ Your balance is not enough, please top up your account.",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
} else {
  balance.add(-cost);

  Api.sendMessage({
    text: "✅ Your order has been processed and will be started shortly.\n\n⚠️ In case you have any problem, contact @BadassHacker.",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });

  var admin_id = "-1001936404566";
  var endLikeCount = startLikes + likes;
  var endRetweetCount = startRetweets + retweets;

  Api.sendMessage({
  chat_id: admin_id,
  text:
    "Link :- " + link +
    "\n\nReward :- 0.006 USDT" +
    "\n\nTotal Count :- " + likes + "\n\nStart Like Count :- " + startLikes +
    "\n\nEnd Like Count :- " + endLikeCount +
    "\n\nStart Retweet Count :- " + startRetweets +
    "\n\nEnd Retweet Count :- " + endRetweetCount +
    "\n\n<b>⚠️ Do not do after end count, in such case you won't be paid.</b>",
  parse_mode: "HTML",
  disable_web_page_preview: true
});

}
