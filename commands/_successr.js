/*CMD
  command: /successr
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!content) {
  Bot.sendMessage("⚠️ Internal Server Error");
  return;
}

if (!params) {
  Bot.sendMessage("⚠️ Internal Server Error");
  return;
}

var result = JSON.parse(content);
var id = result.order;

// Check if order ID is undefined
if (id === undefined) {
  Bot.sendMessage(`⚠️ Your previous order for this link is not completed.`);
  return;
}

var amount = parseFloat(params); // Ensure amount is a number
var balance = Libs.ResourcesLib.userRes("balance");

// Deduct the appropriate amount based on the value of 'amount'

  balance.add(-amount * 0.015); // Deduct amount * 1.5 if < 1000

let view = User.getProperty("viewqty");
let link = User.getProperty("viewlink");

// Prepare the base message with order details
let messageText = 
  "✅ Your order has been processed..!!\n\n" +
  "```\n" + // Start of the quote format
  "🔃 Retweets Ordered :- " + view +
  "\n\n🔗 Link :- " + link +
  "\n```"; // End of the quote format

// Add the note about the additional charge if the amount is less than 1000

// Send the final message
Api.sendMessage({
  text: messageText,
  parse_mode: "Markdown",
  disable_web_page_preview: true
});

