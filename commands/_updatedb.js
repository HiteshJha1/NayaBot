/*CMD
  command: /updatedb
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

var amount = options.amount;
var link = options.link;
var useri = options.userid;
var balance = Libs.ResourcesLib.anotherUserRes("balance",useri);
// Function to notify the admin
  var admin_id = "5084153092"; // Replace with the actual admin ID
  var text = `Service :- *📑 Twitter Post Bookmarks*\n\n👤 Name :- ${user.first_name}\n\n🆔 User Id :- ${user.telegramid}\n\n📑 Bookmarks Ordered :- ${amount}\n\n🔗 Post Link :- *${link}*\n\n💰 Balance :- $${balance.value()}`;
  
  Api.sendMessage({
    chat_id: admin_id,
    text: text,
    disable_web_page_preview: true,
    parse_mode: "Markdown"
  });


