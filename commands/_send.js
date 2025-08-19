/*CMD
  command: /send
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var key = "5084153092"
if (user.telegramid == key){
if (!params) {
Bot.sendMessage("⚠️ Invalid Format Master. Please Use /send [email]\n\n🔴 Example:- /send mrhiteshjha@gmail.com ",{is_reply: true});
return}
var msg = params.split(" ")
var email = msg[0]

if (message == "/send "+email+"") {
BBAdmin.installBot({
  email: email,
  bot_id: bot.id
})
Bot.sendMessage("✅ Transferred",{is_reply: true});
}
}else{
return
}
