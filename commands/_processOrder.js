/*CMD
  command: /processOrder
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

var balance = Libs.ResourcesLib.userRes("balance");
var order = User.getProperty("order");
var link = User.getProperty("link");
var startLikes = User.getProperty("startLikes");
var startRetweets = User.getProperty("startRetweets");

var cost = (30 / 1000) * order.likes;

if (balance.value() < cost) {
  Bot.sendMessage("⚠️ Your balance is not enough, please top up your account.");
  return;
} else {
  balance.add(-cost);
  Bot.sendMessage("✅ Your order has been processed and will be started shortly.\n\n⚠️ In case if you have any problem, contact @BadassHacker.");

  var admin_id = "-1001936404566";
  var endLikeCount = startLikes + order.likes;
  var endRetweetCount = startRetweets + order.retweets;

  Api.sendMessage({
    chat_id: admin_id,
    text:
      "Link :- " + link +
      "\n\nReward :- 0.04 TRX\n\nStart Like Count :- " + startLikes +
      "\n\nEnd Like Count :- " + endLikeCount +
      "\n\nStart Retweet Count :- " + startRetweets +
      "\n\nEnd Retweet Count :- " + endRetweetCount +
      "\n\n<b>⚠️ Do not do after end count, in such case you won't be paid.</b>",
    disable_web_page_preview: true,
    parse_mode: "HTML"
  });
}

