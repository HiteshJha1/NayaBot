/*CMD
  command: /retweet
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🔃 retweet
  group: 
CMD*/

if (!params) {
  sendOrderInstructions(request.message_id);
  return;
}

var msg = params.split(" ");
var amount = parseInt(msg[0], 10);
var link = msg[1];
var balance = Libs.ResourcesLib.userRes("balance");
var useri = user.telegramid;
var cost = 0.015 * amount;

if (!amount || !link) {
  sendOrderInstructions(request.message_id);
  return;
}

if (!isValidOrder(amount, link)) {
  return;
}

if (balance.value() < cost) {
  Bot.sendMessage(
    "⚠️ Your balance is not enough, please top up your account in order to use the service.\n\n📞 Support :- *@BadassHacker*"
  );
  return;
}

// Set the user's order details
User.setProperty("viewqty", amount, "number");
User.setProperty("viewlink", link, "string");

// Make the HTTP request to add views
HTTP.get({
 url: `https://panelika.com/api/v2?key=${Bot.getProperty("panelika")}&action=add&service=1248&link=${link}&quantity=${amount}`,
  success: `/successr ${amount}`
 });

// Pass details to /update command for notifying admin
Bot.runCommand("/updatedr", {
  amount: amount,
  link: link,
  userid: useri,
});

// Function to send order instructions
function sendOrderInstructions(reply_to_message_id) {
  var text = `*🔃 Order Retweets*

To order likes, just type the following command:

👉 /retweet <amount> <link>

*Example :*

👉 /retweet 100 https://x.com/link

⚠️ Minimum/Maximum - 20/5000

💲 Price - $0.015 per Retweet

✅ Completion time - 30m to 1hr.`;
  Api.sendMessage({
    text: text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: reply_to_message_id
  });
}

// Function to validate the order
function isValidOrder(amount, link) {
  if (amount < 20) {
    Bot.sendMessage("*⚠️ Minimum :- 20 Retweets*", { is_reply: true });
    return false;
  }

  if (amount > 5000) {
    Bot.sendMessage("*⚠️ Maximum :- 5000 Retweets*", { is_reply: true });
    return false;
  }

  if (!link.startsWith("https://x.com") && !link.startsWith("https://twitter.com")) {
    var text = `*⚠️ Invalid Link*\n\n👉 The link must start with https://x.com or https://twitter.com`;
    Api.sendMessage({
      text: text,
      parse_mode: "Markdown",
      reply_to_message_id: request.message_id,
      disable_web_page_preview: true
    });
    return false;
  }

  return true;
}

