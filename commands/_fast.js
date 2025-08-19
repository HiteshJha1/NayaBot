/*CMD
  command: /fast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
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

if (parts.length !== 4) { // Change the length check to 4 since we're removing retweets
  Api.sendMessage({
    text: `🚀 *Order Likes*  

💲 *Price:* $0.02 per 1 Like  

**To Order:**
  
👉 */fast <Quantity> <Tweet Link> <Current Likes>*  

*Examples:*
  
- */fast 30 https://x.com/link 20*  
(_Adds 30 likes. 20 is current likes_)

*❤️ Min/Max - 40/1500*

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

var likes;

if (amountPart.includes('+')) {
  likes = parseInt(amountPart.split('+')[0].trim()); // Only use the first part for likes
} else {
  likes = parseInt(amountPart);
}

if (!isNumeric(likes) || !isValidLink(link) || !isNumeric(startLikes)) {
  Api.sendMessage({
    text: "❌ Invalid Input. Please ensure all values are numeric and the link is valid.\n\nExample: /order 100 https://x.com/link 50",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: request.message_id
  });
  return;
}

if (likes < 40) {
  Api.sendMessage({
    text: "⚠️ Minimum likes: 40",
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

// Set user properties
User.setProperty("order", { likes: likes, link: link, startLikes: startLikes }, "json");

var cost = (20 / 1000) * likes;
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

  Api.sendMessage({
    chat_id: admin_id,
    text:
      "#OnlyLike\n\nLink :- " + link +
      "\n\nReward :- 0.005 USDT\n\nTotal Count :- " + likes + "\n\nStart Like Count :- " + startLikes +
      "\n\nEnd Like Count :- " + endLikeCount +
      "\n\n<b>⚠️ Do not do after end count, in such case you won't be paid.</b>",
    parse_mode: "HTML",
    disable_web_page_preview: true
  });
}

