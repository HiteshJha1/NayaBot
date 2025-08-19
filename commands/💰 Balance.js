/*CMD
  command: 💰 Balance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /balance
  group: 
CMD*/

var balance = Libs.ResourcesLib.userRes("balance")
var order = Libs.ResourcesLib.userRes("order")
var lib = Libs.ReferralLib
var refList = lib.currentUser.refList.get();
Bot.sendMessage("👤 Name : "+user.first_name+"\n\n🆔 User ID : "+user.telegramid+"\n\n👁️‍🗨️ Balance : "+balance.value().toFixed(2)+"",{is_reply: true});

