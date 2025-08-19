/*CMD
  command: /success
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

let customRates = {
  "7866569057": 0.012,
  "5084153092": 0.01
};

if (!content || !params) {
  Bot.sendMessage("⚠️ Internal Server Error");
  return;
}

var result = JSON.parse(content);
var id = result.order;

if (id === undefined) {
  Bot.sendMessage(`⚠️ Your previous order for this link is not completed.`);
  return;
}

var amount = parseFloat(params);
var balance = Libs.ResourcesLib.userRes("balance");

let userId = user.telegramid;
let rate = customRates[userId] || 0.015; // fallback to default rate
balance.add(-amount * rate);

let view = User.getProperty("viewqty");
let link = User.getProperty("viewlink");

let messageText = 
  "✅ Your order has been processed..!!\n\n" +
  "```\n" +
  "❤️ Likes Ordered :- " + view +
  "\n\n🔗 Link :- " + link +
  "\n```";

Api.sendMessage({
  text: messageText,
  parse_mode: "Markdown",
  disable_web_page_preview: true
});

