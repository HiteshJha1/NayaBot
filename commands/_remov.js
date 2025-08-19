/*CMD
  command: /remov
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

var key = "5084153092";
if (user.telegramid == key) {
    if (!params) {
        Bot.sendMessage("⚠️ Invalid Format Master. Please Use /add [amount] [tgid]\n\n🔴 Example:- /add 1000 1878074681", {is_reply: true});
        return;
    }
    
    var msg = params.split(" ");
    var amount = parseFloat(msg[0]);
    var tgid = msg[1];

    if (message == "/remov " + amount + " " + tgid) {
        let res = Libs.ResourcesLib.anotherUserRes("balance", tgid);
        res.add(amount); // Changed from 'add' to 'subtract'
        Bot.sendMessage("*✅ Balance Removed Successfully Master*\n\n*👤 User = " + tgid + "\n\n💰 Amount = " + amount + "*", {is_reply: true});
    } else if (message == "/add " + amount + " " + tgid) {
        let res = Libs.ResourcesLib.anotherUserRes("balance", tgid);
        res.add(amount);
        Bot.sendMessage("*✅ Balance Added Successfully Master*\n\n*👤 User = " + tgid + "\n\n💰 Amount = " + amount + "*", {is_reply: true});
    } else {
        return;
    }
}
