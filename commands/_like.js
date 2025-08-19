/*CMD
  command: /like
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ❤️ like
  group: 
CMD*/

// Function to handle the /order command
if (!params) {
  sendOrderInstructions(request.message_id);
  return;
}

var msg = params.split(" ");
var amount = parseInt(msg[0], 10);
var link = msg[1];
var balance = Libs.ResourcesLib.userRes("balance");
var useri = user.telegramid;
let customRates = {
  "7866569057": 0.012,
  "5084153092": 0.01
};
let rate = customRates[useri] || 0.015; // 
var cost = rate * amount;


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
 url: `https://panelika.com/api/v2?key=${Bot.getProperty("panelika")}&action=add&service=1142&link=${link}&quantity=${amount}`,
  success: `/success ${amount}`
 });

// Pass details to /update command for notifying admin
Bot.runCommand("/updated", {
  amount: amount,
  link: link,
  userid: useri,
});

// Function to send order instructions
function sendOrderInstructions(reply_to_message_id) {
  var text = `*❤️ Order Likes*

To order likes, just type the following command:

👉 /like <amount> <link>

*Example :*

👉 /like 100 https://x.com/link

⚠️ Minimum/Maximum - 25/7000

💲 Price - $0.015 per Like

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
  if (amount < 25) {
    Bot.sendMessage("*⚠️ Minimum :- 25 Likes*", { is_reply: true });
    return false;
  }

  if (amount > 7000) {
    Bot.sendMessage("*⚠️ Maximum :- 7000 Likes*", { is_reply: true });
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

